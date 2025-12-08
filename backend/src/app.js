import Express from 'express';

const app = new Express();
app.use(Express.json());

app.get("/",(req,res)=>{
    res.json("Hello World")
})


app.listen(3000,'localhost',()=>{
    console.log("Running at localhost:3000");
})