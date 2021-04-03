import React from 'react'

import '../styles/CurrentProgram.css'

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

function CurrentProgram(props: { currentProgram: Program }) {
  const {currentProgram} = props
  return (
    <div className="current-container">
      <div className="current-program">
        <span>Em exibição: {currentProgram?.title}</span>
        <br/>
        <span>({currentProgram?.human_start_time} às {currentProgram?.human_end_time})</span>
      </div>
      <img src={currentProgram.custom_info.Graficos.ImagemURL} alt="logo" />
    </div>
  )
}

export default CurrentProgram;
