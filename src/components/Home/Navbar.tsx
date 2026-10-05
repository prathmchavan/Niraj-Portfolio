"use client";

import { Box, Card, IconButton, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const navRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!trayIn) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (navRef.current && target && !navRef.current.contains(target)) {
        setTrayIn(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setTrayIn(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [trayIn]);

  const navItems = [
    {
      title: "Profile",
      icon: <Person />,
      onClick: () => {
        setTrayIn(false);
        handleScroll("profile");
      },
    },
    {
      title: "Experience",
      icon: <Experience />,
      onClick: () => {
        setTrayIn(false);
        handleScroll("experience");
      },
    },
    {
      title: "Education",
      icon: <Education />,
      onClick: () => {
        setTrayIn(false);
        handleScroll("education");
      },
    },
    {
      title: "Skills",
      icon: <Tools />,
      onClick: () => {
        setTrayIn(false);
        handleScroll("skills");
      },
    },
    {
      title: "Experiments",
      icon: <Experiments />,
      onClick: () => {
        setTrayIn(false);
        handleScroll("experiments");
      },
    },
    {
      title: "Resume",
      icon: <Resume />,
      onClick: () => {
        setTrayIn(false);
        handleScroll("resume");
      },
    },
  ];

  const trayContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        position: ["fixed", "static"],
        top: ["64px", "auto"],
        right: ["12px", "auto"],
        left: "auto",
        transform: "none",
        backgroundColor: ["rgba(0,0,0,0.96)", "transparent"],
        borderRadius: ["16px", 0],
        border: ["1px solid rgba(255,255,255,0.1)", "none"],
        p: [1, 0],
        zIndex: 1400,
        minWidth: ["56px", "auto"],
        boxShadow: ["0 12px 40px rgba(0,0,0,0.55)", "none"],
      }}
    >
      {navItems.map((item) => (
        <Tooltip key={item.title} title={item.title} arrow placement="left">
          <IconButton
            sx={{
              color: "white",
              ":hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
            onClick={item.onClick}
          >
            {item.icon}
          </IconButton>
        </Tooltip>
      ))}

      <Tooltip title="Ask Niraj" arrow placement="left">
        <Link href="/ai-candidate-assistant">
          <IconButton
            sx={{
              color: "#7c3aed",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "6px 10px",
              ":hover": { backgroundColor: "white", color: "black" },
            }}
            onClick={() => setTrayIn(false)}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 700 }}>Ask</Typography>
          </IconButton>
        </Link>
      </Tooltip>
    </Box>
  );

  return (
    <Box
      ref={navRef}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1300,
        height: ["56px", "100vh"],
        display: "flex",
        width: ["100%", "auto"],
        maxWidth: ["100vw", "none"],
        flexDirection: ["row", "column"],
        alignItems: ["center", "flex-start"],
        justifyContent: "space-between",
        backgroundColor: ["rgba(0,0,0,0.92)", "transparent"],
        backdropFilter: "blur(8px)",
        px: "12px",
        boxSizing: "border-box",
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
          flexShrink: 0,
        }}
      >
        {"</>"}
      </Typography>

      <Card
        sx={{
          position: "relative",
          height: ["auto", "100%"],
          display: "flex",
          flexDirection: ["row", "column"],
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "none",
          backgroundColor: "black",
          px: [0.5, 0],
          py: 0,
          flexShrink: 0,
          overflow: "visible",
        }}
      >
        {/* Mobile: hamburger always stays; tray overlays below */}
        {!isDesktop && (
          <>
            <IconButton
              onClick={() => setTrayIn((open) => !open)}
              aria-label={trayIn ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={trayIn}
              sx={{
                color: "white",
                padding: "14px",
              }}
            >
              <Hamburger width={26} height={26} />
            </IconButton>
            {trayIn && trayContent}
          </>
        )}

        {/* Desktop: hover opens tray; hamburger stays so click can toggle closed */}
        {isDesktop && (
          <>
            <IconButton
              onMouseEnter={() => setTrayIn(true)}
              onClick={() => setTrayIn((open) => !open)}
              aria-label={trayIn ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={trayIn}
              sx={{
                color: "white",
                padding: "14px",
              }}
            >
              <Hamburger width={26} height={26} />
            </IconButton>
            {trayIn && trayContent}
          </>
        )}
      </Card>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          ml: [0, 2],
          flexShrink: 0,
        }}
      >
        <Link href="/ai-candidate-assistant">
          <IconButton
            sx={{
              color: "white",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 1,
              padding: "6px 10px",
              ":hover": { backgroundColor: "white", color: "black" },
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 700 }}>Ask</Typography>
          </IconButton>
        </Link>
      </Box>

      <Box sx={{ display: ["none", "block"], mt: "45px" }} />
    </Box>
  );
};
