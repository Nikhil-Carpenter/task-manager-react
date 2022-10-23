export const taskReducer =(state,action)=>{

    if (action.type === 'EMPTY_FIELDS') {
      return{
        ...state,
        isAlertOpen:true,
        alertClass:"danger",
        alertContent:"Please enter name and date",

      }
    }

    if(action.type ==="CLOSE_ALERT") {
      return{...state,isAlertOpen:false,}
    }

    if (action.type === "ADD_TASK") {
      // console.log(action.payload);
      const allTasks = [...state.tasks,action.payload];
      return{
        ...state,
        tasks:allTasks,
        isAlertOpen:true,
        alertContent:"Task added successfully",
        alertClass:"success"
      }
    }

    if (action.type === "OPEN_EDIT_MODAL") {
      console.log(action.payload);
      return {
        ...state,
        taskId:action.payload,
        modalTitle:"Edit Task",
        modalMsg:"You are about to Edit the Task",
        modalActionText:"Edit",
        isEditModalOpen:true
      }
    }

    if (action.type === "CLOSE_MODAL") {
      return{
        ...state,
        isEditModalOpen:false,
        isDeleteModalOpen:false
      }
    }

    if(action.type === "EDIT_TASK"){
      return{
        ...state,
        isEditing:true,
      }
    }

    if (action.type === "UPDATE_TASK") {
      // console.log(action.payload);
      const updatedTask = action.payload;
      const id = action.payload.id;
      const updateIndex = state.tasks.findIndex((task)=>{
        return task.id === id;
      })
      // console.log(updateIndex);
      if (updateIndex!== -1) {
        state.tasks[updateIndex]= updatedTask;
      }
      return {
        ...state,
        isEditing:false,
        isAlertOpen:true,
        alertContent:"Task updated ",
        alertClass:"success"
      }

    }

    if (action.type === "OPEN_DELETE_MODAL") {
      console.log(action.payload);
      return{
        ...state,
        taskId:action.payload,
        isDeleteModalOpen:true,
        modalTitle:"Delete Task",
        modalMsg:"You are about to DELETE this task",
        modalActionText:"Delete",
      }
    }

    if (action.type ==="DELETE_TASK") {
      console.log(action.payload)
      const id = action.payload;
      const newTasks = state.tasks.filter((task)=>{
        return task.id !== id;
      })
      console.log(newTasks);
      return {
        ...state,
        tasks:newTasks,
        isAlertOpen:true,
        alertContent:"Task Deleted Successfull..",
        alertClass:"success",
        isDeleteModalOpen:false
      }
   
      
    }

    if (action.type==="COMPLETE_TASK") {
      // console.log(action.payload);
      const id = action.payload;
      const taskIndex = state.tasks.findIndex((task)=>task.id===id)
      // console.log(taskIndex)
      let updatedTask = {
        id:id,
        name:state.tasks[taskIndex].name,
        date:state.tasks[taskIndex].date,
        completed:true,
      }

      if (taskIndex !== -1) {
        state.tasks[taskIndex]=updatedTask;
      }
      return {
        ...state,
        isAlertOpen:true,
        alertContent:"Task completed ",
        alertClass:"success",
      }
    }

  return state;  
}