const express = require('express');

const app = express();
const Joi = require('joi');

app.use(express.json());

const courseObject = [
    {
        id: 1,
        name:'course1'
    },
    {
        id: 2,
        name:'course2'
    },
    {
        id: 3,
        name:'course3'
    }
]

app.get('/',(req,res)=>{
    res.send('Hello World from express');
});
app.get('/api/courses',(req,res)=>{
    res.send([1,2,3]);
});

app.get('/api/courses/:id',(req,res)=>{

    const course = courseObject.find(c => c.id ===parseInt(req.params.id));

    if(!course) res.status(404).send('Course Not Found');
    res.send(course);
});

app.post('/api/courses',(req,res)=>{

    if(validate(req).error){
        return res.status(400).send('Invalid inputs');
    }

    const course = {
        id: courses.length +1,
        name: req.body.name
    };

    courses.push(course);

     res.send(course);
});

app.put('/api/courses/:id',(req,res)=>{

    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course){
        res.status(404).send('course not found');
        return;
    }
    if(validate(req).error){
        res.status(400).send('Invalid inputs');
        return;
    }
});

function validate(request){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(request.body.schema);
}


const port = process.env.PORT || 3200;

app.listen(port,()=> console.log(`Listening on port ${port}...`));