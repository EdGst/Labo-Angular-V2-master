import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TournamentIndex} from "../shared/models/tournamentIndex";
import {TournamentAdd} from "../shared/models/tournamentAdd";
import {TournamentDetails} from "../shared/models/tournamentDetails";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private readonly BASE_URL: string ="https://khun.somee.com/api/Tournament?Statuses=WaitingForPlayers&Statuses=InProgress&Statuses=Closed"
  private readonly URL: string="https://khun.somee.com/api"
  constructor(private _httpclient: HttpClient) {  }

  getTournaments(): Observable<TournamentIndex>{
    return this._httpclient.get<TournamentIndex>(this.BASE_URL)
  }

  addTournament(newTournament: TournamentAdd): Observable<TournamentAdd> {
    return this._httpclient.post<TournamentAdd>(`${this.URL}/Tournament`, newTournament )
  }

  getTourna(params: {
    offset?: number;
    name?: string;
    category?: string;
    status?: string[];
    womenOnly?: boolean;
  }): Observable<TournamentIndex> {
    let httpParams = new HttpParams();

    if (params.offset) {
      httpParams = httpParams.set('Offset', params.offset.toString());
    }
    if (params.name) {
      httpParams = httpParams.set('Name', params.name);
    }
    if (params.category) {
      httpParams = httpParams.set('Category', params.category);
    }
    if (params.status) {
      for (const status of params.status) {
        httpParams = httpParams.append('Statuses', status);
      }
    }
    if (params.womenOnly !== undefined) {
      httpParams = httpParams.set('WomenOnly', params.womenOnly.toString());
    }

    return this._httpclient.get<TournamentIndex>(`${this.URL}/Tournament`, { params: httpParams });
  }

  getOneTournament(id: string): Observable<TournamentDetails> {
    return this._httpclient.get<TournamentDetails>(`${this.URL}/Tournament/${id}`)
  }

  deleteTournament(id: string) {
    return this._httpclient.delete(`${this.URL}/Tournament/${id}`);
  }

}
