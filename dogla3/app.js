import express from "express"
import * as db from "./db.js"

const PORT = 3311;

const app = express()

app.get("/books", (req, res) =>{
    const books = db.getBooks()
    res.status(200).json(books)
})

app.get("/books/:id", (req, res) =>{
    const book = db.getBookById(req.params.id)
    if(!book){
        res.status(400).json("Book not found")
    }

    res.status(200).json(book)
})

app.post("/books", (req, res) =>{
   const {title, author, year} = req.body
   if (!title || !author || !year){
    res.status(400).json("Missing data")
   }
   try{
    const saved = db.addBook(title, year, author)
    const book = db.getBookById(saved.lastInsertRowid)
    res.status(201).json(book)
   }catch(error){
      res.status(404).json({message: error})
   }
    
})

app.put("books/:id", (req,res) =>{
    const {title, author, year} = req.body
    const id = req.params.id
  if (!title || !author || !year){
    res.status(400).json("Missing data")
   }
   db.updateBook(id, title, author,year)
   const book = db.getBookById(id)
   res.status(200).json(book)
})

app.listen(PORT, () =>{
    console.log("Szalad")
})
