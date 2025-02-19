import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Sku } from '../models/sku.model';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test the addToCart method
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

    service.addToCart(mockProduct);
    const cart = service.getCart();
    expect(cart.length).toBe(1);
    expect(cart[0]).toEqual(mockProduct);
  });

  // Test the remove from cart method
  it('should remove a product from the cart', () => {
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

    service.addToCart(mockProduct);
    service.removeFromCart(mockProduct.sku);
    const cart = service.getCart();
    expect(cart.length).toBe(0);
  });

  // Test the localStorage persistence
  it('should persist the cart in localStorage', () => {
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

    service.addToCart(mockProduct);

    const newServiceInstance = TestBed.inject(CartService);
    const cart = newServiceInstance.getCart();

    expect(cart.length).toBe(1);
    expect(cart[0]).toEqual(mockProduct);
  });

  // Test the placeOrder method
  it('should send an order to the API', () => {
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

    service.addToCart(mockProduct);

    service.placeOrder().subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.API_URL}/order`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ skus: [mockProduct] });
    req.flush(null);
  });
});
