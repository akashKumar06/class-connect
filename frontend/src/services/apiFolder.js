import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/folders",
});

export async function createFolder(folder, id = "") {
  try {
    let query = `/create-folder`;
    if (id !== "") {
      query += `?parentId=${id}`;
    }
    const res = await api.post(query, folder, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    const err = new Error();
    err.msg = error?.respones?.data?.message;
    throw err;
  }
}
