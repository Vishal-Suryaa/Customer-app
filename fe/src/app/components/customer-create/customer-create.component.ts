import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-create',
  imports: [
    ReactiveFormsModule, RouterLink, MatButtonModule,
    MatInputModule, MatFormFieldModule, MatIconModule, MatSnackBarModule
  ],
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.css'
})
export class CustomerCreateComponent {
  customerForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-()]{7,15}$/)]]
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const customer = this.customerForm.value as Partial<Customer>;

    this.customerService.createCustomer(customer as Customer).subscribe({
      next: () => {
        this.snackBar.open('Customer created successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      },
      error: () => {
        this.snackBar.open('Failed to create customer. Please try again.', 'Close', { duration: 4000 });
        this.submitting = false;
      }
    });
  }
}
