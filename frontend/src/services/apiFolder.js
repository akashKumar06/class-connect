import axios from "axios";

const api = axios.create({
  baseURL: "https://class-connect-backend-jx9w.onrender.com/api/folders",
});

export async function createFolder(folder, id) {
  try {
    let query = `/create-folder`;
    if (id !== null) {
      query += `?parentId=${id}`;
    }

    const res = await api.post(query, folder, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    const err = new Error();
    err.msg = error?.respones?.data?.message;
    throw err;
  }
}

export async function getFolder(id) {
  let query = "/";
  if (id !== "root") {
    query = `?folderId=${id}`;
  }

  try {
    const res = await api.get(query, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    const err = new Error();
    err.msg = error.response.data.message;
    throw err;
  }
}

export async function getHierarchy(id) {
  try {
    const res = await api.get(`hierarchy/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.array;
  } catch (error) {
    const err = new Error();
    err.msg = error.response.data.message;
    throw err;
  }
}
