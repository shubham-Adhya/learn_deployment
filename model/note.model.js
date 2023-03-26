const mongoose=require("mongoose")

//note schema

// pust user id in notes schema
// notes ---> dependent
// user ---> independent
// one to many relation

const noteSchema=mongoose.Schema({
    title:String,
    body: String,
    sub: String,
    userID: String
},{
    versionKey:false
})

const NoteModel=mongoose.model("note",noteSchema)

module.exports={
    NoteModel
}