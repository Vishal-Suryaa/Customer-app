import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule, SlicePipe } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  imports: [
    MatButtonModule, MatTableModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatTooltipModule, RouterLink, FormsModule,
    DatePipe, CommonModule, SlicePipe
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchTerm = '';
  displayedColumns = ['name', 'email', 'phone', 'date', 'actions'];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers: Customer[]) => {
        this.customers = customers;
        this.applyFilter();
      },
      error: (error: any) => {
        console.error('Error fetching customers', error);
      }
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredCustomers = [...this.customers];
      return;
    }
    this.filteredCustomers = this.customers.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      c.phone.toLowerCase().includes(term)
    );
  }

  deleteCustomer(id: string): void {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    this.customerService.deleteCustomer(id).subscribe({
      next: () => this.loadCustomers(),
      error: (error: any) => console.error('Error deleting customer', error)
    });
  }
}
