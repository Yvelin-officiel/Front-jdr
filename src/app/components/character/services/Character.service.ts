// character.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private formDataSubject: BehaviorSubject<FormData | null> = new BehaviorSubject<FormData | null>(null);
  formData$ = this.formDataSubject.asObservable();

  constructor() { }

  get formData(): FormData | null {
    return this.formDataSubject.value;
  }

  set formData(data: FormData | null) {
    this.formDataSubject.next(data);
  }
}
