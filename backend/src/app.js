import Express from 'express';
import prisma from '../src/config/DBConnection.js'
const app = new Express();
app.use(Express.json());

// Try create user and send user response
app.get("/",async (req,res)=>{
    const user = await prisma.user.create({
        data : {
            id : "id-123",
            username : "wayanpratama",
            fullname : "wayan pratama",
            password : "adit123",
            created_at : new Date()
        }
    }) 

    console.log("Craeted User", user);
    const allUsers = await prisma.user.findMany()
    console.log("Query all user",allUsers)

    res.json("this is all users",allUsers);
})


app.listen(3000,'localhost',()=>{
    console.log("Running at localhost:3000");
})