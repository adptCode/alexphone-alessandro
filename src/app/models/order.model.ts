import { SkuGrade, SkuColor, SkuStorage } from './sku.model';

export interface CreateOrderSku {
  id: string;
  sku: string;
  grade: SkuGrade;
  color: SkuColor;
  storage: SkuStorage;
}

/**
 * En las instrucciones de la prueba, `CreateOrderBody` debía contener `Sku[]`.
 * Tras realizar pruebas en Postman, se verificó que la API también acepta `CreateOrderSku[]`.
 * Se ha decidido utilizar `CreateOrderSku[]` en lugar de `Sku[]` para enviar únicamente los datos necesarios,
 * evitando información redundante y optimizando la petición.
 */
export interface CreateOrderBody {
  skus: CreateOrderSku[]; // Antes: `Sku[]`
}
