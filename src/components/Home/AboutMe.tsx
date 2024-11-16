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
            Hey there, <span style={{ fontWeight: 600 }}>Niraj here</span>
          </Typography>

          <Typography
            sx={{
              fontWeight: 400,
              color: "white",
              lineHeight: "30px"
            }}
          >
            I specialize in <strong> developing custom software solutions for enterprises,</strong> with 3 years of hands-on experience across various domains like <strong> logistics, supply chain, legal contract management
            and custom software services. </strong> A deep interest in <strong>unix programming</strong>. I bring the best of both worlds—a seamless UX paired with
            the kind of robustness you’d expect from Elon Musk’s Starship.
          </Typography>
          <Typography
            sx={{
                fontWeight: 400,
              lineHeight: "30px"
            }}
          >
          If you’re looking for the right person to bring your next big idea to life, I’m confident I’m the
          one you need.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
