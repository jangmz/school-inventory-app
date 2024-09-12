import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

//app.use("/", homeRouter);

app.listen(PORT, () => {
    console.log(`Express app is running on port:${PORT}`);
})