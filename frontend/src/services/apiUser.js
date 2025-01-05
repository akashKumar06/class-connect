import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/users",
});

export async function register(user) {
  try {
    const res = await api.post("/register", user, {
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

export async function login(user) {
  try {
    const res = await api.post("/login", user, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    const data = res.data;
    return data.user;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function logout() {
  try {
    const res = await api.get("/logout", {
      withCredentials: true,
    });
    const data = res.data;
    if (!data.success) throw new Error(data.message);
    return data.success;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUser() {
  try {
    const res = await api.get("/profile", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    const data = res.data;
    return data.user;
  } catch (error) {
    console.log(error);
  }
}
