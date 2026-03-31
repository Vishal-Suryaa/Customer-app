import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-edit',
  imports: [
    ReactiveFormsModule, RouterLink, MatButtonModule,
    MatInputModule, MatFormFieldModule, MatIconModule,
    MatSnackBarModule, MatProgressSpinnerModule
  ],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css'
})
export class CustomerEditComponent implements OnInit {
  customerForm!: FormGroup;
  customerId = '';
  loading = true;
  submitting = false;
  error = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-()]{7,15}$/)]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.customerId = id;
    this.customerService.getCustomer(id).subscribe({
      next: (customer) => {
        this.customerForm.patchValue({
          name: customer.name,
          email: customer.email,
          phone: customer.phone
        });
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const customer = this.customerForm.value as Partial<Customer>;

    this.customerService.updateCustomer(this.customerId, customer as Customer).subscribe({
      next: () => {
        this.snackBar.open('Customer updated successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      },
      error: () => {
        this.snackBar.open('Failed to update customer. Please try again.', 'Close', { duration: 4000 });
        this.submitting = false;
      }
    });
  }
}
