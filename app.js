import express from "express";
import {fileURLToPath} from "url";
import path from "path";
import dotenv from "dotenv";
import homeRouter from "./routes/homeRouter.js";
import laptopsRouter from "./routes/laptopsRouter.js";
import tabletsRouter from "./routes/tabletsRouter.js";

// .env file is at root
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// directory name & serving static files (css, images,...)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app.use("/", homeRouter);
app.use("/laptops", laptopsRouter);
app.use("/tablets", tabletsRouter);

app.listen(PORT, () => {
    console.log(`Express app is running on port:${PORT}`);
})