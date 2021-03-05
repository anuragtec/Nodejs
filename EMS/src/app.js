const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");

//-------------getting conn.js file-----
require("./db/conn")
const Register = require("./models/registration");

//setting port
const port = process.env.PORT || 5000;

//setting folder path
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const  partialsPath = path.join(__dirname, "../templates/partials");


//to get the user input from forms
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//getting folder path-------
app.use(express.static(staticPath));


//setting views engine------
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

//=======web pages===========


app.get("/", (req,res) =>{
    res.render("index");
});

app.get("/register", (req,res) =>{
    res.render("register");
});

app.get("/login", (req,res) =>{
    res.render("login");
});

//creating users info in DB----
app.post("/register", async (req,res) =>{
    try{
        
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;

        if(password === cpassword){
            //getting data html body----
            const regEmployee = new Register({
                fname : req.body.fname,
                lname : req.body.lname,
                gender: req.body.gender,
                phone : req.body.phone,
                email : req.body.email,
                password : req.body.pass,
                confirmPassword : req.body.cpass
            });


            //saving data into DB------

        const registered =  await regEmployee.save();
        res.status(201).render("login")



        }else{
             res.send("password are not matching");
             console.log("password are not matching");
        }

    }catch(error){
        res.status(400).send(error);
    }
   
});


app.post("/login", async (req,res) =>{
    
    try{

        const username = req.body.username;
        const password = req.body.userpass;

        const useremail =  await Register.findOne({email : username})
        
        if(useremail.password === password ){

            res.status(201).render("index");
        }else{
            res.send("Password are not matching")
        }

    }catch(error){
        res.status(400).send("invalid credentials");
        
    }
});

// reading data ------(using postman  ) 
app.get("/check", async (req,res) => {

    try{
       const studentsData =  await Register.find();
       res.send(studentsData);
    }catch(e){
        res.send(e);
    }
}) 
// updating data using id --------(using postman  ) 
app.patch("/check/:id", async (req,res) => {

    try{
        const _id = req.params.id;
        const updateStudents =await Register.findByIdAndUpdate(_id, req.body, {
            new : true
        } );
        res.send(updateStudents);
    }catch(e){
        res.status(404).send(e)    };
})


//deleting data using id-------------(using postman  ) 

app.delete("/check/:id", async(req,res) => {
    try{
        const deleteStudent = await Register.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
    }catch(e){
        res.status(500).send(e);
    }
})





//-------listening port(localhost)------
app.listen(port, () =>{
    console.log(`port no = ${port}`);
});




