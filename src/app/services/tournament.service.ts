import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TournamentIndex} from "../shared/models/tournamentIndex";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private readonly BASE_URL: string ="https://khun.somee.com/api/Tournament?Statuses=WaitingForPlayers&Statuses=InProgress&Statuses=Closed"
  constructor(private _httpclient: HttpClient) {  }

  getTournaments(): Observable<TournamentIndex>{
    return this._httpclient.get<TournamentIndex>(this.BASE_URL)
  }
}
