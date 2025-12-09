import Express from 'express';
import prisma from '../src/config/DBConnection.js'
import AuthRouter from './routes/Auth.js';
const app = new Express();
app.use(Express.json());

app.get("/", (req,res)=>{
    res.json("Hello World!");
})

app.use(AuthRouter);


app.listen(3000,'localhost',()=>{
    console.log("Running at localhost:3000");
})