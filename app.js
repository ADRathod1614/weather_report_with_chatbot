const express=require('express');
const app=express();
const hbs=require('hbs')
const bcrypt=require('bcryptjs');
const port=process.env.PORT || 5000;
const path=require('path');
require("./db/conn");
const Register=require("./models/register");
// const exp = require('constants');
// const { brotliCompress } = require('zlib');

app.use(express.json());
app.use(express.urlencoded({extended:false}))
//static path
const static_path=path.join(__dirname,"../weather-web-app-main"); 
const template_path=path.join(__dirname,"../weather-web-app-main/templates/views");
const partials_path=path.join(__dirname,"../weather-web-app-main/templates/partial")

app.set('view engine', 'hbs');
app.set('views',template_path);
hbs.registerPartials(partials_path);

app.use(express.static(static_path));

app.get("/",(req,res)=>{
    res.render('login');
});
app.get("/login",(req,res)=>{
    res.render('login');
});

app.get("/about",(req,res)=>{
    res.render('about');
});

app.get("/index",(req,res)=>{
    res.render('index');
});

//login
app.post("/login",async(req,res)=>{
    try{
        const username=req.body.username;
        const password=req.body.password;

       const Username=await Register.findOne({username:username});
    const isMatch = await bcrypt.compare(password,Username.password)
    if(isMatch){ 
            res.status(201).render('index');
         }else{
        res.send('password is not matching')
        }
    }catch(e){
        res.status(404).send("invalid");
    }
}

);
//create a new user in database

app.get("/registration",(req,res)=>{
    res.render('registration');
});
app.post("/registration", async(req,res)=>{
    try{
        const password=req.body.password;
        const c_password=req.body.c_password;
        console.log(req.body.password);
        // console.log(req.body.c_password);
        if(password === c_password){
            const employee=new Register({
                name:req.body.name,
                email:req.body.email,
                username:req.body.username,
                password:password,
                c_password:c_password,
            })

            await employee.save();
            res.status(202).render('login')
        }
        else{
            res.send("password is not matching")
        }
           
     
    }catch(e){
        res.status(404).send(e)
    }
});

app.get("/weather",(req,res)=>{
    res.render('weather');
});
app.get("*",(req,res)=>{
    res.render('error');
});

app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})