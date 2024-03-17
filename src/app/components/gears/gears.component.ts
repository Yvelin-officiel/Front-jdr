import { Component, OnDestroy, OnInit } from '@angular/core';
import { Weapon } from '../../interfaces/weapon';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Armor } from '../../interfaces/armor';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-gears',
  templateUrl: './gears.component.html',
  standalone: true,
  imports: [
    CommonModule
  ],
  styleUrls: ['./gears.component.css']
})
export class GearsComponent implements OnInit {
  private weaponsSubscription!: Subscription;
  private armorsSubscription!: Subscription;

  weapons: Weapon[] = [];
  armors: Armor[] = [];

  constructor(private dataService: DataService) { }

  getWeaponImage(category: string): string {
    // Sélectionner l'image en fonction de la catégorie de l'arme
    switch (category) {
      case 'Simple Melee Weapons':
        return '../../../assets/images/sword.png';
      case 'Simple Ranged Weapons':
        return '../../../assets/images/bow.png';
      case 'Martial Melee Weapons':
        return '../../../assets/images/truncheon.png';
      case 'Martial Ranged Weapons':
        return '../../../assets/images/crossbow.png';
      default:
        return '';
    }
  }

  getArmorImage(category: string): string {
    // Sélectionner l'image en fonction de la catégorie de l'arme
    switch (category) {
      case 'Light Armor':
        return '../../../assets/images/light_armor.png';
      case 'Heavy Armor':
        return '../../../assets/images/heavy_armor.png';
      case 'Shield':
        return '../../../assets/images/shield.png';
      case 'Medium Armor':
        return '../../../assets/images/medium_armor.png';
      case 'No Armor':
        return '../../../assets/images/no_armor.png';
      default:
        return '';
    }
  }

  ngOnInit(): void {
    this.weaponsSubscription = this.dataService.getWeapons().subscribe((weapons: Weapon[]) => {
      this.weapons = weapons;
    });

    this.armorsSubscription = this.dataService.getArmors().subscribe((armors: Armor[]) => {
      this.armors = armors;
    });
  }
  ngOnDestroy(): void {
    this.weaponsSubscription.unsubscribe();
    this.armorsSubscription.unsubscribe();
  }
}
