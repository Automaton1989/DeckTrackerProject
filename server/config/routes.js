var mongoose = require('mongoose')
    var User = mongoose.model('User')
    var Deck = mongoose.model('Deck')
    var Card = mongoose.model('Card')
var deckTracker = require('../controllers/users.js')
const path = require('path')
module.exports = function(app) {
    app.get('/tracker/home', function(req, res) {
        deckTracker.index(req, res)
    })
    app.get('/tracker/card/:cardName', function(req, res) {
        deckTracker.findCardByName(req, res)
    })
    app.get('/tracker/all/cards', function(req,res) {
        deckTracker.getAllCards(req, res)
    })
    app.post('/tracker/new/card', function(req, res) {
        deckTracker.addNewCard(req, res)
    })
    app.post('/tracker/new/deck', function(req, res) {
        deckTracker.saveNewDeck(req, res)
    })
    app.get('/tracker/decks/user/:id', function(res, res) {
        deckTracker.getUserDecks(res, res)
    })
    app.post('/tracker/new/user/new', function(req, res) {
        deckTracker.addNewUser(req, res)
    })
    app.post('/tracker/login/user', function(req, res) {
        deckTracker.loginUser(req, res)
    })
    app.get('/tracker/session', function(req, res) {
        deckTracker.checkUserSession(req, res)
    })
    app.get('/tracker/logout', function(req, res) {
        deckTracker.logout(req, res)
    })
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
}