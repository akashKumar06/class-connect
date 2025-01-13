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

export async function joinClass(studentId, classId) {
  try {
    const res = await api.get(`/${classId}/${studentId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    const err = new Error();
    err.message = error.response.data.message;
    throw err;
  }
}

export async function handleClassRequest(studentId, classId, status) {
  try {
    const res = api.get(`/${classId}/${studentId}/${status}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    const err = new Error();
    err.message = error.response.data.message;
    throw err;
  }
}
