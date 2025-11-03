import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import connectDB from './src/routes/Db.js'
import authRouter from "./src/routes/auth.rout.js"
 const app = express()
 dotenv.config()
connectDB()
 app.use(cors())
 app.use(express.json())
 app.use("/api/auth", authRouter)


app.get("/", (req, res) => {
  res.send("Server is running ✅");
});
app.listen(process.env.PORT,()=>{
console.log(`Server Has Been Started at Port ${process.env.PORT}✅ `);

})