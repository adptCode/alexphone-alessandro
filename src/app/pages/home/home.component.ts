import { Component, inject, OnInit } from '@angular/core';
import { Sku } from '../../models/sku.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: Sku[] = [];
  filteredProducts: Sku[] = [];

  filters = {
    color: '',
    grade: '',
    storage: '',
    sort: '',
  };

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.applyFilters();
    });

    this.route.queryParams.subscribe((params) => {
      this.filters.color = params['color'] || '';
      this.filters.grade = params['grade'] || '';
      this.filters.storage = params['storage'] || '';
      this.filters.sort = params['sort'] || '';
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(
      (product) =>
        (this.filters.color ? product.color === this.filters.color : true) &&
        (this.filters.grade ? product.grade === this.filters.grade : true) &&
        (this.filters.storage
          ? product.storage.toString() === this.filters.storage
          : true)
    );

    if (this.filters.sort === 'price-asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.filters.sort === 'price-desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    } else if (this.filters.sort === 'name-asc') {
      this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.filters.sort === 'name-desc') {
      this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  updateFilters(): void {
    this.router.navigate([], {
      queryParams: this.filters,
      queryParamsHandling: 'merge',
    });
  }
}
