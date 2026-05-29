import { source } from "@/lib/source"
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from "fumadocs-ui/page"
import { notFound } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card as ShadcnCard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

interface PageProps {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) {
    notFound()
  }

  const MDX = page.data.body

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle className="text-pink-400 font-bold tracking-tight">{page.data.title}</DocsTitle>
      <DocsDescription className="text-zinc-400">{page.data.description}</DocsDescription>
      <DocsBody className="text-zinc-300 font-mono text-sm leading-relaxed prose prose-zinc prose-invert">
        <MDX components={{
          Accordion,
          AccordionContent,
          AccordionItem,
          AccordionTrigger,
          Badge,
          Button,
          Tabs,
          TabsContent,
          TabsList,
          TabsTrigger,
          Card: ShadcnCard,
          ShadcnCard,
          CardHeader,
          CardFooter,
          CardTitle,
          CardAction,
          CardDescription,
          CardContent
        }} />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) {
    return {}
  }

  return {
    title: `${page.data.title} - Fluxstream Docs`,
    description: page.data.description,
  }
}
