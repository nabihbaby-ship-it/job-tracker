import { useState } from "react"

function Jobitem ({job, onnotechange, onstatuschange, löschen, changejob,}) {

    const [editing, setediting] = useState(false)
    const [tempposition, settempposition] = useState(job.position)

    const handlesave = () => {

    changejob(job.id, tempposition)
    setediting(false)
}

    return(

        <div className="">

        {editing ? (

            <>

              <p>{job.position} {job.status} {job.company}</p>

              <input type="text" 
              value={tempposition}
              onChange={(e) => settempposition(e.target.value)}/>

    <textarea 
    value={job.note || ""}
    onChange={(e) => onnotechange(job.id, e.target.value)}/>

    <select value={job.status} 
    onChange={(e) => onstatuschange(job.id, e.target.value)}> 

    <option value="bewerbt">bewerbt</option>
    <option value="interview">interview</option>
    <option value="absage">absage</option>
    
    </select>
       </> ) : (

         <>
            <p>company: {job.company}</p>
            <p>status: {job.status}</p>
            <p>position: {job.position}</p>
            <p>notiz: {job.note  || "keine"}</p>

             </> 
        )}


    <button onClick={editing ? handlesave : () => setediting(true)}>{editing ? "speichern" : "bearbeiten"}</button>

    <button onClick={() => löschen(job.id)}>löschen</button>

    </div>
   
    )
}

export default Jobitem 


