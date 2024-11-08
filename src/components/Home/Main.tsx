import { Box, Typography } from "@mui/material";
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
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
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
            fontSize: ["100px", "150px"],
            textAlign: ["center", "center"],
            fontWeight: 700,
            backgroundImage: "url('/home/three.jpg')",
            backgroundPosition: "0% 80%",
            backgroundSize: "cover",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Niraj Chavan
        </Typography>
        <Typography
          sx={{
            mb: "20px",
            textAlign: ["center", "center"],
          }}
        >
          startups, development, devops, marketing, business
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <Link href={GITHUB_URL as string}>
            <ImgIcon path={"/icons/github.svg"} />
          </Link>
          <Link href={LINKEDIN_URL as string}>
            <ImgIcon path={"/icons/linkedin.svg"} />
          </Link>
          <Link href={INSTAGRAM_URL as string}>
            <ImgIcon path={"/icons/instagram.svg"} />
          </Link>
          <Link href={TWITTER_URL as string}>
            <ImgIcon path={"/icons/twitter.svg"} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
