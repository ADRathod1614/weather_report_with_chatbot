const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')
const user=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    c_password:{
        type:String,
        require:true
    },
})
user.pre("save", async function(next){
    if(this.isModified("password")){
        console.log(`current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password,10)
        console.log(`hash password is ${this.password}`);
        this.c_password=undefined;
    }
     next();
})

//create a collection
const Register=new mongoose.model("Register",user);

module.exports=Register;