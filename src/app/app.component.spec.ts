import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ReactiveFormsModule, CommonModule], // Import necessary modules
    }).compileComponents();

    // Create component instance
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial lifecycle hooks like ngOnInit
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  // Test if the form initializes correctly
  it('should create the form with an empty form array', () => {
    component.ngOnInit(); // Initialize the form
    expect(component.demoForm).toBeDefined();
    expect(component.arr.length).toBe(0); // Initially the array should be empty
  });

  // Test the addArr function
  it('should add a new form group to the form array', () => {
    component.addArr(); // Call the addArr function
    fixture.detectChanges();

    // Assert that the form array has one form group
    expect(component.arr.length).toBe(1);
    expect(component.arr.at(0)).toBeInstanceOf(FormGroup); // The added item should be a FormGroup
  });

  // Test the removeArr function
  it('should remove a form group from the form array', () => {
    component.addArr(); // Add a form group
    component.addArr(); // Add another form group
    fixture.detectChanges();

    expect(component.arr.length).toBe(2); // Assert there are two form groups

    component.removeArr(0); // Remove the first form group
    fixture.detectChanges();

    expect(component.arr.length).toBe(1); // Only one form group should remain
  });

  // Test if the form array behaves correctly after multiple additions and removals
  it('should add and remove multiple form groups correctly', () => {
    component.addArr(); // Add first form group
    component.addArr(); // Add second form group
    component.addArr(); // Add third form group
    fixture.detectChanges();

    expect(component.arr.length).toBe(3); // Three form groups should be in the form array

    component.removeArr(1); // Remove the second form group
    fixture.detectChanges();

    expect(component.arr.length).toBe(2); // Two form groups should remain
    expect(component.arr.at(0).get('first')).toBeDefined(); // Ensure first form group's 'first' control exists
    expect(component.arr.at(1).get('last')).toBeDefined(); // Ensure second form group's 'last' control exists
  });

  // Test form submission and its value output
  it('should log the correct form value on submit', () => {
    spyOn(console, 'log'); // Spy on the console.log method

    component.addArr(); // Add a form group
    component.arr.at(0).get('first')?.setValue('John'); // Set values for the form group
    component.arr.at(0).get('last')?.setValue('Doe');

    component.onSubmit(); // Trigger form submission

    // Assert that the form value is logged correctly
    expect(console.log).toHaveBeenCalledWith({
      arr: [{ first: 'John', last: 'Doe' }],
    });
  });
});
