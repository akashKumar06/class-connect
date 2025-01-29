import mongoose from "mongoose";

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/classdb`
    );
    console.log(
      `MongoDB connected\nConnection Instance: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    throw error;
  }
}

export default connectDB;
