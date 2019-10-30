var mongoose = require('mongoose')
var bcrypt = require("bcrypt");
    var User = mongoose.model('User')
    var Deck = mongoose.model('Deck')
    var Card = mongoose.model('Card')
module.exports = {
    index: function(req, res) {
        res.json({success : true})
    },
    findCardByName: function(req, res) {
        Card.findOne({name : req.params.cardName}, function(err, card) {
            if(err) {
                res.json({success : false})
            } else {
                res.json({success : true, card : card})
            }
        })
    },
    getAllCards: function(req, res) {
        Card.find({}, function(err, cards) {
            if(err) {
                res.json({success: false})
            } else {
                res.json({cards : cards})
            }
        })
    },
    addNewCard: function(req, res) {
        Card.find({}, function(err, cards) {
            if(err) {
                res.json({success : false})
            } else {
                if(cards.includes(req.body.newCard.name) || cards.includes(req.body.newCard.number)) {
                    res.json({success : false})
                } else {
                    var card = new Card({name: req.body.newCard.name, nunber: req.body.newCard.number, image: req.body.newCard.image})
                    console.log(card.number)
                    card.save(function(err) {
                        if(err) {
                            res.json({success: false})
                        } else {
                            res.json({success : true, cards : cards, card : card})
                        }
                    })
                }
            }
        })
    },
    saveNewDeck: function(req, res) {
        if(req.session.email) {
            User.findOne({email: req.session.email}, function(err, user) {
                if(err) {
                    res.json({success : false})
                } else {
                    var deck = new Deck({name: req.body.newDeck.name, cards: req.body.newDeck.cards})
                    deck.save(function(err) {
                        if(err) {
                            console.log("failed", err)
                            res.json({success : false})
                        } else {
                            console.log("success")
                            user.decks.push(deck)
                            console.log(user.decks)
                            user.save(function(err) {
                                if(err) {
                                    res.json({success : false})
                                } else {
                                    res.json({success : true, user : user})
                                }
                            })
                        }
                    })
                }
            })
        }
    },
    addNewUser: function(req, res) {
        console.log("here too")
        bcrypt.hash(req.body.newUser.password, 10)
        .then(hashed_password => {
            var user = new User({username: req.body.newUser.username, email: req.body.newUser.email, password: hashed_password});
            user.save(function(err, user) {
                if(err) {
                    console.log(err)
                    res.json({success : false})
                } else {
                    console.log("success")
                    req.session.email = req.body.newUser.email;
                    res.json({success : true, user : user})
                }
            })
        })
        .catch(error => {
            console.log(error)
            res.json({success : false})
        })
    },
    loginUser: function(req, res) {
        User.findOne({email: req.body.loginUser.email}, function(err, user) {
            if(user == null) {
                res.json({success : false})
            }
            else {
                bcrypt.compare(req.body.loginUser.password, user.password)
                .then(result => {
                    if(result == true) {
                        req.session.email = req.body.loginUser.email;
                        res.json({success : true, user : user})
                    }
                    else {
                        res.json({success : false})
                    }
                })
                .catch(error => {
                    console.log(error)
                    res.json({success : false})
                })
            }
        })
    },
    checkUserSession: function(req, res) {
        if(req.session.email) {
            User.findOne({email : req.session.email}, function(err, user) {
                if(user == null) {
                    req.json({success : false})
                }
                else {
                    res.json({success : true, user : user})
                }
            })
        }
        else {
            res.json({success : false})
        }
    },
    logout: function(req, res) {
        if(req.session) {
            req.session.destroy();
            console.log(req.session)
            res.json({success : true})
        }
        else {
            res.json({success : false})
        }
    }
}