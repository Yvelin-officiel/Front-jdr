import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterComponent } from './components/character/character.component';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, CharacterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'JDR';
}
