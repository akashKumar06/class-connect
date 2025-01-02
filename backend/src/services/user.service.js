import User from "../models/user.model.js";

async function createUser({ username, email, password, fullname }) {
  try {
    if ([username, email, password, fullname].some((field) => !field))
      throw new Error("All fields are required");

    const user = await User.create({
      username,
      email,
      password,
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname?.lastname || "",
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export { createUser };
