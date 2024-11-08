import { Box } from "@mui/material";
import { Experience, Header } from "../Global";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { TimeLineItem } from "./TimeLineItem";

export const ExperienceComp = () => {
  return (
    <Box
      sx={{
        px: ["20px", "100px"],
        py: "50px",
        flex: 1,
      }}
    >
      <Header icon={<Experience />} title="experience" />
      <Timeline
        sx={{
          flex: 1,
          ".MuiTimelineItem-missingOppositeContent:before": { content: "none" },
          my: "80px",
          p: [0, "auto"],
        }}
      >
        <TimeLineItem
          company="Sumus Engineer Pvt. Ltd."
          location={"Jalgaon, Maharashtra"}
          work={[
            "Developed and Deployed a Full-Scale Meal Service Platform that works on subscription basis and eases lives of students, working professionals & senior citizens. Deployed it's backend on AWS EC2 and hosted it's frontend on GoDaddy.",
            "Conducted Comprehensive Market Research necessary for building the foundations for the business.",
            "Designed and Implemented Marketing Funnels to help convert prospects into leads and leads into paying customers.",
            "Managed Social Media and Performance Marketing campaign.",
            "Executed Sales Strategies for Mess Management Software by visiting messes and demonstrating them our software.",
            "Ensured High-Quality Service Delivery of meals (lunches and dinners) to our initial paying customers",
          ]}
          period={"Dec 2023 - June 2024"}
          position={"Founder & CTO"}
          logo={"/company/om.png"}
        />

        <TimeLineItem
          company="Renocrew Solutions"
          location="Jalgaon, Maharashtra"
          work={[
            "Crafted Engaging User Interfaces using Next JS, GSAP, Framer Motion and similar such libraries.",
            "Enhanced User Experience of pre-existing front-ends, prioritised tasks and delivered them smoothly and within deadline.",
            "Upscaled myself with the current industry standards while working for clients all over the world.",
          ]}
          period={"July 2023 - Nov 2024"}
          position={"Senior Frontend Developer"}
          logo={"/company/reno.png"}
        />

        <TimeLineItem
          company="EJY Health"
          location="Patna, Bihar"
          work={[
            "Collaborated with cross-functional teams as a product development intern at a health-focused startup, taking ownership of backend development with microservices architecture.",
            "Designed, developed, and maintained backend microservices, contributing to the foundation of a robust and scalable health community platform.",
            "Worked on building the backend of blogging application for healthcare domain using PostgreSQL, Node JS and AWS",
          ]}
          period={"June 2023 - Sept 2024"}
          position="Product Development Intern"
          logo={"/company/ejywebp.webp"}
        />

        <TimeLineItem
          company="Sumus Engineer Pvt. Ltd."
          location="Jalgaon, Maharashtra"
          work={[
            "Spearheaded the technical direction of a startup dedicated to fostering an engaged engineer's community.",
            "Implemented custom text-editor, rewarding system for micro interactions, complex authentication in Next JS and worked with several mongoose middlewares.",
          ]}
          period={"Sept 2022 - June 2024"}
          position="Tech Lead"
          logo={"/company/wae.svg"}
        />
        <TimeLineItem
          company="Sumus Engineer Pvt. Ltd."
          location="Jalgaon, Maharashtra"
          work={[
            "Contributed to the development of an architect-focused ecommerce platform, enabling design buying and selling for homes.",
            "Designed and implemented intuitive web interfaces, worked with firebase while integrating essential e-commerce functionalities to enhance user experience and drive seamless transactions within the architecture community.",
          ]}
          period={"Sept 2022 - June 2024"}
          position="Full Stack Development Intern"
          logo={"/company/wae.svg"}
        />
      </Timeline>
    </Box>
  );
};
