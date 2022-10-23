import React, { useEffect, useRef, useState } from "react";
import useLocalStorage from "use-local-storage";
import Task from "./Task";
import "./TaskManager.css";

const TaskManager = () => {
  // state for saving name and date value from input element
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

// state for saving all tasks
  // const [tasks, setTasks] = useState([]);

// state for saving tasks in Local-storage
const [tasks, setTasks] = useLocalStorage("tasks",[]);


//state for adding task id for Editing purpose on editing button click
  const [taskId,setTaskId] = useState(null)

//state for adding dynamic classes for Editing purpose on editing button click
  const [isEditing,setIsEditing] = useState(false)

// useRef for focusing on inpute when page load (with useEffect)
  const taskRef = useRef(null);

// function for submiting the form
  const handleSubmit = (e) => {
    e.preventDefault();

    if ( (!name && !date) || !name || !date ) {
        alert("Please enter Task and Date") 

    }else if(name && date && isEditing)
    {
        setTasks(
          tasks.map((task)=>{
            if (task.id === taskId) {
              return {...task,name,date,completed:false} 
              
            }
            return task;
          })
        )

      setName("");
      setDate('');
      setIsEditing(false)
      setTaskId(null)

    }else{
        const newTask = {
            id:Date.now(),
            name:name,
            date:date,
            completed:false
        }
        // console.log(newTask)
        setTasks([...tasks,newTask])
        setName("");
        setDate('');
    }
   
    
  };

// function for Editing the task provided ID
  const editTask =(id)=>{
    const thisTask = tasks.find((task)=>{
      return task.id === id;
    })
    setIsEditing(true);
    setTaskId(id);
    setName(thisTask.name)
    setDate(thisTask.date)
  }

// function for Deleting the task provided ID
  const deleteTask=(id)=>{
    // console.log("task deleted")
    if (window.confirm("Delete this task") === true) {
      
      const taskToDelete = tasks.filter((task)=>{
        return task.id !== id;
      })
      setTasks(taskToDelete);
    }
    }

// function for Completing the task provided ID
  const completeTask=(id)=>{
    setTasks(
      tasks.map((task)=>{
        if (task.id === id) {
          return {...task,completed:true}
        }
        return task;
      })
    )
  }

// function for unCompleting the task provided ID
  const uncompleteTheTask=(id)=>{
    setTasks(
      tasks.map((task)=>{
        if (task.id === id) {
          return {...task,completed:false}
        }
        return task;
      })
    )
  }

// useEffect for focusing on input page load (first thing)
  useEffect(()=>{
    taskRef.current.focus();
})

  return (
    <div className="--bg-primary --p --mh-100vh">
      <h1 className="--color-white --text-center">Tasks-Manager</h1>
      <div className="--flex-center">
        <div className="--flex-center --card --width-500px --bg-white">
          <form onSubmit={handleSubmit} className="--form-control --p">

            <div>
              <label htmlFor="name">Task:</label>
              <input
                ref={taskRef}
                value={name}
                onChange={(e) => setName(e.target.value) }
                type="text"
                name="name"
                id="name"
                placeholder="Task-name"
              />
            </div>

            <div className="--d-flex --align-center">
              <label htmlFor="date">Date:</label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                className="--w100"
                name="date"
                id="date"
              />

            </div>

            <div>
              <button className="--btn --btn-lg --btn-block --btn-success">
              {
                isEditing?"Edit Task":"Save Task"
              }
              </button>
            </div>

          </form>
        </div>
      </div>

      <div className="--p  --my2 --color-white --flex-center">
        <div className="--width-500px">
          <h2 className="--color-white">Task List</h2>
          <hr className="--bg-white" />
          {
            tasks.length === 0 ?(
                <p className="--color-white --my">No Tasks added Yet!</p>
            ):(
                tasks.map((task,idx)=>{
                    return <Task uncompleteTheTask={uncompleteTheTask} completeTask={completeTask} deleteTask={deleteTask} editTask={editTask} key={task.id} {...task} />
                })
            )
          }
          
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
