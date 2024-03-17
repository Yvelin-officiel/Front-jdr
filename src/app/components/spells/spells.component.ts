import { Component, OnDestroy, OnInit } from '@angular/core';
import { Spell } from '../../interfaces/spell';
import { Subscription } from 'rxjs';
import { DataService } from './services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spells',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})
export class SpellsComponent implements OnInit, OnDestroy {
  spells: Spell[] = [];
  private spellsSubscription!: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.spellsSubscription = this.dataService.getSpells().subscribe((spells: Spell[]) => {
      this.spells = spells;
    });
  }

  ngOnDestroy(): void {
    this.spellsSubscription.unsubscribe();
  }
}
