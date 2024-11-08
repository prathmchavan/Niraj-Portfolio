import { Box } from "@mui/material";
import { Education, Header } from "../Global";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { TimeLineItem } from "./TimeLineItem";

export const EducationComp = () => {
  return (
    <Box
      sx={{
        px: ["20px", "100px"],
        py: "50px",
        flex: 1
      }}
    >
      <Header icon={<Education />} title="education" />
      <Timeline
        sx={{
          flex: 1,
          ".MuiTimelineItem-missingOppositeContent:before": { content: "none" },
          my: ["80px", "80px"],
          p: [0, "auto"],

        }}
      >
        <TimeLineItem
          company="SSBT's C.O.E.T."
          location={"Jalgaon, Maharashtra"}
          period={"2021 - 2025"}
          position={"B.E. in Computer Engineering"}
          logo={"/edu/ssbt.png"}
        />

        <TimeLineItem
          company="Swami Vivekananda Junior College"
          location="Jalgaon, Maharashtra"
          period={"2019 - 2021"}
          position={"11th - 12th"}
          logo={"/edu/mj.png"}
        />

        <TimeLineItem
          company="New English Medium School"
          location="Jalgaon, Maharashtra"
          period={"2008 - 2019"}
          position="Primary & Secondary Schooling"
          logo={"/edu/school.png"}
        />
      </Timeline>
    </Box>
  );
};
