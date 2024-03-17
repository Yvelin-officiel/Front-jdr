import { Routes } from '@angular/router';
import { CharacterComponent } from './components/character/character.component';
import { GearsComponent } from './components/gears/gears.component';
import { SpellsComponent } from './components/spells/spells.component';

export const routes: Routes = [
    { path: '', component: CharacterComponent},
    {
        path: 'character',
        component: CharacterComponent
    },
    {
        path: 'gears',
        component: GearsComponent
    },
    {
        path: 'spells',
        component: SpellsComponent
    },
];
