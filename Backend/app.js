import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import connectDB from './src/Db.js'
 const app = express()
 dotenv.config()
connectDB()
 app.use(cors())
 app.use(express.json())



app.listen(process.env.PORT,()=>{
console.log(`Server Has Been Started at Port ${process.env.PORT}✅ `);

})