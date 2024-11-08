"use client";

import { Box, Button, Typography } from "@mui/material";
import { Header, Resume } from "../Global";
import Image from "next/image";

export const ResumeComp = () => {
  return (
    <Box
      sx={{
        px: ["20px", "100px"],
        py: "50px",
      }}
    >
      <Header icon={<Resume />} title="resume" />
      <Box
        sx={{
          display: "flex",
          flexDirection: ["column", "row"],
          alignItems: "center",
          gap: "34px",
          mt: "80px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: ["calc(100vw - 40px)", "600px"],
            height: ["180px", "300px"]
          }}
        >
        <Image
          src={"/resume/resume.png"}
          // width={600}
          // height={300}
          fill
          alt={"Ajinkya's Resume"}
          style={{
            objectFit: "contain",
            border: "1px solid #D9D9D9",
            borderRadius: "4px",
            overflow: "hidden",
            cursor: "pointer"
          }}
          onClick={() => window.open("/Ajinkya_3_Yr_MERN_DevOPS_Cloud.pdf", "_blank")}
        />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px"
          }}
        >
          <Typography
            sx={{
              fontSize: ["20px", "30px"],
              fontWeight: [600, "auto"]
            }}
          >
            For a more formal introduction, download my resume by clicking the
            button below!
          </Typography>
          <Box>
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              textTransform: "capitalize",
              px: "30px",
              py: "12px",
              ":hover": {
                backgroundColor: "black",
              }
            }}
            onClick={() => window.open("/Ajinkya_3_Yr_MERN_DevOPS_Cloud.pdf", "_blank")}
          >
            Download Resume
          </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
