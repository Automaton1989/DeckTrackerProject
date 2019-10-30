import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpService } from './http.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeckHomePageComponent } from './deck-home-page/deck-home-page.component';
import { DeckAccountPageComponent } from './deck-account-page/deck-account-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DeckHomePageComponent,
    DeckAccountPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
