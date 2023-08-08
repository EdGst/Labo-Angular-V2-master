import {Component, OnInit} from '@angular/core';
import {TournamentService} from "../../../services/tournament.service";
import {Tournament} from "../../../shared/models/tournament";
import {Observable, tap} from "rxjs";
import {TournamentIndex} from "../../../shared/models/tournamentIndex";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {TournamentCategory} from "../../../shared/enums/tournamentCategory";
import {TournamentStatus} from "../../../shared/enums/tournamentStatus";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  tournamentSub!: Observable<TournamentIndex>
  tournaments: Tournament[] | undefined = [];
  searchForm: FormGroup;
  tournamentCategories  = Object.values(TournamentCategory); // Options pour p-multiSelect
  tournamentStatus = Object.values(TournamentStatus)


  constructor(private _tournamentService: TournamentService,
              private _formBuilder: FormBuilder,
              private _route: Router) {

    this.searchForm = this._formBuilder.group({
      name: [''],
      category: [null],
      status: [null],
      womenOnly: [false],
      eloMin: [null],
      eloMax: [null],
      endOfRegistrationDate: [null]
    })


  }

  ngOnInit() {
    // this.getTournaments();
    this._tournamentService.getTourna({
      name: undefined,
      category: [TournamentCategory.J, TournamentCategory.S, TournamentCategory.V],
      status: [TournamentStatus.C, TournamentStatus.I, TournamentStatus.W],
      womenOnly: false
    }).subscribe(
      data => {
        this.tournaments = data.results;
      },
      error => {
        console.error('Error fetching tournaments:', error);
      }
    );
    this.getTournois();
  }

  getTournaments(): void {

    this.tournamentSub = this._tournamentService.getTournaments().pipe(
      tap(data => this.tournaments = data.results)
    )
  }

  getTournois(): void {
    const formValue = this.searchForm.value;

    this._tournamentService.getTourna({
      name: formValue.name,
      category: formValue.category,
      status: formValue.status,
      womenOnly: formValue.womenOnly
    }).subscribe(
      data => {
        this.tournaments = data.results;
      },
      error => {
        console.error('Error fetching tournaments:', error);
      }
    );
  }

  deleteTournois(id: string): void {
    this._tournamentService.deleteTournament(id).subscribe(
      () => {
        window.location.reload();
        console.log("Tournoi supprimé avec succès !");
        // Ajoutez ici la logique pour afficher un message de succès ou recharger la liste des tournois.
      },
      (error) => {
        console.error("Une erreur s'est produite lors de la suppression du tournoi :", error);
        // Ajoutez ici la logique pour afficher un message d'erreur si nécessaire.
      }
    );
  }

  protected readonly status = status;
}
