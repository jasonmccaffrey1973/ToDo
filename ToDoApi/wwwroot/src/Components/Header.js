import React, {useEffect, useState} from 'react'
import { fetchAddToDo } from '../API_communications/todos_api'

const AddTaskMenu = ({setShowAddTaskMenu})=>{
    const [formData, setFormData] = useState({title: '', description: ''})
    const [formErrors, setFormErrors] = useState([])
    const submitForm = async ()=> {
        const result = await fetchAddToDo(formData.title, formData.description)
        if (result.status !== false) {
            setFormData({title: '', description: ''})
            setShowAddTaskMenu(false)
            return
        }
        setFormErrors(result.description)
    }
    return (
        <div className="dropdown">
            <form id='create_task_form' onSubmit={(e)=>{
                e.preventDefault()
                submitForm()
            }}>
                <div className="form-header">
                    <ul className={(formErrors.length === 0) ? 'hidden' : 'form-errors'}>
                        {formErrors.map((error, index) =>{
                            return(<li key={index} className="error">{error}</li> )
                        })}
                    </ul>
                </div>
                <div className="form-body">
                    <div className="form-row">
                        <div className="form-item">
                            <input className={(formData.title !== '') ? 'has-data' : ''} type="text" name="title" id="title" value={formData.title} onChange={(e)=>{
                                setFormData({...formData, title: e.target.value})
                            }} />
                            <label htmlFor="title">Title</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-item">
                            <textarea className={(formData.description !== '') ? 'has-data' : ''} name="description" id="description" value={formData.description} onChange={(e)=>{
                                setFormData({...formData, description: e.target.value})
                            }} />
                            <label htmlFor="description">Description</label>
                        </div>
                    </div>
                </div>
                <div className="form-footer form-row">
                        <input className='bttn bttn-primary' type="submit" value='Submit Task' />
                        <button className='bttn bttn-danger' type="button" onClick={()=>{
                            setShowAddTaskMenu(false)
                        }} >Cancel</button>
                </div>
            </form>
        </div>
    )
}

export const AddToDoButton = ({getAllTasks})=> {
    const [showAddTaskMenu, setShowAddTaskMenu] = useState(false)
    useEffect(()=>{
        getAllTasks()
    }, [showAddTaskMenu])
    return (
        <div className="add-task">
            <button className='bttn bttn-success' onClick={()=>{
                setShowAddTaskMenu(!showAddTaskMenu)
            }}>Add Task</button>
            {(showAddTaskMenu) ? <AddTaskMenu setShowAddTaskMenu={setShowAddTaskMenu} /> : ''}
        </div>
    )
}

export const Header = ({getAllTasks}) => {
  return (
    <header>
        <AddToDoButton getAllTasks={getAllTasks}/>
    </header>
  )
}

export default Header