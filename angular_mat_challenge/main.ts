import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'; // Add this line
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations() // Add this here
  ]
}).catch(err => console.error(err));
