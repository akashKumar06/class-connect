import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000/api/classes" });

export async function createClass(classData) {
  try {
    const res = await api.post("/", classData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data.data;
  } catch (error) {
    const err = new Error();
    err.message = error.response.data.message;
    throw err;
  }
}

export async function getClass() {
  try {
    const res = api.get("/", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.cls;
  } catch (error) {
    const err = new Error();
    err.message = error.response.data.message;
    throw err;
  }
}

export async function getClasses(query) {
  try {
    const res = await api.get("/", {
      params: { query },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.classes;
  } catch (error) {
    console.log(error);
    const err = new Error();
    err.message = error.response.data.message;
    throw err;
  }
}
