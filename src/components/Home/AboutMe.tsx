"use client";

import { Box, Typography } from "@mui/material";
import { Header, Person } from "../Global";
import Dev from "../../lotties/Dev.json";
import Link from "next/link";
import dynamic from "next/dynamic";

const LottieWithNoSSR = dynamic(() => import('lottie-react'), { ssr: false });

export const AboutMe = () => {
  return (
    <Box
      sx={{
        px: ["20px", "100px"],
        py: "50px",
        color:"white"
      }}
    >
      <Header icon={<Person />} title="About me" />
      <Box
        sx={{
          display: "flex",
          flexDirection: ["column", "row"],
          alignItems: "center",
          gap: "34px",
        }}
      >
        <Box display={["none", "flex"]}>
          <LottieWithNoSSR
            style={{ height: "70vh", width: "60vh" }}
            animationData={Dev}
          />
        </Box>

        <Box display={["flex", "none"]}>
          <LottieWithNoSSR
            style={{ height: "50vh", width: "50vh" }}
            animationData={Dev}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              color: "white",
            }}
          >
            hey there, <span style={{ fontWeight: 600 }}>myself Niraj</span>
          </Typography>

          <Typography
            sx={{
              fontWeight: 400,
              color: "white",
              lineHeight: "30px"
            }}
          >
            i specialize in <strong>full-stack development</strong> with a strong proficiency in <strong>devops</strong> and a deep interest in <strong>unix programming</strong>. my passion lies in working on projects, and you&apos;ll often find me immersed in development tasks, constantly honing my skills.
          </Typography>

          <Typography
            sx={{
              fontWeight: 400,
              color: "color",
              lineHeight: "30px"
            }}
          >
            beyond development, i am highly enthusiastic about <strong>startups</strong>. i ventured into entrepreneurship with my own startup, <Link
              href={"https://onlymess.ion"}
              target="_blank"
              style={{ textDecoration: "underline", color: "white" }}
            >
              <strong>onlymess</strong>
            </Link>. although we had to halt its operations due to my initial lack of knowledge in startup fundamentals, this experience ignited a desire to understand the intricacies of building and scaling a business. i am now diligently learning the essentials of startups, from marketing to sales, by actively working at a startup.
          </Typography>
          <Typography
            sx={{
                fontWeight: 400,
              lineHeight: "30px"
            }}
          >
            my expertise extends beyond development. i am well-versed in <strong>project management</strong>, <strong>marketing</strong>, and <strong>business research</strong>, with a proven track record in these areas.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
