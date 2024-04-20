import React from "react";
import Rank from "./Rank.js";

function Preference({ projects = [], onRankChange }) {
  const labels = ["Project Number", "Project Title"];

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "20px", justifyContent: "center" }}>
      <Rank onRankChange={onRankChange} />
      <table style={{ margin: "0px" }}>
        <thead>
          <tr>
            {labels.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.number}>
              <td>{project.number}</td>
              <td>{project.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Preference;
