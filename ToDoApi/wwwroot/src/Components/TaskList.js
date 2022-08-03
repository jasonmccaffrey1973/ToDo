import React, {useState} from 'react'
import { setTaskStatus } from '../API_communications/api.helpers'
import { fetchDeleteToDo, fetchUpdateToDo} from '../API_communications/todos_api'

const statuses = [
    {
        value: 0,
        label: 'Created'
    },{
        value: 1,
        label: 'Started'
    },{
        value: 2,
        label: 'Completed'
    }]

export const TaskList = ({tasks, setTasks, getAllTasks}) => {

    const ShowTaskDetails = ({taskData, setModalOpen})=> {
        return (
            <div className="modal-backdrop">
                <div className="modal">
                    <div className="modal-header">
                        <div className="close" onClick={()=>setModalOpen('none')}>&times;</div>
                        <div className="modal-title">{taskData.title}</div>
                    </div>
                    <div className="modal-body">
                        <div className="task-description">
                            <h2 className="item-title">Description</h2>
                            <div className="content">{taskData.description}</div>
                        </div>
                        <div className="task-status">
                            <h2 className="item-title">Status</h2>
                            <div className="content">{statuses[taskData.status].label}</div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="bttn bttn-danger" onClick={()=>setModalOpen('none')}>Close</button>
                    </div>
                </div>
            </div>
        )
    }
    
    const EditTask =  ({taskData, setModalOpen})=> {
        const [formData, setFormData] = useState(taskData)
        return (
            <div className="modal-backdrop">
                <div className="modal">
                <div className="modal-header">
                    <div className="close" onClick={()=>setModalOpen('none')}>&times;</div>
                </div>
                <div className="modal-body">
                    <div className="form-row">
                        <label htmlFor="title">Title </label>
                        <input name='title' id='title' type="text" value={formData.title} onChange={(e)=>{
                            setFormData({...formData, title: e.target.value})
                        }} />
                    </div>
                    <div className="form-row">
                        <label htmlFor='desc'>Description</label>
                        <textarea name="desc" id="desc" value={formData.description} onChange={(e)=>{
                            setFormData({...formData, description: e.target.value})
                        }}></textarea>
                    </div>
                    <div className="form-row">
                        <label htmlFor='status'>Status </label>
                        <select name='status' id='status' value={formData.status} onChange={(e)=>{
                            setFormData({...formData, status: e.target.value})
                        }}>{statuses.map(status=><option key={`${formData.id}-${status.value}`} value={status.value}>{status.label}</option>)}</select>
                </div>
                <div className="modal-footer">
                    <button className="bttn bttn-success" onClick={async ()=>{
                        await fetchUpdateToDo(formData.id, formData)
                        getAllTasks()
                        setModalOpen('none')

                    }}>Save</button>
                    <button className="bttn bttn-danger" onClick={()=>setModalOpen('none')}>Close</button>
                </div>
            </div>
        </div>
        </div>
        )
    }


const Task = ({taskData, setModalOpen, setActiveTask})=> {
        return (
            <tr className="task-row">
                <td className="complete-status"><select value={taskData.status} onChange={ async (e)=> {
                    await setTaskStatus(taskData, e.target.value)
                    getAllTasks()
                }}>{statuses.map(status=>
                    <option key={`${taskData.id}-${status.value}`} value={status.value}>{status.label}</option>
                )}</select></td>
                <td className="task-title" onClick={() => {
                    setActiveTask(taskData)
                    setModalOpen('details')
                } }>{taskData.title}</td>
                <td className="task-actions">
                    <button className="bttn bttn-danger" onClick={()=> {
                        fetchDeleteToDo(taskData.id)
                        setTasks(tasks.filter(task => task.id !== taskData.id))
                    }}> <div className="trash-icon"></div> </button>
                    <button className="bttn bttn-default" onClick={() => {
                        setActiveTask(taskData)
                        setModalOpen('edit')
                    }}><div className='edit-icon'></div></button>
                </td>
            </tr>
        )
    }

    const [modalOpen, setModalOpen] = useState('none')
    const [activeTask, setActiveTask] = useState(null)
  return (
    <>
    <table className="tasks-wrapper">
        <thead>
            <tr className="task-row">
                <th className="complete-status">Status</th>
                <th className="task-title">Title</th>
                <th className="task-actions">Actions</th>
            </tr>
        </thead>
        <tbody>
            {tasks.map(task=><Task key={task.id} taskData={task} setModalOpen={setModalOpen} setActiveTask={setActiveTask} />)}
        </tbody>
    </table>
    {(modalOpen === 'details') ? <ShowTaskDetails taskData={activeTask} setModalOpen={setModalOpen} /> : ''}
    {(modalOpen === 'edit') ? <EditTask taskData={activeTask} setModalOpen={setModalOpen} /> : ''}
    </>
  )
}

export default TaskList