const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Body-parser middleware

app.post('/comments', (req, res) => {
    // უბრალოდ პასუხი გავუწვდოთ კომენტარის ტექსტს
    res.json({ text: req.body.text });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});