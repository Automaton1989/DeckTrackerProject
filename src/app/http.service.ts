import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  [x: string]: any;
  private _stream$ = new BehaviorSubject("");
  public stream$ = this._stream$.asObservable();
  constructor(private _http: HttpClient) { 

  }
  send(session : any) {
    this._stream$.next(session)
  }
  getCardByName(card_name) {
    return this._http.get("/tracker/card/" + card_name)
  }
  getAllCards() {
    return this._http.get('/tracker/all/cards')
  }
  createNewCard(newCard) {
    return this._http.post('/tracker/new/card', {newCard : newCard})
  }
  saveDeckToDatabase(newDeck) {
    return this._http.post('/tracker/new/deck', {newDeck : newDeck})
  }
  addUser(newUser) {
    return this._http.post('/tracker/new/user/new', {newUser : newUser})
  }
  loginUser(loginUser) {
    return this._http.post('/tracker/login/user', {loginUser: loginUser})
  }
  checkSession() {
    return this._http.get('/tracker/session')
  }
  logout() {
    return this._http.get('/tracker/logout')
  }
}
