import React from 'react'
import './Task.css'
import {FaEdit,FaTrashAlt,FaCheckDouble} from "react-icons/fa"

const Task = ({completeTask,id,name,date,completed,editTask,deleteTask}) => {

  return (
    <div id={id} className={completed?'task completed':'task'}>
      <span>
        {
          completed?<del style={{color:"#000"}} ><p><b>Task: </b>{name}</p></del>:<p><b>Task: </b>{name}</p>
        }
        
        <p><b>Date: </b>{date}</p>
      </span>
      <span className='buttons'>
        <button onClick={()=>{
          editTask(id)
        }}>
          <FaEdit color="green"/>
        </button>
        <button onClick={()=>{
          deleteTask(id)
        }}>
          <FaTrashAlt color="red"/>
        </button>
        <button onClick={()=>{
          completeTask(id)
        }}>
          <FaCheckDouble color='purple'/>
        </button>
      </span>
    </div>
  )
}

export default Task