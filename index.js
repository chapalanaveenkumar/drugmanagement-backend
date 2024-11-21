const nodemon=require("nodemon");
const morgan=require("morgan");
const express=require("express");
const app=express();

const connectDb=require("./databaseConnection");
const userRouter=require("./routers/userRouter");

app.use(morgan("dev"));
app.use(express.json());
connectDb();

app.use("/",userRouter);


app.listen(3000,()=>{
    console.log(`Successfully connected to the port http://localhost:3000`);
})