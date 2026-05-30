import {
  AboutMe,
  EducationComp,
  ExperienceComp,
  ExperimentsComp,
  Main,
  Navbar,
  ResumeComp,
  Skills,
} from "@/components";
import Link from "next/link";
import { Box as MuiBox } from "@mui/material";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflowX: "hidden",
        minHeight: "100vh",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Navbar />
      <Main />
      <AboutMe />
      <Box
        sx={{
          display: "flex",
          // Force a single-column layout so Experience appears above Education
          flexDirection: "column",
          gap: 4,
        }}
      >
        <ExperienceComp />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <EducationComp />
          <Skills />
        </Box>
      </Box>
      <ExperimentsComp />
      <ResumeComp />
      <Box
        sx={{
          position: "fixed",
          right: [10, 18],
          bottom: [22, 28],
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: [120, 170, 210],
            height: [150, 210, 270],
          }}
        >
          <Image
            src="/home/pngwinc.png"
            alt="Nemo"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
      <MuiBox sx={{ position: 'fixed', right: [12, 20], bottom: [8, 16], zIndex: 40 }}>
        <Link href="/ai-candidate-assistant">
          <button className="floating-ai-btn">Go to AI assistance</button>
        </Link>
      </MuiBox>
    </Box>
  );
}
