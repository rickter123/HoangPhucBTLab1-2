// app.js
const express = require('express');
const cors = require('cors');
const contactRouter = require('./routes/contact.route');
const apiError = require('./core/exception/api-error');
// Create Express app
const app = express();

app.use(cors());
app.use(express.json());
// A sample route
app.get('/', (req, res) => res.send('Welcome to contact book application!'));

app.use("/api/contacts",contactRouter);

// Handle error 404
app.use(function(req,res,next){
    res.status(404);
    res.send(new apiError(404,"Not Found"));
    return next(new apiError(404,"Not Found"));
})

// Handle error
app.use((err,req,res,next)=>{
    return res.status(error.statusCode || 500).json({
        message: error.massage || "Internal Server Error"
    });
})


//export mode
module.exports=app