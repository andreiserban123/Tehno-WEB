import EventEmitter from '../../utils/EventEmitter'
import { SERVER } from '../../config/global'

class UserSuggestionStore {
   constructor () {
    this.data = []
    this.emitter = new EventEmitter()
  }

  async search (state, partialMatch) {
    try {
      const response = await fetch(`${SERVER}/api/users/suggestions?partial=${partialMatch}`, {
        headers: {
          authorization: state.user.data.token
        }
      })
      if (!response.ok) {
        throw response
      }
      this.data = await response.json()
      this.emitter.emit('USER_SEARCH_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('USER_SEARCH_ERROR')
    }
  }

}

export default UserSuggestionStore