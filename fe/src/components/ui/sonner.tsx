"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border shadow-lg font-sans",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium rounded-md px-3 py-1.5",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium rounded-md px-3 py-1.5",
          success: "group-[.toaster]:bg-emerald-50 dark:group-[.toaster]:bg-emerald-950/50 group-[.toaster]:text-emerald-600 dark:group-[.toaster]:text-emerald-400 group-[.toaster]:border-emerald-200 dark:group-[.toaster]:border-emerald-800",
          error: "group-[.toaster]:bg-red-50 dark:group-[.toaster]:bg-red-950/50 group-[.toaster]:text-red-600 dark:group-[.toaster]:text-red-400 group-[.toaster]:border-red-200 dark:group-[.toaster]:border-red-800",
          info: "group-[.toaster]:bg-blue-50 dark:group-[.toaster]:bg-blue-950/50 group-[.toaster]:text-blue-600 dark:group-[.toaster]:text-blue-400 group-[.toaster]:border-blue-200 dark:group-[.toaster]:border-blue-800",
          warning: "group-[.toaster]:bg-amber-50 dark:group-[.toaster]:bg-amber-950/50 group-[.toaster]:text-amber-600 dark:group-[.toaster]:text-amber-400 group-[.toaster]:border-amber-200 dark:group-[.toaster]:border-amber-800",
        },
      }}
      position="bottom-right"
      closeButton
      {...props}
    />
  )
}

export { Toaster }
