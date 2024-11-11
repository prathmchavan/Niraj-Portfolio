"use client";

import { Box, Card, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { Link } from "../Global";
import { useState } from "react";

export const SingleExperiment = ({
  image,
  title,
  description,
  github,
  link,
}: {
  image: string;
  title: string;
  description: string;
  github?: string;
  link?: string;
}) => {
  const [hovering, setHovering] = useState(false);

  return (
    <Card
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        outline: "none",
        boxShadow: "none",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Box
        sx={{
          width: "100%",
          height: ["170px", "270px"],
          position: "relative",
        }}
      >
        <Image
          src={image}
          fill
          alt={title}
          style={{
            objectFit: "cover",
            // filter: hovering ? "grayscale(0%)" : "grayscale(100%)",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          px:'10px'
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "grey",
            fontWeight: 400,
          }}
        >
          {description}
        </Typography>
      </Box>
      <Box sx={{ px:"10px"}}>
        <IconButton onClick={() => window.open(link, "_blank")}>
          <Link width={20} height={20} />
        </IconButton>
      </Box>
    </Card>
  );
};
