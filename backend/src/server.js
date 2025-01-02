import app from "./app.js";
import connectDB from "./db/index.js";

(async () => {
  try {
    await connectDB();
    app.on("error", (err) => {
      console.log(err);
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is listening at port ${process.env.PORT}🌟`);
    });
  } catch (error) {
    console.log("DB Error: ", error);
    process.exit(1);
  }
})();
