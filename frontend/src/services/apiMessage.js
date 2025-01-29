import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/messages`,
});
export async function getMessage(id) {
  try {
    const res = await api.get(`/${id}`, { withCredentials: true });
    return res.data.messages;
  } catch (error) {
    console.log(error);
    const err = new Error();
    err.message = error.response.data.message;
    throw err;
  }
}

export async function postMessage(id, body) {
  try {
    const res = await api.post(`/${id}`, body, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    return res.data.message;
  } catch (error) {
    console.log(error);
    const err = new Error();
    err.message = error.response.data.message;
    throw err;
  }
}
