const express = require("express");
const cors = require('cors');
const mainRouter = require('./routes/index');
const app = express();

// const test = () => {
//     console.log("testing");
//     app.use(cors());
// }

// app.use(test);

app.use(cors());
app.use(express.json());
app.use('/api/v1', mainRouter);



app.listen(5000);