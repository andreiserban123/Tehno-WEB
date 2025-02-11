import React, { useState, useContext } from 'react'
import AppContext from '../../../state/AppContext'
import { useParams, useNavigate } from 'react-router-dom'

const Task = ({ task }) => {
  const [ isEditing, setIsEditing ] = useState(false)
  const [ title, setTitle ] = useState(task.title)
  const [ description, setDescription ] = useState(task.description)
  const globalState = useContext(AppContext)
  const params = useParams()
  const navigate = useNavigate()

  return (
    <tr>
      {
        globalState.user.data.id === task.permission?.forUser ? (
          isEditing ? (
            <>
              <td>
                <input 
                  type='text'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </td>
              <td>
                <input 
                  type='text'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
                <button onClick={() => setIsEditing(false)}>Cancel</button>
                <button onClick={() => {
                  globalState.task.updateOne(globalState, project.id, {
                    task, description 
                  })
                  setIsEditing(false)
                }}>Save</button>
              </td>
            </>
          ) : (
            <>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.assignedTo ? task.assignedTo.email : 'unassigned'}</td>
              <td> 
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => {
                  globalState.task.deleteOne(globalState, params.pid, task.id)
                }}>Delete</button>
                <button onClick={() => {
                  navigate(`/projects/${params.pid}/tasks/${task.id}`)
                }}>Details</button>
              </td>
            </>
          )
        ) : (
          <>
            
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.assignedTo ? task.assignedTo.email : 'unassigned'}</td>
              <td>  
                <button onClick={() => {
                  navigate(`/projects/${params.pid}/tasks/${task.id}`)
                }}>Details</button>
              </td>
          </>
        )
      }
     
    </tr>
  )
}

export default Task