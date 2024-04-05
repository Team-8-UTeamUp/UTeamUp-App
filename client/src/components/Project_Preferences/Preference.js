import React, { useState } from "react";

function Preference({projects =[]}){

  const labels= ['Project Number', 'Compant Name', 'Project Title', 'Max Teams'];
  const projs = projects;

  return(
   <div style={{display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: "center" }}>
      <Rank/>
      <table style={{ margin: "0px"}}>
      <thead>
        <tr>
          {labels.map((lable) => (
            <th key={lable}>{lable}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      {
          projs.map(project => (
              <tr key={project.number}>
                <td>{project.number}</td>
                <td>{project.company}</td>
                <td>{project.title}</td>
                <td>{project.maxTeams}</td>
              </tr> 
          ))
      }
      </tbody>
    </table>
   </div>
  )
}

export default Preference;
