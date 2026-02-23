import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatSliderModule,
    MatButtonModule, MatSlideToggleModule, MatCheckboxModule, MatSelectModule,
    MatCardModule, MatIconModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isDarkMode = true; // Defaulting to elegant Dark Mode
  submitted = false;
  generatedMemberId: string | null = null;

  // Validator: Only 2006 and below
  birthYearValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const birthDate = new Date(control.value);
      return birthDate.getFullYear() > 2006 ? { juniorMember: true } : null;
    }
    return null;
  }

  formdata = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*$')
    ]),
    gender: new FormControl('', Validators.required),
    birthDate: new FormControl(null, [Validators.required, this.birthYearValidator]),
    gymPackage: new FormControl('standard', Validators.required),
    personalTrainer: new FormControl(false),
    workoutIntensity: new FormControl(5)
  });

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  onClickSubmit(data: any) {
    if (this.formdata.valid) {
      // Generate Member ID: EF + Current Year + 4 Random Digits
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      this.generatedMemberId = `EF-${new Date().getFullYear()}-${randomNum}`;
      this.submitted = true;
      console.log('Registration Successful:', data, 'ID:', this.generatedMemberId);
    }
  }

  resetForm() {
    this.submitted = false;
    this.formdata.reset();
    this.generatedMemberId = null;
  }
}
