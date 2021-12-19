import express, { request } from "express";

const app = express();

app.get("/", (request, response) => {
  return response.json({ msg: "OPAA" });
});

app.listen(3333, () => {
  console.log("🚀 SERVER RUNNING 🚀");
});
