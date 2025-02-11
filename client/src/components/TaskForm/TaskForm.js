import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../../state/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const TaskForm = () => {
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const globalState = useContext(AppContext)
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    globalState.task.emitter.removeAllListeners('GET_TASKS_SUCCESS')
    globalState.task.emitter.addListener('GET_TASKS_SUCCESS', () => {
      navigate(`/projects/${params.pid}/tasks`)
    })
  }, [])


  return (
    <div>
      <h1>Task Form</h1>
      <input
        type='text'
        placeholder='title'
        value={title}
        onChange={e => setTitle(e.target.value)} 
      />
      <input
        type='text'
        placeholder='description'
        value={description}
        onChange={e => setDescription(e.target.value)} 
      />
      <button onClick={() => 
        {
          globalState.task.createOne(globalState, params.pid, { title, description })
        }}>
        Create
      </button>
    </div>
  )
}

export default TaskForm