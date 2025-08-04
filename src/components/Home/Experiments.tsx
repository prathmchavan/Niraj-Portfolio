import { Box } from "@mui/material";
import { Experiments, Header, Tools } from "../Global";
import { SkillComponent } from "./SkillComponent";
import { SingleExperiment } from "./SingleExperiment";

export const ExperimentsComp = () => {
  return (
    <Box id="experiments"
      sx={{
        px: ["20px", "100px"],
        py: "50px",
        flex: 1,
      }}
    >
      <Header icon={<Experiments />} title="Experiments" />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: ["repeat(1, 1fr)", "repeat(3, 1fr)"],
          gap: 6,
          my: "80px",
        }}
      >
        {[
            {
                image: "/experiments/asp-docs.png",
                title: "ASP.NET Zero - Open Source Countribution",
                description: "ASP.NET Zero provide a robust and feature-rich starting point for new web applications built with ASP.NET Core, Entity Framework Core, and Angular. Got Featured for doing the documentation.",
                github: "",
                link: "https://docs.aspnetzero.com/aspnet-core-angular/latest/Developing-Step-By-Step-Angular-Adding-New-Menu-Item"
            }, 
            {
                image: "/experiments/onlymess.png",
                title: "OnlyMess - Meal At Your Place",
                description: "OnlyMess was first of it's kind meal (Breakfast, Lunches & Dinner) as a service platform.",
                link: "https://onlymess.in"
            },
            {
                image: "/experiments/magic.png",
                title: "Magic Pitches Demo",
                description: "Magic Pitches is a platform for Lead Generation.",
                link: "https://thrive-care.vercel.app"
            },
            {
                image: "/experiments/unibot.png",
                title: "Unibot Clone",
                description: "Unibot is a clone of https://unibot.ai, just to learn GSAP.",
                link: "https://scalpai.vercel.app"
            },
            {
                image: "/experiments/harsh.png",
                title: "HarshX Portfolio",
                description: "HarshX Portfolio is a portfolio website for my brother who is a cinematographer.",
                link: "https://harshxgallery.vercel.app"
            },
            {
                image: "/experiments/bitlords.png",
                title: "Bitlords Club",
                description: "Bitlords Club, was the first club in our college, pleasured to be the lead in it's foundation.",
                link: "https://bitlords.vercel.app"
            }
        ].map((v, idx) => 
            <SingleExperiment 
                key={idx}
                image={v.image}
                title={v.title}
                description={v.description}
                github={v?.github}
                link={v?.link}
            />
        )}     
    </Box>
    </Box>
  );
};
