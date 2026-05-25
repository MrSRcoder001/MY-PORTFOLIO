import { useEffect, useMemo, useState } from "react";
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
import API from "../services/api";

const localSkills = [
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

const normalizeSkillName = (name = "") =>
  String(name).toLowerCase().replace(/[^a-z0-9+]+/g, "");

const iconByName = new Map(
  localSkills.map((s) => [normalizeSkillName(s.name), s.icon])
);

const Skills = () => {
  const [remoteSkills, setRemoteSkills] = useState(null);

  useEffect(() => {
    let isActive = true;

    const fetchSkills = async () => {
      try {
        const res = await API.get("/skills");
        if (!isActive) return;
        setRemoteSkills(res.data || []);
      } catch (error) {
        console.error("Error fetching skills:", error);
        if (!isActive) return;
        setRemoteSkills([]);
      }
    };

    fetchSkills();

    return () => {
      isActive = false;
    };
  }, []);

  const skillsToRender = useMemo(() => {
    if (Array.isArray(remoteSkills) && remoteSkills.length > 0) {
      return remoteSkills.map((s) => {
        const name = s?.name || "";
        return {
          name,
          level: s?.level || "",
          icon: iconByName.get(normalizeSkillName(name)) || <SiReact />,
        };
      });
    }

    return localSkills.map((s) => ({ ...s, level: "" }));
  }, [remoteSkills]);

  return (
    <section className="skills">
      <p className="skills-tag">SKILLS</p>
      <h2 className="skills-title">Tech I Work With</h2>

      <div className="skills-grid">
        {skillsToRender.map((skill, i) => (
          <div className="skill-card" key={`${skill.name}-${i}`}>
            <span className="skill-icon">{skill.icon}</span>
            <p>{skill.name}</p>
            {skill.level && <span className="skill-level">{skill.level}</span>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
