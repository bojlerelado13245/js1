import Database from "better-sqlite3"

const db = new Database("./database.sqlite")

db.prepare(
    `CREATE TABLE IF NOT EXISTS books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    year INTEGER
    )`
).run()

export const getBooks = () => db.prepare(`SELECT * FROM books`).all()

export const getBookById = (id) => db.prepare(`SELECT * books WHERE id =?`).get(id)

export const addBook = (title, author, year) => db.prepare(`INSERT INTO books (title,author,year) VALUES(?,?,?)`).run(title, author, year)

export const updateBook = (id, title, author, year) => db.prepare(`UPDATE books SET title=?, author=?, year=? WHERE id=?`).run(title, author, year, id)

const books = getBooks()
if(books.lenghts==0){
    addBook("Harry Potter","J.K. Rowling",1997)
    addBook("Random konyv","asd",2007)
    addBook("A könyv","idk",1000)
}
