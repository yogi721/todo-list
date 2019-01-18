var bodyParser = require('body-parser');
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://yogi721:msft789@ds161024.mlab.com:61024/todo-mongodb');

// create schema
const todoSchema = new mongoose.Schema({
    item: String
});

// create model
var Todo = mongoose.model('Todo', todoSchema);

// dumy data
//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}]
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo', function(req, res){
        // get data from mongodb and pass it to the view
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data}); // passing dumy data to the view
        });
    });


    app.post('/todo', urlencodedParser, function(req, res){
        // get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
        
    });
};