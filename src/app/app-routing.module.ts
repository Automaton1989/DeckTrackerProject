import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeckHomePageComponent } from './deck-home-page/deck-home-page.component';
import { DeckAccountPageComponent } from './deck-account-page/deck-account-page.component';

const routes: Routes = [
  {path: '', component: DeckHomePageComponent},
  {path: 'account', component: DeckAccountPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
