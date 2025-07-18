"use client";

import { Box, Button, Typography } from "@mui/material";
import { Header, Resume } from "../Global";
import Image from "next/image";

export const ResumeComp = () => {
  return (
    <Box id="resume"
      sx={{
        px: ["20px", "100px"],
        py: "50px",
      }}
    >
      <Header icon={<Resume />} title="Resume" />
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
          src={"/resume/img.png"}
          // width={600}
          // height={300}
          fill
          alt={"Niraj's Resume"}
          style={{
            objectFit: "contain",
            border: "1px solid #D9D9D9",
            borderRadius: "10px",
            overflow: "hidden",
            cursor: "pointer"
          }}
          onClick={() => window.open("/resume/Resume.pdf", "_blank")}
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
            button Download below or contact me for more details!
          </Typography>
          <Box>
          <Button
            sx={{
              backgroundColor: "white",
              color: "black",
              textTransform: "capitalize",
              px: "30px",
              py: "12px",
              ":hover": {
                backgroundColor: "gray",
                color:"white  "
              }
            }}
            onClick={() => window.open("/resume/Resume.pdf", "_blank")}
          >
            Download Resume
          </Button>

          <Button
            sx={{
              backgroundColor: "white",
              marginLeft: "20px",
              color: "black",
              textTransform: "capitalize",
              px: "30px",
              py: "12px",
              ":hover": {
                backgroundColor: "gray",
                color:"white  "
              }
            }}
            
            href="mailto:nirajchavan2511@gmail.com?subject=Contacted from Portfolio&body=Hi Niraj,"
          >
            Contact Me
          </Button>
          
          </Box>
          <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
        </Box>
        </Box>
      </Box>
      <Box
          sx={{
            marginBottom: "200px",
          }}
        >          
        </Box>
    </Box>
  );
};
