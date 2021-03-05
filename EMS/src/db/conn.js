const mongoose = require("mongoose");


//connecting with database and creating new db 
mongoose.connect("mongodb://localhost:27017/studentDetails",{
    //to avoid dep. errors
    useNewUrlParser: true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify: false
}).then(() =>{
    console.log("connection successful");
}).catch((error) =>{
    console.log("sorry.. no connection");
}); 