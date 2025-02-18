import { SkuGrade, SkuColor, SkuStorage, Sku } from './sku.model';

export interface CreateOrderSku {
  id: string;
  sku: string;
  grade: SkuGrade;
  color: SkuColor;
  storage: SkuStorage;
}

export interface CreateOrderBody {
  skus: Sku[];
}
