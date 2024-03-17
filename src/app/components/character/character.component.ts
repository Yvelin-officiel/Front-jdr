import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Class } from '../../interfaces/class';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CharacterService } from './services/Character.service';
import { CommonModule } from '@angular/common';
import { Race } from '../../interfaces/race';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, OnDestroy {
  // OBSERVERS
  private _classesObserver!: Subscription;
  private _racesObserver!: Subscription;

  characterForm: FormGroup;

  classes: Class[] = [];
  races: Race[] = [];
  bonusStats: any = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  };

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private characterService: CharacterService
  ) {
    this.characterForm = this.formBuilder.group({
      name: ['', Validators.required],
      race: ['', Validators.required],
      title: ['', Validators.required],
      class: ['', Validators.required],

      //Physique
      level: [1, Validators.min(1)],
      size: [''],
      age: ['', Validators.min(1)],
      weight: [''],

      // Statistiques
      strength: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      dexterity: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      constitution: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      intelligence: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      wisdom: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      charisma: ['', [Validators.required, Validators.min(1), Validators.max(20)]],

      // Histoire
      raceDesc: [''],
      classDesc: [''],
      characterLore: ['']
    });

  }
  updateRace() {
    this.updateBonusStats();
    this.updateLore();
  }

  updateLore() {
    const selectedRace = this.characterForm.get('race')?.value;
    const selectedClass = this.characterForm.get('class')?.value;
    const race = this.races.find(r => r.name === selectedRace);
    const classe = this.classes.find(r => r.name === selectedClass);
    if (race) {
      this.characterForm.patchValue({
        raceDesc: race.desc.replace(/[#*]/g, '')
      });
    }
    if (classe) {
      this.characterForm.patchValue({
        classDesc: classe.desc.replace(/[#*]/g, '')
      });
    }
  }

  updateBonusStats(): void {
    const selectedRace = this.characterForm.get('race')?.value;
    const race = this.races.find(r => r.name === selectedRace);
    if (race) {
      this.addBonusStats(race);
    }
  }
  addBonusStats(race: Race) {
    this.resetBonusStats();
    race.asi.forEach(bonus => {
      switch (bonus.attributes[0]) {
        case 'Strength':
          this.bonusStats.strength = bonus.value;
          break;
        case 'Dexterity':
          this.bonusStats.dexterity = bonus.value;
          break;
        case 'Constitution':
          this.bonusStats.constitution = bonus.value;
          break;
        case 'Intelligence':
          this.bonusStats.intelligence = bonus.value;
          break;
        case 'Wisdom':
          this.bonusStats.wisdom = bonus.value;
          break;
        case 'Charisma':
          this.bonusStats.charisma = bonus.value;
          break;
        default:
          break;
      }
    });
  }

  // Reinistialise les bonus pour ne pas les cumuler
  resetBonusStats() {
    this.bonusStats.strength = 0;
    this.bonusStats.dexterity = 0;
    this.bonusStats.constitution = 0;
    this.bonusStats.intelligence = 0;
    this.bonusStats.wisdom = 0;
    this.bonusStats.charisma = 0;
  }

  // Genere aléatoirement des valeurs pour chaque caracteristique
  generateRandomValues() {
    this.characterForm.patchValue({
      strength: this.getRandomValue(),
      dexterity: this.getRandomValue(),
      constitution: this.getRandomValue(),
      intelligence: this.getRandomValue(),
      wisdom: this.getRandomValue(),
      charisma: this.getRandomValue(),
    });
  }
  // Générez aleatoirement une valeur entre 1 et 20
  getRandomValue(): number {
    return Math.floor(Math.random() * 20) + 1;
  }

  ngOnInit(): void {
    //Recupere les classes de l'api
    this._classesObserver = this.apiService.getClasses().subscribe((classes) => {
      this.classes = classes;
    });
    //Recuper les races de l'api
    this._racesObserver = this.apiService.getRaces().subscribe((races) => {
      this.races = races;
    });

    //Recupere les donnees stockes dans le service si il y en a 
    this.characterService.formData$.subscribe(formData => {
      if (formData) {
        this.characterForm.patchValue(formData);
      }
    });
  }

  //Au changement de page : desinscris les observateur et sauvegarde les donnees du formulaire dans le service
  ngOnDestroy(): void {
    this._classesObserver.unsubscribe();
    this.characterService.formData = this.characterForm.value;
    this._racesObserver.unsubscribe();
  }

}
