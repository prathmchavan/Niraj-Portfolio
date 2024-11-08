"use client"

import { theme } from "@/theme"
import { ThemeProvider } from "@mui/material"
import { ReactNode } from "react"

export const AllProviders = ({children}: {children: ReactNode}) => {
    return (
        <ThemeProvider
            theme={theme}
        >
            {children}
        </ThemeProvider>
    )
}