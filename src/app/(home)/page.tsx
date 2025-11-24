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
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "200vw",
        overflowX: "hidden",
        backgroundColor:"black",
        color :'white'
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
              right: 0,
              bottom: 0,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: [120, 200],
            height: [160, 280]
          }}
        >
          <Image
            src={"/home/pngwinc.png"}
            alt={"Naruto"}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
