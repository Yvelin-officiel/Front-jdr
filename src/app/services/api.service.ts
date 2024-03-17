import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Class } from '../interfaces/class';
import { HttpClient } from '@angular/common/http';
import { Race } from '../interfaces/race';
import { Weapon } from '../interfaces/weapon';
import { Armor } from '../interfaces/armor';
import { Spell } from '../interfaces/spell';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.open5e.com/v1/';

  constructor(private http: HttpClient) { }

  getClasses(): Observable<Class[]> {
    return this.http.get<any>(`${this.baseUrl}classes`).pipe(
      map(response => response.results)
    );
  }

  getRaces(): Observable<Race[]> {
    return this.http.get<any>(`${this.baseUrl}races`).pipe(
      map(response => response.results)
    );
  }

  getWeapons(): Observable<Weapon[]> {
    return this.http.get<any>(`${this.baseUrl}weapons`).pipe(
      map(response => response.results)
    );
  }

  getArmors(): Observable<Armor[]> {
    return this.http.get<any>(`${this.baseUrl}armor`).pipe(
      map(response => response.results)
    );
  }

  getSpells(): Observable<Spell[]> {
    return this.http.get<any>(`${this.baseUrl}spells`).pipe(
      map(response => response.results)
    );
  }

}
