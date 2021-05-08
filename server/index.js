const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/UserAuth", {});
mongoose.connection
  .on("error", (error) => {
    console.log(
      chalk.red(`An error occurred while connecting to Database:> ${error}`)
    );
    Process.exit(1);
  })
  .once("open", () => {
    console.log(chalk.greenBright("Successfully connected to Database"));
  });

const adminUserRoute = require("./routes/adminUser");
const userRoute = require("./routes/user");

app.use("/api", adminUserRoute);
app.use("/api/user", userRoute);

app.listen(PORT, (error) => {
  if (error)
    console.log(chalk.red("An error occurred while connecting to the server."));
  console.log(
    chalk.greenBright(
      `Successfully connected to the Port http://localhost:${PORT}`
    )
  );
});
