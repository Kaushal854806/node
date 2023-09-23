const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }))

const courses = [
    {id:1,name: "course A"},
    {id:2,name: "course B"},
    {id:3,name: "course C"}]

    //this part get the info that is already saved 
    //main page
    app.get('/', function(req,res){
        res.send('hello world')
    })

    //the whole list the we created at the begin
    app.get ('/api/courses', function(req,res){
        res.send(courses);
    })

    //waht is inside of the list by the id
    app.get ('/api/courses/:id', function(req,res){
        const course = courses.find(c=>c.id === parseInt(req.params.id))
        if (!course) // if the id can not be find this mesagge will apear. 
        {
            return res.status(400).send("this course doers not exists in the list!"); 
        }
        res.send(course); //otherwise will send you to the object using the ID
        
    });

    //this function create more objects into the list we select /api/courses/:id
    app.post('/api/courses/:id', function(req,res){
        if(!req.body.name || req.body.name.length<3){
            return res.status(400).send("the course item is not valid!") //if the requeriments are not there will apper this error mesage
        }
        //this part is the one in charge of create the object 
        const course = {
            id:courses.length+1,
            name:req.body.name
        }
        //this part is in charge of send it to the list we create at the beginning 
        courses.push(course);
        res.send(course);
    });
    app.put('/api/courses/:id', function(req,res){
        const course = courses.find(c=>c.id=== parseInt(req.params.id))
        if(!course)
        {
            return res.status(400).send("This course does not exist in the list")
        }
        course.name= req.body.name;
        res.send(course);
    });


    app.delete('/api/courses/:id', function(req,res){
        const course = courses.find(c=>c.id=== parseInt(req.params.id))
        if(!course)
        {
            return res.status(400).send("This course does not exist in the list")
        }
        const index = courses.indexof(course);
        courses.splice(index,1);

        res.send(course);

    });

    app.listen(5005); //this part is waht we use as for hosting or location