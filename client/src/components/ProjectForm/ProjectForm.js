import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../../state/AppContext'
import { useNavigate } from 'react-router-dom'

const ProjectForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const globalState = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    globalState.project.emitter.removeAllListeners('GET_PROJECTS_SUCCESS')
    globalState.project.emitter.addListener('GET_PROJECTS_SUCCESS', () => {
      navigate('/projects')
    })
  }, [])

  return (
    <div>
      <h1>Project Form</h1>
      <input
        type='text'
        placeholder='name'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='description'
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button onClick={() => {
        globalState.project.createOne(globalState, { name, description })
      }}
      >
        Create
      </button>
    </div>
  )
}

export default ProjectForm
