import {Component, OnInit} from '@angular/core';
import {TournamentService} from "../../../services/tournament.service";
import {Tournament} from "../../../shared/models/tournament";
import {Observable, tap} from "rxjs";
import {TournamentIndex} from "../../../shared/models/tournamentIndex";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  tournamentSub!: Observable<TournamentIndex>
  tournaments: Tournament[] | undefined = [];

  constructor(private tournamentService: TournamentService) {
  }

  ngOnInit() {
    this.getTournaments();
  }

  getTournaments(): void {
    // this.tournamentService.getTournaments().subscribe(
    //   {
    //     next: (tournaments) => {
    //       this.tournaments = tournaments;
    //       console.log(tournaments)
    //       console.log(this.tournaments)
    //     },
    //     error: (error) => {
    //       console.error('Error fetching tournaments: ', error);
    //     }
    //   }
    // );
    this.tournamentSub = this.tournamentService.getTournaments().pipe(
      tap(data => this.tournaments = data.results)
    )
  }

}
