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
  { name: "Python", icon: <SiPython color="#3776AB" /> },
  { name: "Django", icon: <SiDjango color="#092E20" /> },
  { name: "React", icon: <SiReact color="#61DAFB" /> },
  { name: "Node JS", icon: <SiNodedotjs color="#339933" /> },
  { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
  { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
  { name: "MySQL", icon: <SiMysql color="#4479A1" /> },
  { name: "Docker", icon: <SiDocker color="#2496ED" /> },
  { name: "AWS", icon: <FaAws color="#FF9900" /> },
  { name: "PostgreSQL", icon: <SiPostgresql color="#4169E1" /> },
  { name: "Firebase", icon: <SiFirebase color="#FFCA28" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss color="#06B6D4" /> },
  { name: "Bootstrap", icon: <SiBootstrap color="#7952B3" /> },
  { name: "GitHub", icon: <SiGithub color="#ffffff" /> },
  { name: "Java", icon: <SiOpenjdk color="#ED8B00" /> },
  { name: "C / C++", icon: <SiCplusplus color="#00599C" /> },
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
          icon: iconByName.get(normalizeSkillName(name)) || <SiReact color="#61DAFB" />,
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
