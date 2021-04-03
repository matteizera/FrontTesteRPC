import React, { useEffect, useState } from 'react'
import api from '../services/api'
import '../styles/ProgramList.css'
import CurrentProgram from './CurrentProgram'
import NoSchedule from './NoSchedule'
import ScheduleCell from './ScheduleCell'


interface  Programs{
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

enum Days{
  Domingo,
  Segunda,
  Terça,
  Quarta,
  Quinta,
  Sexta,
  Sabado,
}

enum Months{
  Janeiro,
  Fevereiro,
  Março,
  Abril,
  Maio,
  Junho,
  Julho,
  Agosto,
  Setembro,
  Outubro,
  Novembro,
  Dezembro
}

function handleProgram(programs: Programs[]) {
  const hora = new Date().toTimeString().substr(0,8)
  let currentProgram;
  programs.forEach(program => {
    if (Date.parse(`01/01/2011 ${program.human_start_time}`) <= Date.parse(`01/01/2011 ${hora}`)
      && Date.parse(`01/01/2011 ${program.human_end_time}`) > Date.parse(`01/01/2011 ${hora}`))
    {
      currentProgram = program
      }
  })
  return currentProgram
}

const todayDateToString = () => {
  const date = new Date()
  const currentDate = date.getDate()
	const currentMonth = date.getMonth() + 1
  const currentYear = date.getFullYear()
  return new Date(`${currentYear + "-" + currentMonth + "-" + currentDate} 00:00:00`).toISOString().substr(0, 10)
}

const fixProgramTimeToUTC = (programs: Programs[]) => {

  const newList = programs.map(program => {
    let newProgram = program
    let startTime = new Date(`2021-01-01 ${program.human_start_time.substr(0,5)} UTC`).toTimeString().substr(0,5)
    newProgram.human_start_time = startTime
    let endTime = new Date(`2021-01-01 ${program.human_end_time.substr(0,5)} UTC`).toTimeString().substr(0,5)
    newProgram.human_end_time = endTime
    return newProgram
  })
  return newList
}
function Schedule() {
  const [programs, setPrograms] = useState<Programs[]>([])
  const [date, setDate] = useState(todayDateToString())
  const [currentProgram, setCurrentProgram] = useState<Programs>()
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {

    api.get( date.toString() ).then(response => {
      const { entries } = response.data.programme
      const fixedUTCPrograms = fixProgramTimeToUTC(entries)
      setPrograms(fixedUTCPrograms)
      setCurrentProgram(handleProgram(fixedUTCPrograms))
    }).catch(error => {
        setPrograms([])
    })
    let selectedDate = new Date(`${ date.toString()} 00:00:00`)
    setCurrentDate(selectedDate)
  }, [date])
  return (
    <div id="page-schedule-container">
      <main>
        <div className="page-schedule">
            <div className="date-picker">
            <span>
              Selecione outro dia para ver sua programação.
            </span>
            <input type="date" name="data" id="data" value={date}  onChange={(e)=>setDate(e.target.value)} />
          </div>
          {programs.length !== 0 ? (
          <>
          {currentProgram && <CurrentProgram currentProgram={currentProgram}/>}
          <fieldset>
            <legend>Programação de {Days[currentDate.getDay()]}, {currentDate.getDate()} { Months[currentDate.getMonth()] }</legend>
                {programs && programs.map(program => <ScheduleCell program={program} active={currentProgram?.media_id===program.media_id}/>)}

              </fieldset>
          </>
          )
          : <NoSchedule/>}

        </div>
      </main>
    </div>
  )
}
export default Schedule