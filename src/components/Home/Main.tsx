import { Box, Typography, Button } from "@mui/material";
import { ImgIcon } from "../Global";
import Link from "next/link";
import {
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  TWITTER_URL,
} from "@/constants";

export const Main = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: [2, 3],
        py: [4, 6],
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Sacramento",
            fontSize: ["4rem", "6rem", "8rem"],
            textAlign: "center",
            fontWeight: 700,
            backgroundImage: "url('/home/three.jpg')",
            backgroundPosition: "0% 80%",
            backgroundSize: "cover",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            width: "100%",
            maxWidth: "100%",
            wordBreak: "break-word",
          }}
        >
          Niraj Chavan
        </Typography>
        <Typography
          sx={{
            mb: "20px",
            textAlign: "center",
            fontSize: ["1rem", "1.125rem"],
            maxWidth: ["90vw", "700px"],
            lineHeight: 1.6,
          }}
        >
          Fullstack Engineer | AI-Driven Developer | Solution Engineer | Automation Builder | Frontend Specialist | AI Productivity Advocate
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: ["24px", "40px"],
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link href={GITHUB_URL as string} target="_blank">
            <ImgIcon path={"/icons/github.svg"} />
          </Link>
          <Link href={LINKEDIN_URL as string} target="_blank">
            <ImgIcon path={"/icons/linkedin.svg"} />
          </Link>
          {/* <Link href={INSTAGRAM_URL as string}>
            <ImgIcon path={"/icons/instagram.svg"} />
          </Link>
          <Link href={TWITTER_URL as string}>
            <ImgIcon path={"/icons/twitter.svg"} />
          </Link> */}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2, gap: 1, width: "100%" }}>
          <Link href="/ai-candidate-assistant">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#7c3aed",
                color: "white",
                transition: "transform 0.18s ease, box-shadow 0.18s ease",
                width: ["100%", "auto"],
                maxWidth: 340,
                px: [2.5, 4],
                py: 1.5,
              }}
            >
              Launch AI Recruiter Assistant
            </Button>
          </Link>
          <Typography sx={{ fontSize: 16, textAlign: "center", maxWidth: ["90vw", 820] }}>
            Interactively evaluate Niraj’s technical expertise, engineering mindset, startup fit and project experience through an AI-powered recruiter assistant.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
