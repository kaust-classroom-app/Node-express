const DB_CONFIG = require('./firebaseConfig');

function db_init(DB_CONFIG){
    firebase.initializeApp(DB_CONFIG);
}

function db_writeUserData(userId, firstName, lastName, email) {
    var time = new Date().toString();
    var createdOn;
    firebase.database().ref('Users/' + "aaaa" + '/creation_time').once("value", function(snapshot){
        createdOn = snapshot.val();
    }).then(function(){
        if(createdOn){
            firebase.database().ref('Users/' + "aaaa").update({
                first_name: "Abduaa",
                last_name: "aaaa",
                display_name: firstName + " " + lastName,
                email: "aaaaaaaa"
            });
            console.log("Hello") 

        }
        else{
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

db_writeUserData("aa","aaa","a","aa@aa.com")