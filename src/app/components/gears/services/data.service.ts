import { Injectable } from '@angular/core';
import { Observable, Subscription, of, tap } from 'rxjs';
import { Weapon } from '../../../interfaces/weapon';
import { Armor } from '../../../interfaces/armor';
import { ApiService } from '../../../services/api.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private weapons: Weapon[] = [];
  private armors: Armor[] = [];

  constructor(private apiService: ApiService) { }

  // Recupere les donnees et les stock pour ne pas appeller l'api a chaque chargement 
  getWeapons(): Observable<Weapon[]> {
    if (this.weapons.length === 0) {
      return this.apiService.getWeapons().pipe(
        tap((weapons: Weapon[]) => this.weapons = weapons)
      );
    } else {
      return of(this.weapons);
    }
  }

  // Recupere les donnees et les stock pour ne pas appeller l'api a chaque chargement 
  getArmors(): Observable<Armor[]> {
    if (this.armors.length === 0) {
      return this.apiService.getArmors().pipe(
        tap((armors: Armor[]) => this.armors = armors)
      );
    } else {
      return of(this.armors);
    }
  }

}
