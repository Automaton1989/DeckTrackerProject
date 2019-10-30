import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deck-account-page',
  templateUrl: './deck-account-page.component.html',
  styleUrls: ['./deck-account-page.component.css']
})
export class DeckAccountPageComponent implements OnInit {
  session: any;
  decks: any = [];
  cards: any = [];

  constructor(private _httpService: HttpService, private router: Router) { 
    this._httpService.stream$.subscribe(this.receiveMessage.bind(this));
  }

  ngOnInit() {
    this.checkSession()
    this.receiveMessage(this.session)
    this.getDecks()
  }
  receiveMessage(session) {
    this.session = session
  }
  checkSession() {
    let observable = this._httpService.checkSession();
    observable.subscribe(data => {
      this.session = data['user']
      this._httpService.send(this.session)
    })
  }
  viewCards(id) {
    for(var deck in this.decks) {
      if(this.decks[deck]._id == id) {
        console.log(this.decks[deck].cards)
        this.cards = this.decks[deck].cards
      }
    }
  }
  getDecks() {
    this.decks = this.session.decks;
  }
}
