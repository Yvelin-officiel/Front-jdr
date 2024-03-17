import { Injectable } from '@angular/core';
import { Observable, Subscription, of, tap } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { Spell } from '../../../interfaces/spell';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private spells: Spell[] = [];
 
  constructor(private apiService: ApiService) { }

  // Recupere les donnees et les stock pour ne pas appeller l'api a chaque chargement 
  getSpells(): Observable<Spell[]> {
    if (this.spells.length === 0) {
      return this.apiService.getSpells().pipe(
        tap((spells: Spell[]) => this.spells = spells)
      );
    } else {
      return of(this.spells);
    }
  }

}
