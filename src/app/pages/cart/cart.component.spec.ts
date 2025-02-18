import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Sku } from '../../models/sku.model';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [CartService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test products in the cart
  it('should display products in the cart', () => {
    const mockProducts: Sku[] = [
      {
        id: '1',
        sku: 'iphone-12-excellent-black-64',
        name: 'iPhone 12',
        description: 'Un iPhone excelente',
        price: 999,
        grade: 'excellent',
        color: 'black',
        storage: 64,
        image: 'https://example.com/iphone.jpg',
      },
    ];

    spyOn(cartService, 'getCart').and.returnValue(mockProducts);

    fixture.detectChanges();

    expect(component.cart.length).toBe(1);
    expect(component.cart[0].name).toBe('iPhone 12');
  });

  // Test the placeOrder method
  it('should place an order successfully', () => {
    const mockProducts: Sku[] = [
      {
        id: '1',
        sku: 'iphone-12-excellent-black-64',
        name: 'iPhone 12',
        description: 'Un iPhone excelente',
        price: 999,
        grade: 'excellent',
        color: 'black',
        storage: 64,
        image: 'https://example.com/iphone.jpg',
      },
    ];

    spyOn(cartService, 'getCart').and.returnValue(mockProducts);
    spyOn(cartService, 'placeOrder').and.returnValue(of(void 0));

    component.cart = cartService.getCart();
    component.isLoading = false;
    fixture.detectChanges();

    component.placeOrder();

    expect(cartService.placeOrder).toHaveBeenCalledTimes(1);
  });
});
