import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/files",
});

export async function uploadFile(data, parentId) {
  try {
    const res = await api.post(`/?parentId=${parentId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    const err = new Error();
    err.msg = error.response.data.message;
    throw err;
  }
}