const express = require("express")
const noteRouter = express.Router()
const {NoteModel}=require("../model/note.model")
const jwt = require('jsonwebtoken');



noteRouter.get("/",async(req,res)=>{
    const token =req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"masai")
    try {
        if(decoded){
            // console.log(decoded)
            const notes=await NoteModel.find({"userID":decoded.userID})
            res.status(200).send(notes)
        }else{
            res.status(400).send({"msg":"No note has been created by the user"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

noteRouter.post("/add",async (req,res)=>{
    try {
        const note=new NoteModel(req.body)
        await note.save()
        res.status(200).send({"msg":"A new Note has been added"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
    
})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    const token =req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"masai")
    const noteID=req.params.noteID
    const payload=req.body
    try {
        if(decoded){
            await NoteModel.findByIdAndUpdate({_id:noteID,userID:decoded.userID},payload)
            res.status(200).send({"msg":"Note has been updated"})
        }else{
            res.status(400).send({"msg":"Authorization Failed"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const token =req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"masai")
    const noteID=req.params.noteID
    try {
        if(decoded){
            await NoteModel.findOneAndDelete({_id:noteID,userID:decoded.userID})
            res.status(200).send({"msg":"Note has been deleted"})
        }else{
            res.status(400).send({"msg":"Authorization Failed"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports={
    noteRouter
}