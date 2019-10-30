var mongoose = require('mongoose')
var UserTrackerSchema = new mongoose.Schema( {
    username: {
        type: String,
        required: [true, "You must have a username of at least 3 characters!"],
        minlength: 3
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    decks: {
        type: [deckTrackerSchema]
    }},
    {timestamps: true});

var deckTrackerSchema = new mongoose.Schema( {
    name: {
        type: String
    },
    cards: {
        type: []
    }},
    {timestamps: true});

var cardTrackerSchema = new mongoose.Schema( {
    name: {
        type: String
    },
    number: {
        type: Number
    },
    image: {
        type: String
    }
})

var User = mongoose.model('User', UserTrackerSchema)
var Deck = mongoose.model('Deck', deckTrackerSchema)
var Card = mongoose.model('Card', cardTrackerSchema)