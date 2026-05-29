import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  const element = document.getElementById(id)
  if (element) {
    e.preventDefault()
    element.scrollIntoView({ behavior: "smooth" })
  }
}