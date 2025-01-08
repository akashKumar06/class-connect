import User from "../models/user.model.js";

async function createUser({ username, email, password, fullname, bio, phone }) {
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
      bio,
      phone,
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export { createUser };
