const Joi=require('joi');
const express=require('express');
const app=express();

app.use(express.json());

const courses=[
    {id:1,name:'.net'},
    {id:2,name:'Java'},
    {id:3,name:'Python'}
];

app.get('/',(req,res)=>{
    res.send('Hello World!!!!')
})

app.get('/api/courses',(req,res)=>{
    res.send(courses)
})

app.get('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send('Course Not Found');
    res.send(course);
})

app.post('/api/courses',(req,res)=>{
    const {error}=ValidationCourses(req.body);
    if(error)return res.status(400).send(error.details[0].message)

const course={
        id:courses.length+1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id',(req,res)=>{
  const course=courses.find(c=>c.id===parseInt(req.params.id))
  if(!course) return res.status(404).send('Course Not Found') 

    const {error}=ValidationCourses(req.body);
    if(error)return res.status(400).send(error.details[0].message)

course.name=req.body.name;
res.send(course);
})

app.delete('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id))
  if(!course)return res.status(404).send('Course Not Found')

    const courseIndex=courses.indexOf(course)
    console.log(courseIndex);
    courses.splice(courseIndex,1)
    res.send(course);
})

function ValidationCourses(course){
    const schema={
        name:Joi.string().min(3).required()
    }
    return Joi.validate(course,schema)
}

const port=process.env.PORT || 3000
app.listen(port,()=>console.log(`Listening Port Number ${port}...`))

