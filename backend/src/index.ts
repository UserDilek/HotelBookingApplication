import express from 'express';

const app = express();


app.get('/api/test', function (req, res) {
    res.json('It is first api example')
  });


app.listen(7000, ()=>{
    console.log("applicaiton is listening port 7000 : localhost:7000");
})  

  