const express = require('express')
const app = express();
const notes = require('./notes')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 5000
app.get('/', (req, res) => {
    res.send("the api is running !!!")
})


app.get('/api/notes', (req, res)=>{
    res.json(notes)
})


app.get('/api/notes/:id' , (req,res) => {
    const singleNote = notes.find((n) => n._id === req.params.id)
    res.send(singleNote)
})


// Creating a server at localhost 3000
app.listen(PORT, () => {
    console.log(`The server started at http://localhost:${PORT}`)
})
