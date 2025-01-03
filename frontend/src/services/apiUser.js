import axios from "axios";
class UserApi {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:8000/api/users",
    });
  }

  async register(user) {
    try {
      const res = await this.api.post("/register", user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = res.data;
      if (!data.success) throw new Error(data.message);
      return data.success;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async login(user) {
    try {
      const res = await this.api.post("/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = res.data;
      if (!data.success) throw new Error(data.message);
      return data.user;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

const userApi = new UserApi();
export default userApi;
