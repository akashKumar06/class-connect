import axios from "axios";

// const api = axios.create({ baseURL: "https://class-connect-backend-jx9w.onrender.com/api/classes" });
// const api = axios.create({ baseURL: "http://localhost:8000/api/classes" });

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/classes`,
});

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
    const res = await api.get(`/?query=${query}`, {
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

export async function handleClassRequest(classId, studentId, status) {
  try {
    const res = await api.get(`/${studentId}/${classId}/${status}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    const err = new Error();
    err.message = error.response.data.message;
    throw err;
  }
}

export async function getClassRequests(classId) {
  try {
    const res = await api.get(`/requests/${classId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    const err = new Error();
    err.message = error.response.data.message;
    throw err;
  }
}

export async function postNotification(message) {
  try {
    const res = await api.post(`/notifications`, message, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    return res.data.notifications;
  } catch (error) {
    const err = new Error();
    err.message = error.response.data.message;
    throw err;
  }
}

export async function getNotifications() {
  try {
    const res = await api.get(`/notifications`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.notifications;
  } catch (error) {
    const err = new Error();
    err.message = error.response.data.message;
    throw err;
  }
}

export async function deleteNotifications(classId, id) {
  try {
    const res = await api.delete(`/notifications/${classId}/${id}`, {
      withCredentials: true,
    });
    return res.data.notifications;
  } catch (error) {
    const err = new Error();
    err.message = error.response.data.message;
    throw err;
  }
}

export async function getAllStudentsOfClass(classId) {
  try {
    const res = await api.get(`/all-students/${classId}`, {
      withCredentials: true,
    });
    return res.data.students;
  } catch (error) {
    const err = new Error();
    err.message = error.response.data.message;
    throw err;
  }
}

export async function leaveClass() {
  try {
    const res = await api.get("/leave-class", {
      withCredentials: true,
    });
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
