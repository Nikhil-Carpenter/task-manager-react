import { useEffect } from 'react';
import './App.css';
import TasksManagerReducer from './components/tasksManager/TasksManagerReducer';
// import TaskManager from './components/tasksManager/TaskManager';

function App() {
  
  return (
    <div className="App">
      {/* <TaskManager/> */}
      <TasksManagerReducer/>
    </div>
  );
}

export default App;
