import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [
    TournamentComponent,
    IndexComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule
  ]
})
export class TournamentModule { }
