import EventEmitter from "../../utils/EventEmitter";
import { SERVER } from "../../config/global";

class UserStore {
  constructor() {
    this.data = {};
    this.list = [];
    this.emitter = new EventEmitter();
  }

  async login(email, password) {
    try {
      const response = await fetch(`${SERVER}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        throw response;
      }
      this.data = await response.json();
      this.emitter.emit("LOGIN_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("LOGIN_ERROR");
    }
  }

  async logout() {
    try {
      const response = await fetch(`${SERVER}/auth/logout`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: this.data.token,
        }),
      });
      if (!response.ok) {
        throw response;
      }
      this.data = {};
      this.emitter.emit("LOGOUT_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("LOGOUT_ERROR");
    }
  }

  async getAll() {
    try {
      const response = await fetch(`${SERVER}/admin/users`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: this.data.token,
        },
      });

      if (!response.ok) {
        throw response;
      }

      this.list = await response.json();
      console.log(this.list);
      this.emitter.emit("GET_USERS_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("GET_USERS_ERROR");
    }
  }

  async createOne(user) {
    try {
      const response = await fetch(`${SERVER}/admin/users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: this.data.token,
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw response;
      }
      this.getAll();
    } catch (err) {
      console.warn(err);
      this.emitter.emit("ADD_USER_ERROR");
    }
  }
}

export default UserStore;
