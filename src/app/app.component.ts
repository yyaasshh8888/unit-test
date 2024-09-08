import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'App to demonstrate unit test';
  demoForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.demoForm = this.fb.group({
      arr: this.fb.array([]),
    });
  }
  get arr() {
    return this.demoForm.get('arr') as FormArray;
  }
  createArr() {
    return this.fb.group({
      first: [],
      last: [],
    });
  }
  addArr() {
    this.arr.push(this.createArr());
  }
  removeArr(i: number) {
    this.arr.removeAt(i);
  }
  onSubmit() {
    console.log(this.demoForm.value);
  }
}
