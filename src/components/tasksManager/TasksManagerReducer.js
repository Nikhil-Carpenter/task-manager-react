import React, { useEffect, useRef, useState,useReducer } from "react";
import useLocalStorage from "use-local-storage";
import Alert from "../alert/Alert";
import Confirm from "../confirm/Confirm";
import Task from "./Task";
import "./TaskManager.css";
// reducer import
import { taskReducer } from "./taskReducer";


const TasksManagerReducer = () => {

// state for saving name and date value from input element
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

// state for saving tasks in Local-storage
const [tasks, setTasks] = useLocalStorage("tasks",[]);

// Initial State
const initialState = {
  tasks,
  taskId:null,
  isEditing:false,
  isAlertOpen:false,
  alertContent:"This is an Alert!",
  alertClass:"danger",
  isEditModalOpen:false,
  isDeleteModalOpen:false,
  modalTitle:"Delete Task",
  modalMsg:"You are about to Delete this task",
  modalActionText:"OK"
  
}

// Reducer for state
const [state,dispatch] = useReducer(taskReducer,initialState)

// state for saving all tasks
  // const [tasks, setTasks] = useState([]);

//state for adding task id for Editing purpose on editing button click
  // const [taskId,setTaskId] = useState(null)

//state for adding dynamic classes for Editing purpose on editing button click
  // const [isEditing,setIsEditing] = useState(false)

// useRef for focusing on inpute when page load (with useEffect)
  const taskRef = useRef(null);

// function for submiting the form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date) {
      dispatch({
        type:"EMPTY_FIELDS",
      })
    }

    if (name && date && state.isEditing) {
      const updatedTask = {
        id:state.taskId,
        name,date,
        completed:false
      }
      dispatch({
        type:"UPDATE_TASK",
        payload:updatedTask
      })
      setName('')
      setDate('')
      setTasks(
        tasks.map((task)=>{
          if (task.id === updatedTask.id) {
            return{
              ...task,name,date,completed:false
            }
          }
          return task
        })
      )
      return;
    }

    if(name && date){
      const newTask = {
        id: Date.now(),
        name,
        date,
        completed:false
      }
      dispatch({
        type:"ADD_TASK",
        payload:newTask
      })
      setName("")
      setDate("")
      setTasks([...tasks,newTask])
    }

  };

//Function for opening the edit modal
const openEditModal =(id)=>{
  dispatch({
    type:"OPEN_EDIT_MODAL",
    payload:id
  })
}

// function for Editing the task provided ID
  const editTask =()=>{
    // console.log(state.taskId);
    const id = state.taskId;
    dispatch({
      type:"EDIT_TASK",
      payload:id
    })

    const thisTask = state.tasks.find((task)=>{
      return task.id === id
    })
      setDate(thisTask.date)
      setName(thisTask.name)
      closeModal()
  }

// function for opening the delete modal provided ID
  const OpenDeleteModal =(id)=>{
    dispatch({
      type:"OPEN_DELETE_MODAL",
      payload:id,
    })
  }

// function for Deleting the task provided ID
  const deleteTask=()=>{
    // console.log("task deleted")
    const id = state.taskId;
    dispatch({
      type:"DELETE_TASK",
      payload:id
    })
    const newTasks = tasks.filter((task)=> task.id !== id)
    setTasks(newTasks)
  }
// function for Completing the task provided ID
  const completeTask=(id)=>{
    dispatch({
      type:"COMPLETE_TASK",
      payload:id
    })
    setTasks(
      tasks.map((task)=>{
          if (task.id===id) {
            return { ...task,completed:true }
          }    
        return task;
      })     
    )
  }

// function for unCompleting the task provided ID
  // const uncompleteTheTask=(id)=>{
  //   setTasks(
  //     tasks.map((task)=>{
  //       if (task.id === id) {
  //         return {...task,completed:false}
  //       }
  //       return task;
  //     })
  //   )
  // }

// useEffect for focusing on input page load (first thing)
  useEffect(()=>{
    taskRef.current.focus();
})

const closeAlert = ()=>{
  dispatch({
    type:"CLOSE_ALERT"
  })
}

const closeModal =()=>{
  dispatch({
    type:"CLOSE_MODAL"
  })
}



  return (
    <div className="--bg-primary --p --mh-100vh">
      { state.isAlertOpen && 
      <Alert
        onCloseAlert={closeAlert}
        alertClass={state.alertClass} 
        alertContent={state.alertContent}
        />  
      }
      {
        state.isEditModalOpen && 
        <Confirm 
          modalTitle={state.modalTitle}
          modalMsg={state.modalMsg}
          modalActionText={state.modalActionText}
          onCloseModal={closeModal}
          modalAction={editTask}
          />
      }
      {
        state.isDeleteModalOpen && 
        <Confirm 
          modalTitle={state.modalTitle}
          modalMsg={state.modalMsg}
          modalActionText={state.modalActionText}
          onCloseModal={closeModal}
          modalAction={deleteTask}
          />
      }
        
      <h1 className="--color-white --text-center">Tasks-Manager-Reducer</h1>
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
                state.isEditing?"Edit Task":"Save Task"
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
            state.tasks.length === 0 ?(
                <p className="--color-white --my">No Tasks added Yet!</p>
            ):(
                state.tasks.map((task,idx)=>{
                    return <Task
                      completeTask={completeTask}
                      deleteTask={OpenDeleteModal}
                      editTask={openEditModal}
                      key={task.id} {...task} />
                })
            )
          }
          
        </div>
      </div>
    </div>
  );
};

export default TasksManagerReducer;
