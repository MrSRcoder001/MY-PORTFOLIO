import {
  SiPython,
  SiDjango,
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiPostgresql,
  SiFirebase,
  SiTailwindcss,
  SiBootstrap,
  SiGithub,
  SiOpenjdk,
  SiCplusplus
} from "react-icons/si";
import "../styles/skills.css";

import { FaAws } from "react-icons/fa";

const skills = [
  { name: "Python", icon: <SiPython /> },
  { name: "Django", icon: <SiDjango /> },
  { name: "React", icon: <SiReact /> },
  { name: "Node JS", icon: <SiNodedotjs /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "MySQL", icon: <SiMysql /> },
  { name: "Docker", icon: <SiDocker /> },
  { name: "AWS", icon: <FaAws /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Bootstrap", icon: <SiBootstrap /> },
  { name: "GitHub", icon: <SiGithub /> },
  { name: "Java", icon: <SiOpenjdk /> },
  { name: "C / C++", icon: <SiCplusplus /> },
];

const Skills = () => {
  return (
    <section className="skills">
      <h2>My Skills</h2>

      <div className="skills-grid">
        {skills.map((skill, i) => (
          <div className="skill-card" key={i}>
            <span className="skill-icon">{skill.icon}</span>
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills; // ✅ MOST IMPORTANT LINE
