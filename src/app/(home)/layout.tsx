import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        // px: "80px",
        // py: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {children}
    </Box>
  );
}
