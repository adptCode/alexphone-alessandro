import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Sku } from '../models/sku.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test for the getProducts method
  it('should fetch products from the API', () => {
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

    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('https://test.alexphone.com/api/v1/skus');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });
});
