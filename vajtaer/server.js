const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // CORS მხარდაჭერის დამატება
app.use(bodyParser.json());
app.use(express.static('public')); // ქულადი ფაილების გაწვდვა (HTML, JS, CSS)

let comments = []; // კომენტარების მასივი

app.post('/comments', (req, res) => {
    const { comment } = req.body;
    comments.push(comment);
    res.json({ message: 'Comment added successfully!' });
});

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});