"use client";

import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export const TimeLineItem = ({
  logo,
  company,
  work,
  period,
  location,
  position,
}: {
  logo: string;
  company: string;
  work?: string[];
  period: string;
  location: string;
  position: string;
}) => {
  const [hovering, setHovering] = useState(false);

  return (
    <TimelineItem
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <TimelineSeparator
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Image
          width={70}
          height={70}
          src={logo}
          alt={"Naruto"}
          style={{
            objectFit: "contain",
            filter: hovering ? "grayscale(0%)" : "grayscale(100%)",
          }}
        />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          mb: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: ["column", "row"],
              gap: ["4px", 0]
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              {company.toLowerCase()}{" "}
            </Typography>
            <Typography sx={{ fontWeight: 700, color: "white", marginLeft: [0, "12px"] }}>
              {period.toLowerCase()}
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: 500 }}>
            {position.toLowerCase()}
          </Typography>
          <Typography sx={{ color: "white" }}>
            {location.toLowerCase()}
          </Typography>
        </Box>
        <ul
          style={{
            display: !!work ? "flex" : "none",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {work?.map((w, idx) => (
            <li key={idx}>
              <Typography sx={{ fontWeight: 400 }}>
                {w.toLowerCase()}
              </Typography>
            </li>
          ))}
        </ul>
      </TimelineContent>
    </TimelineItem>
  );
};
