const express=require("express");

const mongoose= require("mongoose");

const app=express();
app.use(express.json());
const connect=()=>{
     return mongoose.connect("mongodb+srv://ayshasinara:A3011998.s@cluster0.kjqbq.mongodb.net/books?retryWrites=true&w=majority")
}
const bookSchema=new mongoose.Schema({
    name:{type:String,require:true}
})
const Book=mongoose.model("books",bookSchema)
app.get("/books",async(req,res)=>{
    try{
        const books=await Book.find().lean().lean()
        return res.status(200).send(books)
    }catch{
        return res.send({message:"something went wrong"})
    }
})
app.post("/books",async(req,res)=>{
    try{
        const books=await Book.create(req.body)
        return res.status(200).send({books})
    }catch{
        return res.send({message:"something went wrong"})
    }
})
app.get("/books/:name",async(req,res)=>{
    try{
        const books=await Book.find({name:req.params.name}).lean().exec()
        return res.status(200).send({books:books})
    }catch{
        return res.send({message:"something went wrong"})
    }
})


app.listen(4000,async()=>{
    try{
        await connect();
    }catch(err){
        console.log(err)
    }
    console.log("listening on port 4000")
})