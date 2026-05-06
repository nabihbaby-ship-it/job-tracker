import { useEffect, useState } from "react";
import './styles.css';
import Jobitem from "./jobitem"



function App () {

  const [filter, setfilter] = useState("alle")
const [company, setcompany] = useState("");
const [position, setposition] = useState("");
const [status, setstatus] = useState("bewerbt")
const [error, seterror] = useState("")

  const [jobs, setjobs] = useState(()=> {
    const saved = localStorage.getItem("jobs")
    return saved ? JSON.parse(saved) : []
  })

  const text = ()=> {
    
    if (jobs.length === 0){
     return "keine jobs vorhanden"
    }

    else if (jobs.length === 1){
      return "1 job vorhanden"
    }

    else {

      return `${jobs.length} jobs erhalten`
    }
  }

  const changejob = (id, newjob) => {setjobs(prev => prev.map(job => job.id === id ? {...job, position: newjob}: job))}

  const löschen = (id) => setjobs(prev => prev.filter( job => job.id !== id))


const updatenote = (id, newnote) => {

  setjobs(prev => prev.map(job => job.id === id  ? {...job, note: newnote} : job))
}

  const updatestatus = (id, newstatus) => {

    setjobs(prev => prev.map(job => job.id === id ? {...job, status: newstatus} : job))
  }

  const handlefilter = () => {

return jobs.filter(job=> {if (filter === "alle")return true 
  return job.status === filter
})}

  const adjob = () => {

     if (!position || !company){

      seterror("bitte beide felder ausfüllen")
      return
      
     }
      

    const newjob = {

    id: Date.now(),
    company: company,
    position: position,
    status: status,
    note: ""
  }

  setjobs(prev => [...prev, newjob])

  setcompany("");
  setposition("");
  setstatus("bewerbt");
  seterror("")}

useEffect(()=> {localStorage.setItem("jobs", JSON.stringify(jobs))},[jobs])

  return(

    <>

    <div className="infos">
    <p>Filter: {filter}</p>

    <p className="filtertext">{text()}</p>

    <p> {filter}: {handlefilter().length}</p>
    </div>

      
  
  <div className="buttons">
    <button onClick={()=> setjobs([])}>reset</button>

    <button onClick={()=> {setfilter("alle");
    }}>alle</button>
    <button onClick={()=>setfilter("interview")}>interview</button>
    <button onClick={()=>setfilter("bewerbt")}>bewerbt</button>
    </div>
    




{error && <p style={{color: "red"}}>{error}</p>}
  
<div className="inputs">
<input type="text"
placeholder="company"
value={company}
onChange={(e)=> setcompany(e.target.value)}
onKeyDown={(e)=> {if (e.key === "Enter"){adjob()}}}
/>

<input type="text" 
placeholder="position"
value={position}
onChange={(e)=> setposition(e.target.value)}
onKeyDown={(e) => {if (e.key === "Enter"){adjob()}}}
/>


<select value={status}
onChange={(e) => setstatus(e.target.value)}>
  <option value="bewerbt">bewerbt</option>
  <option value="interview">interview</option>
  <option value="absage">absage</option>
</select>

<button onClick={adjob}>hinzufügen</button>
</div>


<div className="jobs">
{handlefilter().map((job) => 

<Jobitem 
key={job.id}
job={job}
changejob={changejob}
onnotechange={updatenote}
onstatuschange={updatestatus}
löschen={löschen}/>
)}
</div>


 
  </>)
}

export default App