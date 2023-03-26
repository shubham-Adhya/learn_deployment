const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/note.routes")
require('dotenv').config()
const {auth}=require("./middleware/auth.middleware")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)

app.use(auth)
app.use("/notes",noteRouter)
app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to the DB")
    } catch (error) {
        console.log("Cannot connect to DB")
        console.log(error)
    } 
    console.log(`Server is running at PORT ${process.env.port}`)
})