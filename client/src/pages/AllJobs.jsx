import React, { useEffect, useState } from 'react'
import axios from "axios"

function AllJobs() {
  const [job,setJob]=useState([]);
  useEffect( ()=>{
    try{
    const getdata = async()=>{
    let job= await axios.get("http://localhost:8000/api/jobs",{withCredentials:true});
    console.log(job.data.jobs)
    setJob(job.data.jobs);
    }
    getdata();
    }catch(error){
      console.log(error);
    }
  },[])

  return (
    <div >

       <div className='flex max-w-7xl mx-auto justify-center items-center flex-wrap'>
        {job.map((job)=>{
          return (

            <div className='h-50 w-[50%]' key={job._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
              <h2>{job.title}</h2>
              <p>Location: {job.location}</p>
            </div>
          )
        })}
      </div>
    </div>

  )
}

export default AllJobs