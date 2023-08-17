const mongoose=require('mongoose');

const DB='mongodb+srv://abhay7028rathod:test1614@cluster0.wknxbr2.mongodb.net/login?retryWrites=true&w=majority';

mongoose.connect(DB).then(()=>{
    console.log('connection successful');
}).catch((err)=>console.log(err));
