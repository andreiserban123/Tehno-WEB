import EventEmitter from '../../utils/EventEmitter'
import { SERVER } from '../../config/global'

class ProjectStore {
  constructor () {
    this.data = []
    this.count = 0
    this.emitter = new EventEmitter()
    this.selectedProject = null
  }

  async getAll (state, pageNumber = 1, pageSize = 10, filterField = '', filterValue = '', sortField = '', sortOrder = '') {  
    try {
      const response = await fetch(`${SERVER}/api/users/${state.user.data.id}/projects?pageSize=${pageSize || ''}&pageNumber=${pageNumber || ''}&filterField=${filterField || ''}&filterValue=${filterValue || ''}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}`, {
        headers: {
          authorization: state.user.data.token
        }
      })
      if (!response.ok) {
        throw response
      }
      const content = await response.json()
      this.data = content.data
      this.count = content.count
      this.emitter.emit('GET_PROJECTS_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_PROJECTS_ERROR')
    }
  }

  async getOne (state, projectId) {
    try {
      const response = await fetch(`${SERVER}/api/users/${state.user.data.id}/projects/${projectId}`, {
        headers: {
          authorization: state.user.data.token
        }
      })
      if (!response.ok) {
        throw response
      }
      const content = await response.json()
      this.selectedProject = content
      this.data = { ...content }  // Also update data for compatibility
      this.emitter.emit('GET_PROJECT_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_PROJECT_ERROR')
    }
  }

  async createOne (state, project) {
    try {
      const response = await fetch(`${SERVER}/api/users/${state.user.data.id}/projects`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authorization: state.user.data.token
        },
        body: JSON.stringify(project)
      })
      if (!response.ok) {
        throw response
      }
      this.getAll(state)
    } catch (err) {
      console.warn(err)
      this.emitter.emit('ADD_PROJECT_ERROR')
    }
  }

  async updateOne (state, id, project) {
    try {
      const response = await fetch(`${SERVER}/api/users/${state.user.data.id}/projects/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          authorization: state.user.data.token
        },
        body: JSON.stringify(project)
      })
      if (!response.ok) {
        throw response
      }
      this.getAll(state)
    } catch (err) {
      console.warn(err)
      this.emitter.emit('SAVE_PROJECT_ERROR')
    }
  }

  async deleteOne (state, id) {
    try {
      const response = await fetch(`${SERVER}/api/users/${state.user.data.id}/projects/${id}`, {
        method: 'delete',
        headers: {
          authorization: state.user.data.token
        }
      })
      if (!response.ok) {
        throw response
      }
      this.getAll(state)
    } catch (err) {
      console.warn(err)
      this.emitter.emit('DELETE_PROJECT_ERROR')
    }
  }
}

export default ProjectStore