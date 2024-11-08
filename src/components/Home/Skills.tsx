import { Box } from "@mui/material";
import { Header, Tools } from "../Global";
import { SkillComponent } from "./SkillComponent";

export const Skills = () => {
  return (
    <Box
      sx={{
        px: ["20px", "100px"],
        py: "50px",
        flex: 1,
      }}
    >
      <Header icon={<Tools />} title="skills" />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: ["repeat(1, 1fr)", "repeat(2, 1fr)"],
          gap: 2,
          my: "80px",
        }}
      >
        <SkillComponent
          image={"/skills/web.png"}
          title="Web Development"
          sub="(HTML, CSS, Javascript, Typescript)"
        />
        <SkillComponent
          image={"/skills/nextjs.png"}
          title="Frontend Development"
          sub="(Next JS, React JS, Angular JS)"
        />
        <SkillComponent
          image={"/skills/nodejs.png"}
          title="Backend Development"
          sub="(Node JS, Express JS, Nest JS, Spring Boot)"
        />
        <SkillComponent
          image={"/skills/db.png"}
          title="Databases"
          sub="(MongoDB, MySQL, PostgreSQL, Firebase)"
        />
        <SkillComponent
          image={"/skills/eth.png"}
          title="Web3"
          sub="(Solidity, Ethers JS, Hardhat)"
        />
        <SkillComponent
          image={"/skills/code.png"}
          title="Programming Languages"
          sub="(C, C++, Java, Kotlin, Dart, Solidity)"
        />
        <SkillComponent
          image={"/skills/cross.png"}
          title="Cross Platform Development"
          sub="(React Native, Flutter, Electron JS)"
        />
        <SkillComponent
          image={"/skills/devops.png"}
          title="DevOps"
          sub="(Docker, Kubernetes)"
        />
        <SkillComponent
          image={"/skills/aws.png"}
          title="Micro-services"
          sub="(AWS EC2, Apache Kafka)"
        />
        <SkillComponent
          image={"/skills/git.png"}
          title="Deployment"
          sub="(Github CI/CD, AWS, Vercel)"
        />

        <SkillComponent image={"/skills/figma.png"} title="UI" sub="(Figma)" />
        <SkillComponent
          image={"/skills/ml.png"}
          title="AI"
          sub="(Tensorflow, LLM, LangChain, ML)"
        />
        <SkillComponent
          image={"/skills/fb.png"}
          title="Performance Marketing"
          sub="(Facebook Ads, LinkedIn Ads)"
        />
      </Box>
    </Box>
  );
};
