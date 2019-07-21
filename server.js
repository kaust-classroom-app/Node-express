var express = require('express');
const config = require('./firebaseConfig');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json()); // need to parse HTTP request body

var firebase = require('firebase');

firebase.initializeApp(config);

//Fetch instances
app.get('/', function (req, res) {

    console.log("HTTP Get Request");
    var userReference = firebase.database().ref("/Users/");

    //Attach an asynchronous callback to read the data
    userReference.on("value",
        function(snapshot) {
            console.log(snapshot.val());
            res.json(snapshot.val());
            userReference.off("value");
        },
        function (errorObject) {
            console.log("The read failed: " + errorObject.code);
            res.send("The read failed: " + errorObject.code);
        });
});

app.get('/test', function (req, res) {
    console.log("HTTP Put Request");

    const newUser = {username: req.body.UserName, name: req.body.Name, age: req.body.Age};

    console.log(newUser);
    res.send(newUser);
});

app.get('/aaa', function (req, res) {

    console.log("HTTP Put Request");

    var userName = req.body.UserName;
    var name = req.body.Name;
    var last = "dalaan";
    var age = req.body.Age;

    db_writeUserData(userName, name, last, age);

});

//Create new instance
app.put('/new', function (req, res) {

    console.log("HTTP Put Request");

    var userName = req.body.UserName;
    var name = req.body.Name;
    var age = req.body.Age;

    var referencePath = '/Users/'+userName+'/';
    var userReference = firebase.database().ref(referencePath);
    userReference.set({Name: name, Age: age},
        function(error) {
            if (error) {
                res.send("Data could not be saved." + error);
            }
            else {
                res.send("Data saved successfully.");
            }
        });
});

app.get('/init', function (req, res) {

    console.log("HTTP Get Request");
    //Insert key,value pair to database
    firebase.database().ref('/Users').set({TestMessage: 'GET Request'});
    res.send("HTTP GET Request");


});

//Update existing instance
app.post('/', function (req, res) {

    console.log("HTTP POST Request");

    var userName = req.body.UserName;
    var name = req.body.Name;
    var age = req.body.Age;

    var referencePath = '/Users/'+userName+'/';
    var userReference = firebase.database().ref(referencePath);
    userReference.update({Name: name, Age: age},
        function(error) {
            if (error) {
                res.send("Data could not be updated." + error);
            }
            else {
                res.send("Data updated successfully.");
            }
        });
});

//Delete an instance
app.delete('/', function (req, res) {

    console.log("HTTP DELETE Request");
    //todo
});

var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});

function db_writeUserData(userId, firstName, lastName, email) {
    var time = new Date().toString();
    var createdOn;
    firebase.database().ref('Users/' + "aaaa" + '/creation_time').once("value", function (snapshot) {
        createdOn = snapshot.val();
    }).then(function () {
        if (createdOn) {
            firebase.database().ref('Users/' + "aaaa").update({
                first_name: "Abduaa",
                last_name: "aaaa",
                display_name: firstName + " " + lastName,
                email: "aaaaaaaa"
            });
            console.log("Hello")

        } else {
            firebase.database().ref('Users/' + "aaaa").set({
                first_name: "Abduaa",
                last_name: "aaaa",
                display_name: firstName + " " + lastName,
                email: "aaaaaaaa",
                creation_time: time,
            });
            console.log("Hello")
        }

    });
}
