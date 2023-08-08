import {Component, OnInit} from '@angular/core';
import {TournamentDetails} from "../../../shared/models/tournamentDetails";
import {TournamentService} from "../../../services/tournament.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{

  tournamentDetails! : TournamentDetails | undefined;

  constructor(private _tournamentService: TournamentService,
              private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getOne()
  }

  getOne() {
    const tournamentId = this._route.snapshot.paramMap.get('id');
    if (tournamentId) {
      this._tournamentService.getOneTournament(tournamentId).subscribe(
          tournament => {
            this.tournamentDetails = tournament;
          },
          error => {
            console.log(error);
          }
      );
    }
  }

}
