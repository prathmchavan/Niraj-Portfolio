import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

export const Header = ({ icon, title }: { icon: ReactNode; title: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {icon}
      <Typography
        sx={{
          fontFamily: "Montserrat",
          fontWeight: 600,
          textDecoration: "underline"
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};
