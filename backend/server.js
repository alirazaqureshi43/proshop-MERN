import express from "express";
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from "cookie-parser";
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./config/db.js";
connectDB()
const port = process.env.PORT || 5000;
const app = express();
app.get('/',(req,res)=>{
    res.send('Api running...')
})
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=> console.log(`Server running on port ${port}`))