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
    <Box id="education"
      sx={{
        px: ["20px", "100px"],
        py: "50px",
        flex: 1
      }}
    >
  <Header icon={<Education />} title="Education" />
      <Timeline
        sx={{
          flex: 1,
          ".MuiTimelineItem-missingOppositeContent:before": { content: "none" },
          my: ["80px", "80px"],
          p: [0, "auto"],

        }}
      >
        <TimeLineItem
          company="Savitribai Phule Pune University"
          location={"Pune, Maharashtra"}
          period={"2018 - 2022"}
          position={"B.E. in Computer Engineering"}
          logo={"/edu/sppu2.jpeg"}
        />

        <TimeLineItem
          company="Swami Vivekananda Junior College"
          location="Jalgaon, Maharashtra"
          period={"2019 - 2021"}
          position={"11th - 12th"}
          logo={"/edu/mj.png"}
        />

        {/* <TimeLineItem
          company="New English Medium School"
          location="Jalgaon, Maharashtra"
          period={"2008 - 2019"}
          position="Primary & Secondary Schooling"
          logo={"/edu/school.png"}
        /> */}
      </Timeline>
    </Box>
  );
};
