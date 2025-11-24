"use client";

import { Box, Card, IconButton, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import {
  Education,
  Experience,
  Experiments,
  Hamburger,
  Person,
  Resume,
  Tools,
} from "../Global";

export const Navbar = () => {
  const [trayIn, setTrayIn] = useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: ["10vh", "100vh"],
        display: ["flex"],
        width: ["100%", "auto"],
        flexDirection: ["row", "column"],
        alignItems: "flex-start",
        justifyContent: "space-between",
        backdropFilter: "blur(5px)",
        px: "12px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Montserrat",
          fontSize: "25px",
          fontWeight: 700,
          backgroundImage: "url('/home/paint.jpg')",
          backgroundPosition: "0% 80%",
          backgroundSize: "cover",
          backgroundClip: "text",
          textFillColor: "transparent",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "grayscale(100%)",
          transition: "filter 0.3s ease",
          "&:hover": {
            filter: "none",
          },
          cursor: "pointer",
        }}
      >
        {"</>"}
      </Typography>
      <Card
        sx={{
          height: "100%",
          display: ["none", "flex"],
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "none",
          backgroundColor: "black",
        }}
        onMouseLeave={() => setTrayIn(false)}
      >
        {trayIn ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Tooltip title="Profile" arrow={true} placement="left">
              <IconButton
                sx={{
                  color: "white",
                  ":hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
                onClick={() => handleScroll("profile")} //to scroll to the profile section
              >
                <Person />
              </IconButton>
            </Tooltip>
            <Tooltip title="Experience" arrow={true} placement="left">
              <IconButton
                sx={{
                  color: "white",
                  ":hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
                onClick={() => handleScroll("experience")}
              >
                <Experience />
              </IconButton>
            </Tooltip>
            <Tooltip title="Education" arrow={true} placement="left">
              <IconButton
                sx={{
                  color: "white",
                  ":hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
                onClick={() => handleScroll("education")}
              >
                <Education />
              </IconButton>
            </Tooltip>
            <Tooltip title="Skills" arrow={true} placement="left">
              <IconButton
                sx={{
                  color: "white",
                  ":hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
                onClick={() => handleScroll("skills")}
              >
                <Tools />
              </IconButton>
            </Tooltip>
            <Tooltip title="Experiments" arrow={true} placement="left">
              <IconButton
                sx={{
                  color: "white",
                  ":hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
                onClick={() => handleScroll("experiments")}
              >
                <Experiments />
              </IconButton>
            </Tooltip>
            <Tooltip title="Resume" arrow={true} placement="left">
              <IconButton
                sx={{
                  color: "white",
                  ":hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
                onClick={() => handleScroll("resume")}
              >
                <Resume />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <IconButton
            onMouseEnter={() => setTrayIn(true)}
            sx={{
              color: "white",
            }}
          >
            <Hamburger width={15} height={15} />
          </IconButton>
        )}
      </Card>
      <Box sx={{ mt: "45px" }}></Box>
    </Box>
  );
};