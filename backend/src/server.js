import connectDB from "./db/index.js";
import server from "./socket.js";

(async () => {
  try {
    await connectDB();
    server.on("error", (err) => {
      console.log(err);
    });

    server.listen(process.env.PORT, () => {
      console.log(`Server is listening at port ${process.env.PORT}🌟`);
    });
  } catch (error) {
    console.log("DB Error: ", error);
    process.exit(1);
  }
})();
