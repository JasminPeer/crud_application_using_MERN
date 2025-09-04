// Load packages
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

// create Express App
const app=express();
app.use(express.json());
app.use(cors());

// connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/BANNARI")
.then(()=>console.log("MongoDB is Connected"))
.catch((err)=>console.log("MongoDB Connection Failed:",err))

// Model
const Person=mongoose.model("Person",new mongoose.Schema({name:String,age:Number,email:String,dept:String,phone:String,address:String,year:Number}),"students");

// Read Routes
app.get("/",async(_req,res)=>
{
    try{
        const people = await Person.find().sort({name:1});
        res.json(people);
    }
    catch(e){

        res.status(500).json({error:e.message});
    }
});

// Create Routes
app.post("/",async(req,res)=>
{
    try{

        const people=await Person.create(
            {
                name: req.body.name,
                age:Number(req.body.age),
                email:req.body.email,
                dept:req.body.dept,
                phone:req.body.phone,
                address:req.body.address,
                year:Number(req.body.year)
            }
        );
        res.status(201).json(people);
    }
    catch(e){
        res.status(400).json({error:e.message});

    }
});

// Update Route,":id for print value of id=>id is parameter for api"
app.put("/:id",async(req,res)=>
{
    try{
        // findByIdUpdate it is predefined for mongoose
const  Updated=await Person.findByIdAndUpdate(
    req.params.id,
    {name:req.body.name,
    age:Number(req.body.age),
    email:req.body.email,
    dept:req.body.dept,
    phone:req.body.phone,
    address:req.body.address,
     year:Number(req.body.year)

    },
    // Predefined for new value ,It returns the new update value
    {new:true}
    
);
if(!Updated) 
    return res.status(404).json({error:"Not Found"});
res.json(Updated);
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
});
// Delete Route
app.delete("/:id",async(req,res)=>{
try{
    const deleted=await Person.findByIdAndDelete(req.params.id);
    if(!deleted)
        return res.status(404).json({error:"Not Found"});
    res.json({ok:true});//ok:true is predefined for successflly deleted
}
catch(e){
    res.status(400).json({error:e.message});

}
}
)


// Start server
app.listen(4000,()=>console.log("Server is  running in http://localhost:4000 "))

