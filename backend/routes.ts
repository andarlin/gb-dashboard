import express from "express";
import bodyParser from "body-parser";
import studentsController from "./controllers/studentsController";
import cors from "cors";

const routes = () => {
  const app = express();
  const port = 3000;

  app.use(cors({ origin: ["http://localhost:5500", "http://127.0.0.1:5500"] }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw());

  app.listen(port, () => {
    console.log(`Backend Listening on port ${port}`);
  });

  app.get("/students", studentsController.get);
  app.get("/students/:id", studentsController.getOne);
  app.post("/students", studentsController.post);
  app.put("/students/:id", studentsController.put);
  app.delete("/students/:id", studentsController.delete);
  app.put("/students-attachIDs", studentsController.attachIDs);
};

export default routes;
