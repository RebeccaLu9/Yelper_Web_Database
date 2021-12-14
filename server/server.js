const express = require('express');
const mysql = require('mysql');


const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');


const app = express();
app.use(cors({
    origin: '*'
}));

// Route 0 - register as GET 
app.get('/hello', routes.hello)

// Route 1 - register as GET ok
app.get('/searchByLocation/:state/:city', routes.searchByLocation);

// Route 2 - register as GET ok
app.get('/searchByName/:name', routes.searchByName)

// // Route 3 - register as GET 
// app.get('/searchBySpecific', routes.searchBySpecific)

// Route 4 - register as GET ok
app.get('/cityMostTip', routes.cityMostTip)

// Route 5 - register as GET  ok
app.get('/cityMostReview', routes.cityMostReview)

// Route 6 - register as GET ok
app.get('/scoreAboveRegion/:state/:city', routes.scoreAboveRegion)

// Route 7 - register as GET ok
app.get('/highScoreFans', routes.highScoreFans)

// Route 8 - register as GET ok 2.5 minutes
app.get('/openReview/:city', routes.openReview)

// Route 9 - register as GET ok 2.5 minutes
app.get('/openTip/:city', routes.openTip)

// Route 10 - register as GET 2 minutes
app.get('/categoryActiveUser', routes.categoryActiveUser)

// Route 11 - register as GET 
app.get('/userFriend/:user', routes.userFriend)

// Route 12 - register as GET ok
app.get('/visitInfluencer', routes.visitInfluencer)

// Route 13 - register as GET ok
app.get('/userFriendTip/:user', routes.userFriendTip)

// Route 14s - register as GET ok
app.get('/findFastFood', routes.findFastFood)
app.get('/findJapan', routes.findJapan)
app.get('/findSeafood', routes.findSeafood )
app.get('/findSalad', routes.findSalad)
app.get('/findBreakfast', routes.findBreakfast)
app.get('/findBars', routes.findBars)
app.get('/findCafe', routes.findCafe )
app.get('/findChinese', routes.findChinese)
app.get('/findAmerica', routes.findAmerica )
app.get('/findMexica', routes.findMexica)


// Route 15
app.get('/searchAll', routes.searchAll)


app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;