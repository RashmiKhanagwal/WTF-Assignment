const express = require("express");
const cors = require('cors');
//port
const PORT = process.env.PORT || 8080

const app = express();

var corsOptions ={
    origin: "https://localhost:8081"
};
app.use(cors(corsOptions));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routers
const userRouter = require("./routes/user");

app.use('/api/user', userRouter);


//server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});