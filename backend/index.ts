import routes from "./routes";
import fs from "fs";
import "dotenv/config";

const DB_FILE_PATH = process.env.DB_FILE_PATH ?? "";

if (!DB_FILE_PATH) {
  throw Error(`DB_FILE_PATH not specified. Remove ".example" file extension from, 
  .env.example file.`);
}

if (!fs.existsSync(DB_FILE_PATH)) {
  var writeStream = fs.createWriteStream(DB_FILE_PATH);
  writeStream.write("[]");
  writeStream.end();
}

routes();
