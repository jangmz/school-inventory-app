import express from "express";
import dotenv from "dotenv";
import homeRouter from "./routes/homeRouter.js";
import laptopsRouter from "./routes/laptopsRouter.js";

// .env file is at root
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app.use("/", homeRouter);
app.use("/laptops", laptopsRouter);

app.listen(PORT, () => {
    console.log(`Express app is running on port:${PORT}`);
})