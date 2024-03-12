const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConn = require('./utils/dbConn');
const userRouter = require('./routes/userRoute');

dotenv.config();
dbConn();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}));
app.use(cookieParser());

// app.get('/test', (req, res) => {
//   res.json("testing");
// });

app.use('/api/users', userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {console.log(`Listening to port ${port}`)});