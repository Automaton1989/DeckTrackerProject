import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deck-home-page',
  templateUrl: './deck-home-page.component.html',
  styleUrls: ['./deck-home-page.component.css']
})
export class DeckHomePageComponent implements OnInit {
  session: any;
  newCard: any;
  cardsToShow: [];
  deck: any = [];
  newDeck: any;
  constructor(private _httpService: HttpService, private router: Router) { 
    this._httpService.stream$.subscribe(this.receiveMessage.bind(this));
  }

  ngOnInit() {
    this.checkSession();
    this.receiveMessage(this.session);
    this.newCard = {name: "", number: null, image: ""};
    this.newDeck = {name: "", cards: []};
    this.getAllCards();
  }
  createNewCard() {
    let observable = this._httpService.createNewCard(this.newCard);
    observable.subscribe(data => {
      this.newCard = data['card']
      this.newCard = {name: "", number: null, image: ""}
      this.cardsToShow = data['cards']
      this.reload();
    })
  }
  getAllCards() {
    let observable = this._httpService.getAllCards();
    observable.subscribe(data => {
      console.log("Got the cards!", data['cards'])
      this.cardsToShow = data['cards']
    })
  }
  addCardToDeck(card_name) {
    let observable = this._httpService.getCardByName(card_name);
    observable.subscribe(data => {
      var count = 0;
      for(var i = 0; i < this.deck.length; i++) {
        if(this.deck[i].name == data['card'].name) {
          count++
        }
      }
      if(count >= 3) {
        console.log("hello there")
      } else {
      this.deck.push(data['card'])
      this.newDeck.cards.push(data['card'])
      }
    })
    console.log(this.deck)
    console.log("NewDeck Form", this.newDeck.cards)
  }
  saveDeckToDatabase() {
    console.log(this.newDeck.cards)
    let observable = this._httpService.saveDeckToDatabase(this.newDeck);
    observable.subscribe(data => {
      this.session = data['user']
      this.newDeck = {name: "", cards: []}
    })
  }
  receiveMessage(session) {
    this.session = session;
  }
  checkSession() {
    let observable = this._httpService.checkSession();
    observable.subscribe(data => {
      this.session = data['user']
      this._httpService.send(this.session)
    })
  }
  reload() {
    this.router.navigate([''])
  }
}
