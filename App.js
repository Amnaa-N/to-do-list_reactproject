import './index.css';
import { useState } from 'react';
const initialTasks = [
  {
    task: "create a todo list",
    selected:false,
  },
];
function App() {
  const [tasks,setTasks]=useState(initialTasks);

  function handleSelection(selectedTask){
    const updatedTasks = tasks.map((task) => {
      if (task === selectedTask) {
        return { ...task, selected: !task.selected };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function handleDeletion(taskToDelete){
    const updatedTasks=tasks.filter(task => task !== taskToDelete);
    setTasks(updatedTasks);
  }

  function handleAddTask(task){
    setTasks(tasks=>[...tasks,task]);
  }

  return (
    <div className="App">
      <AddTask onAddTask={handleAddTask} />
      <TodoList tasks={tasks} onSelection={handleSelection} onDeletion={handleDeletion}/>
    </div>
  );

}

function TodoList({tasks,onSelection,onDeletion}){
  return(
    <ul>
    {tasks.map((task) => (
      <Task task={task} onSelection={onSelection} onDeletion={onDeletion}/>
      ))}
    </ul>
  );
}

function AddTask({onAddTask}){
  const [enteredTask,setEnteredTask]=useState("");

  function handleSubmit(e){
    e.preventDefault();
    if(!enteredTask)  return;
    const newTask={
      task:enteredTask,
      selected:false,
    };
    
    onAddTask(newTask);
    setEnteredTask("");
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>Add task</label>
      <input type="text" value={enteredTask} onChange={e=>setEnteredTask(e.target.value)}/>
      <button className="addbtn">Add</button>
    </form>
  );
}

function Task({task,onSelection,onDeletion}){
  return(
    <li>
      <p className={task.selected?"selected":""}>{task.task}</p>
      <button className="selectbtn" onClick={()=>onSelection(task)}> &#9745;</button>
      <button className="deletebtn" onClick={()=>onDeletion(task)}> &#9746;</button>
    </li>

  );
}



export default App;
