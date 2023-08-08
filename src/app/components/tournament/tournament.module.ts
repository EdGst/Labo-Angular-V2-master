import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import {SharedModule} from "../../shared/shared.module";
import {PrimeModule} from "../../shared/prime/prime.module";
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    TournamentComponent,
    IndexComponent,
    AddComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    SharedModule,
    PrimeModule

  ]
})
export class TournamentModule { }
