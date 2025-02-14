import React, { useState, useContext } from 'react'
import AppContext from '../../../state/AppContext'
import { useNavigate } from 'react-router-dom'

const Project = ({ project }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description)
  const globalState = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <tr>
      {
        isEditing
          ? (
            <>
              <td>
                <input
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}
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
                  globalState.project.updateOne(globalState, project.id, {
                    name, description
                  })
                  setIsEditing(false)
                }}
                >Save
                </button>
              </td>
            </>
            )
          : (
            <>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>
                {
                project.permission
                  ? (
                    <>
                      <button onClick={() => setIsEditing(true)}>Edit</button>
                      <button onClick={() => {
                        globalState.project.deleteOne(globalState, project.id)
                      }}
                      >Delete
                      </button>
                    </>
                    )
                  : null
              }
                <button onClick={() => {
                  navigate(`/projects/${project.id}/tasks`)
                }}
                >Tasks
                </button>
              </td>
            </>
            )
      }
    </tr>
  )
}

export default Project
