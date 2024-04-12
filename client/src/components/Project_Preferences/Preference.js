import React, { useState } from "react"
import Rank from "./Rank.js"

function Preference({projects =[]}){

  const labels= ['Project Number', 'Company Name', 'Project Title'];
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
              </tr> 
          ))
      }
      </tbody>
    </table>
   </div>
  )
}

export default Preference;