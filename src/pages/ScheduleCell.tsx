import React from 'react'

import '../styles/ScheduleCell.css'

interface  Program{
  "media_id": number,
  "title": string,
  "description": string,
  "human_start_time": string,
  "human_end_time": string,
  "custom_info": {
      "Graficos": {
          "ImagemURL": string,
          "LogoURL": string,
      },
      "Tipo": string,
  }
}
const ScheduleCell = (props: { program: Program, active:boolean }) => {
  const { program, active } = props
  console.log(active)
  return (
    !active ? (
        <div className="schedule-cell">
          <img src={program.custom_info.Graficos.LogoURL} alt="logo" />
          <div className="schedule-cell-text">
            <h4> {program.title} </h4>
              <span>Horario: {program.human_start_time.substr(0, 5)} até {program.human_end_time.substr(0, 5)} </span>
          </div>
        </div>
      )
      :
      (
        <div className="schedule-cell" style={{backgroundColor:'lightyellow'}}>
        <img src={program.custom_info.Graficos.LogoURL} alt="logo" />
        <div className="schedule-cell-text">
          <h4> {program.title} </h4>
            <div className="current-program-cell">
              <span>Horario: {program.human_start_time.substr(0, 5)} até {program.human_end_time.substr(0, 5)} </span>

            </div>
          </div>
           <span className="current-alert">No ar! </span>
        </div>
      )

  )
}

export default ScheduleCell