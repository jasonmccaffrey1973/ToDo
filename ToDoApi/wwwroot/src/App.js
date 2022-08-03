import React, {useState, useEffect} from 'react'
import { fetchGetAllToDos } from './API_communications/todos_api'
import Complete from './Components/Complete'
import Header from './Components/Header'
import TaskList from './Components/TaskList'


export const App = () => {
  const [tasks, setTasks] = useState([])

  const getAllTasks = async ()=> {
    const alltasks = await fetchGetAllToDos()
    setTasks(alltasks)
  }

  useEffect(()=>{
    getAllTasks()
  }, [])


  return (
    <div className="container">
      <Header getAllTasks={getAllTasks} />
      {(tasks.length > 0) ? <TaskList tasks={tasks} setTasks={setTasks} getAllTasks={getAllTasks} /> : <Complete />}
    </div>
  )
}
 
export default App