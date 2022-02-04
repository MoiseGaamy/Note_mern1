const express = require("express");
const notes = require('./data/notes.js');
const dotenv = require('dotenv');
const connectDB = require("./config/db.js")
const userRoutes = require('./routes/userRoutes.js');
const noteRoutes = require('./routes/noteRoutes.js');
const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js");
const path = require("path");


const app = express();
dotenv.config()
connectDB();
app.use(express.json());


// app.get('/', (req, res) =>
// {
//     res.send('server is Running..');
// });
// app.get('/api/notes', (req, res) =>
// {
//     res.json(notes)
// })

app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes);


// deployement //
__dirname = path.resolve();
// check if the app is in production mode//
if (process.env.NODE_ENV === 'production')
{
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
} else
{
     app.get('/', (req, res) =>
 {
     res.send('server is Running..');
 });
}


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server started on port ${PORT}`));