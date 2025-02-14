import EventEmitter from "../../utils/EventEmitter";
import { SERVER } from "../../config/global";

class UserStore {
  constructor() {
    this.data = {};
    this.list = [];
    this.emitter = new EventEmitter();
  }

  async register(email, password) {
    try {
      const response = await fetch(`${SERVER}/auth/register`, {
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
      this.emitter.emit("REGISTER_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("REGISTER_ERROR");
    }
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
      console.log(this.data);
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

  async deleteOne(id) {
    try {
      const response = await fetch(`${SERVER}/admin/users/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          authorization: this.data.token,
        },
      });
      if (!response.ok) {
        throw response;
      }
      this.getAll();
    } catch (error) {
      console.warn(error);
      this.emitter.emit("DELETE_USER_ERROR");
    }
  }
  // admin
  async getAll() {
    try {
      const url = `${SERVER}/admin/users`;
      const response = await fetch(url, {
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
      this.emitter.emit("GET_USERS_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("GET_USERS_ERROR");
    }
  }

  async updateOne(user) {
    try {
      const response = await fetch(`${SERVER}/admin/users/${user.id}`, {
        method: "put",
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
      this.emitter.emit("UPDATE_USER_ERROR");
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
