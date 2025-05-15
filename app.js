const express = require("express");
const app = express();
const port = 3000;
const appUrl = `http://localhost:${port}`;
const postsRouter = require("./routers/router");

app.use(express.static("public"));
app.use(express.json());

app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`Server listening on ${appUrl}`);
});
