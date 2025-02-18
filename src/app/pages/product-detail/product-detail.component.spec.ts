import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Sku } from '../../models/sku.model';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: () => 'iphone-12-excellent-black-64' },
            },
          },
        },
        ProductService,
        CartService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test for the addToCart method
  it('should add a product to the cart', () => {
    const mockProduct: Sku = {
      id: '1',
      sku: 'iphone-12-excellent-black-64',
      name: 'iPhone 12',
      description: 'Un iPhone excelente',
      price: 999,
      grade: 'excellent',
      color: 'black',
      storage: 64,
      image: 'https://example.com/iphone.jpg',
    };

    spyOn(cartService, 'addToCart').and.callThrough();

    component.product = mockProduct;
    component.addToCart();

    expect(cartService.addToCart).toHaveBeenCalledWith(mockProduct);
  });
});
