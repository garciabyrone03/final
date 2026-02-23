import { Component } from '@angular/core';
import { RegisterComponent } from './register/register';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './app.html'
})
export class AppComponent {}
