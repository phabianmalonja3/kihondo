"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--success-bg": "#16a34a", // green-600
          "--success-text": "#ffffff", // white
          "--error-bg": "#dc2626", // red-600
          "--error-text": "#ffffff", // white
          "--info-bg": "#0ea5e9", // blue-500
          "--info-text": "#ffffff",
          "--warning-bg": "#f59e0b", // amber-500
          "--warning-text": "#000000",
          "--loading-bg": "#6366f1", // indigo-500
          "--loading-text": "#ffffff",
          "--border-radius": "0.5rem", // rounded-lg
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
