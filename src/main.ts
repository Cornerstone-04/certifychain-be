import express from "express";

export const app = express();
app.get("/", (_, res) => {
  res.json({ message: "hello world" });
});

app.listen(3000);
