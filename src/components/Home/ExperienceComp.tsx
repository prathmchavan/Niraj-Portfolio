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
          //flex: 1,
          display: "flex",
          ".MuiTimelineItem-missingOppositeContent:before": { content: "none" },
          my: "80px",
          p: [0, "auto"],
        }}
      >

        <TimeLineItem
          company="Onit"
          location="Pune, Maharashtra"
          work={[
                "Act as a technical solutions advisor for enterprise and mid-market clients, translating business requirements into scalable solution designs.",
                "Own end-to-end solution delivery (discovery → implementation → optimization), improving client adoption and retention.",
                "Drive cross-functional alignment across product, engineering, and business teams to resolve complex technical issues and meet delivery timelines.",
                "Operate in high-volume, multi-client environments, balancing competing priorities while maintaining service quality.",
                "Build deep system expertise, enabling independent troubleshooting and reducing reliance on engineering teams.",
                "Develop an internal Chrome extension to streamline support workflows by automating OTT authentication and surfacing key data.",
                "Reduce login time by ~93% (~5 minutes per environment batch).",
                "Improve support turnaround time and team productivity.",
                "Identify operational bottlenecks and translate them into scalable internal tooling, demonstrating strong architectural thinking beyond core responsibilities."
              ]} 
         period={"Dec 2025 - Current"}
          position={"Solution Engineer II"}
          logo={"/company/onit_logo.jpeg"}
        />

        <TimeLineItem
          company="Onit"  
          location="Pune, Maharashtra"
          work={["Delivered customized client solutions by configuring and adapting product capabilities to meet diverse business use cases.",
                "Thrived in a remote, cross-functional environment by maintaining clear documentation, accountability, and consistent communication.",
                "Built strong client relationships through consultative problem-solving, driving higher engagement and repeat business.",
                "Enhanced team efficiency by maintaining structured documentation and enabling effective knowledge sharing across teams."
              ]}
          period={"Aug 2024 - Dec 2025"}
          position={"Solution Engineer"}
          logo={"/company/onit_logo.jpeg"}
        />

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
          position={"Software Developer"}
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
