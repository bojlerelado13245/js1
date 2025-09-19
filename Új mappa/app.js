import express from 'express';


const app = express();
const port = 3001;

app.use(express.json());
const movies = [
  { id: 1, title: 'Back to the future', year: 1985 },
  { id: 2, title: 'The Matrix', year: 1999 },
    { id: 3, title: 'Inception', year: 2010 }
];



app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

app.get('/movies/:id', (req, res) => {
    const uid = parseInt(req.params.id);
    const user = movies.find(user => user.id === uid);

    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.post('/movies', (req, res) => {
    const { title, year } = req.body;
    console.log(req.body);
    if (!title || !year) {
        return res.status(400).json({ message: 'Title and year are required' });
    }
    const id = movies[movies.length - 1]?.id + 1;
    const data = { id, title, year };
    movies.push(data);
    res.status(201).json(data);
});


app.put('/movies/:id', (req, res) => {
    const uid = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id === uid);
    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }
     const { title, year } = req.body;
    console.log(req.body);
    if (!title || !year) {
        return res.status(400).json({ message: 'Title and year are required' });
    }
   const index =  movies.indexOf(movie);
   movies[index] = { id: uid, title, year };
   res.status(200).json(movies[index]);
});

app.delete('/movies/:id', (req, res) => {
 const uid = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id === uid);
    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    const index =  movies.findIndex(movie => movie.id === uid);
    movies.splice(index, 1);
    res.status(204).send();
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});