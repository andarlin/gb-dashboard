import fs from "fs";
import Student from "../models/student";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

const DB_FILE_PATH = process.env.DB_FILE_PATH ?? "";

const studentsController = {
  getOne: async (req: Request, res: Response) => {
    try {
      const students: Student[] = JSON.parse(
        fs.readFileSync(DB_FILE_PATH, "utf8")
      );

      const student = students.find((student) => student.id == req.params.id);

      if (!student) {
        return res.status(400).json({
          error: "Student not found",
        });
      }

      return res.status(200).json(student);
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).json({
        error: "An error occured. Check terminal output for more details.",
      });
    }
  },

  get: async (req: Request, res: Response) => {
    try {
      const students: Student[] = JSON.parse(
        fs.readFileSync(DB_FILE_PATH, "utf8")
      );

      return res.status(200).json(students);
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).json({
        error: "An error occured. Check terminal output for more details.",
      });
    }
  },

  post: async (req: Request, res: Response) => {
    try {
      let newStudent: Student = req.body;
      newStudent.id = uuidv4();

      const students: Student[] = JSON.parse(
        fs.readFileSync(DB_FILE_PATH, "utf8")
      );

      students.push(newStudent);

      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(students));

      return res.status(201).json(newStudent);
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).json({
        error: "An error occured. Check terminal output for more details.",
      });
    }
  },

  put: async (req: Request, res: Response) => {
    try {
      const students: Student[] = JSON.parse(
        fs.readFileSync(DB_FILE_PATH, "utf8")
      );

      let studentIdx = students.findIndex(
        (student) => student.id == req.params.id
      );

      if (studentIdx < 0) {
        return res.status(400).json({
          error: "Student not found",
        });
      }

      const student: Student = { ...students[studentIdx], ...req.body };

      students[studentIdx] = student;

      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(students));

      return res.status(200).json(student);
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).json({
        error: "An error occured. Check terminal output for more details.",
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const students: Student[] = JSON.parse(
        fs.readFileSync(DB_FILE_PATH, "utf8")
      );

      let studentIdx = students.findIndex(
        (student) => student.id == req.params.id
      );

      if (studentIdx < 0) {
        return res.status(400).json({
          error: "Student not found",
        });
      }

      students.splice(studentIdx, 1);

      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(students));

      return res.status(204).json();
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).json({
        error: "An error occured. Check terminal output for more details.",
      });
    }
  },

  attachIDs: async (req: Request, res: Response) => {
    try {
      const students: Student[] = JSON.parse(
        fs.readFileSync(DB_FILE_PATH, "utf8")
      );

      if (!students || students?.length <= 0) {
        return res.status(400).json({
          error: "No students exist in database.",
        });
      }

      for (let x = 0; x < students.length; x++) {
        if (!students[x].hasOwnProperty("id")) {
          students[x].id = uuidv4();
        }
      }

      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(students));

      return res.status(200).json({
        message: "IDs have been attached to all student records in db.",
      });
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).json({
        error: "An error occured. Check terminal output for more details.",
      });
    }
  },
};

export default studentsController;
