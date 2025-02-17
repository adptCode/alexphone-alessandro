export interface Sku {
  id: string
  sku: string
  name: string
  description: string
  price: number
  grade: 'excellent' | 'very_good' | 'good'
  color: 'white' | 'black' | 'red' | 'pink'
  storage: 64 | 128 | 256 | 512
  image: string
}

export type SkuGrade = 'excellent' | 'very_good' | 'good'
export type SkuColor = 'white' | 'black' | 'red' | 'pink'
export type SkuStorage = 64 | 128 | 256 | 512
