import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ProductCardComponent } from './product-card.component'
import { provideRouter } from '@angular/router'
import { Sku } from '../../models/sku.model'

const mockProduct: Sku = {
  id: '1',
  sku: 'iphone-12-excellent-black-64',
  name: 'iPhone 12',
  description: 'Un iPhone excelente',
  price: 999,
  grade: 'excellent',
  color: 'black',
  storage: 64,
  image: 'https://example.com/iphone.jpg'
}

describe('ProductCardComponent', () => {
  let component: ProductCardComponent
  let fixture: ComponentFixture<ProductCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [provideRouter([])]
    }).compileComponents()

    fixture = TestBed.createComponent(ProductCardComponent)
    component = fixture.componentInstance

    
    component.product = mockProduct
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
