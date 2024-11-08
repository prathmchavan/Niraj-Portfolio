"use client";

import { Box, Card, IconButton, Tooltip, Typography } from "@mui/material";
import {
  Education,
  Experience,
  Experiments,
  Hamburger,
  ImgIcon,
  Person,
  Resume,
  Tools,
} from "../Global";
import { useState } from "react";

export const Navbar = () => {
  const [trayIn, setTrayIn] = useState(false);

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
          textFillColor: "tra nsparent",
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
          backgroundColor:"black"
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
              <IconButton sx={{
            color:"white",
            ":hover":{
              backgroundColor:"white",
              color:"black"
            }
          }}>
                <Person />
              </IconButton>
            </Tooltip>
            <Tooltip title="Experience" arrow={true} placement="left">
              <IconButton sx={{
            color:"white",
            ":hover":{
              backgroundColor:"white",
              color:"black"
            }
          }}>
                <Experience />
              </IconButton>
            </Tooltip>
            <Tooltip title="Skills" arrow={true} placement="left">
              <IconButton  sx={{
            color:"white",
            ":hover":{
              backgroundColor:"white",
              color:"black"
            }
          }}>
                <Tools />
              </IconButton>
            </Tooltip>
            <Tooltip title="Education" arrow={true} placement="left">
              <IconButton  sx={{
            color:"white",
            ":hover":{
              backgroundColor:"white",
              color:"black"
            }
          }}>
                <Education />
              </IconButton>
            </Tooltip>
            <Tooltip title="Experiments" arrow={true} placement="left">
              <IconButton sx={{
            color:"white",
            ":hover":{
              backgroundColor:"white",
              color:"black"
            }
          }}>
                <Experiments />
              </IconButton>
            </Tooltip>
            <Tooltip title="Resume" arrow={true} placement="left">
              <IconButton sx={{
            color:"white",
            ":hover":{
              backgroundColor:"white",
              color:"black"
            }
          }}>
                <Resume />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <IconButton onMouseEnter={() => setTrayIn(true)}  sx={{
            color: "white"
          }}>
            <Hamburger width={15} height={15}  />
          </IconButton>
        )}
      </Card>
      <Box sx={{ mt: "45px" }}></Box>
    </Box>
  );
};
