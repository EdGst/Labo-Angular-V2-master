import { Component, OnInit } from '@angular/core';
import { TournamentDetails } from "../../../shared/models/tournamentDetails";
import { TournamentService } from "../../../services/tournament.service";
import { ActivatedRoute } from "@angular/router";
import {Match} from "../../../shared/models/match";


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  tournamentDetails!: TournamentDetails;
  matchRound1!: Match | undefined;
  matchRound2!: Match | undefined;

  constructor(private _tournamentService: TournamentService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getOne();
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

      // // Chargez les matchs du tour 1 et du tour 2
      // this.loadMatches(tournamentId, 1);
      // this.loadMatches(tournamentId, 2);
    }
  }

  loadMatches(tournamentId: string, round: number) {
    this._tournamentService.getMatches(tournamentId, round).subscribe(
      matches => {
        if (round === 1) {
          this.matchRound1 = matches[0];
        } else if (round === 2) {
          this.matchRound2 = matches[0];
        }
      },
      error => {
        console.log(`Une erreur s'est produite lors du chargement des matchs du tour ${round} :`, error);
      }
    );
  }
}
