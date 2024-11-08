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
        maxWidth: "100vw",
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
          flexDirection: ["column", "row"]
        }}
      >
        <ExperienceComp />
        <Box>
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
            width: [80, 150],
            height: [120, 240]
          }}
        >
          <Image
            src={"/home/chibi.png"}
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
