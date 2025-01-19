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
    <Box id="experience"
      sx={{
        px: ["20px", "100px"],
        py: "50px",
        flex: 1,
      }}
    >
      <Header icon={<Experience />} title="Experience" />
      <Timeline
        sx={{
          flex: 1,
          ".MuiTimelineItem-missingOppositeContent:before": { content: "none" },
          my: "80px",
          p: [0, "auto"],
        }}
      >


        <TimeLineItem
          company="Networcx"
          location="Pune, Maharashtra"
          work={[
            "Crafted visually stunning user interfaces to elevate the overall aesthetic appeal and usability of web applications.",
            "Focused on delivering enduring user experiences, ensuring seamless navigation and interaction for enhanced engagement.",
            "Utilized Angular Material, Bootstrap, and Syncfusion in development tasks to enrich UI design and functionality.",
            "Expert in API development, facilitating seamless communication between various components of the application",
            "Workedd with Entity Framework alongside MS SQL to efficiently manage data and enhance database functionality",
            "Collaborated with cross-functional teams to gather requirements, provide technical expertise, and drive project success.",
            "Played a key role in Agile project management, actively engaging with clients to gather feedback, prioritize tasks, and ensure timely delivery of solutions.",
            "Conducted regular check-ins and follow-ups with clients to address any issues or concerns, maintaining high levels of customer satisfaction and loyalty"
          ]}
          period={"Nov 2022 - Oct 2024"}
          position={"Software developer"}
          logo={"/company/networcx_logo.jpeg"}
        />

        <TimeLineItem
          company="iAastha Technologies"
          location={"Mumbai, Maharashtra"}
          work={[
            "Building data extraction pipelines in Python for efficient processing of diverse data sources, ensuring high-quality outputs",
            "Built well-documented and efficient APIs using Node.js for seamless communication and integration between software systems"
          ]}
          period={"Dec 2021 - Oct 2022"}
          position={"Junior Developer"}
          logo={"/company/iaastha.jpeg"}
        />

        {/* <TimeLineItem------------No Need at the moment
          company="Onit"
          location="Pune , Maharashtra"
          work={[
            "Leveraged Angular 17 to implement state management techniques with RXJS and integrate Angular Material library, resulting in enhanced UI design and seamless navigation",
            "Supported cross-functional development efforts, fostering collaboration among teams to ensure project success and streamline workflows.",
          ]}
          period={"Aug 2024 - Present"}
          position="Solution Engineer | "
          logo={"/company/ejywebp.webp"}
        /> */}

      </Timeline>
    </Box>
  );
};
