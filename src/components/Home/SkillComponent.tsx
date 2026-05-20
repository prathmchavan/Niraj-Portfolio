import { Box, Typography } from "@mui/material";
import Image from "next/image";

export const SkillComponent = ({
  image,
  title,
  sub,
}: {
  image: string;
  title: string;
  sub: string;
}) => {
  return (
    <Box
      sx={{
        maxWidth: ["calc(100vw - 40px)", "380px"],
        border: "1px solid rgba(0, 0, 0, 0.05)",
        borderRadius: "4px",
        transition: "border-color 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          borderColor: "#D9D9D9",
        },
      }}
    >
      <Box
        sx={{
          px: "14px",
          py: "8px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Image width={40} height={40} src={image} alt={title} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <Typography sx={{ fontSize: "1.1rem", fontWeight: 600 }}>{title}</Typography>
          <Typography
            sx={{
              fontSize: "0.9rem",
              color: "rgba(0, 0, 0, 0.5)",
            }}
          >
            {sub}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
