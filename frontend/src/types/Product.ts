export interface Product {
  id: string;
  name: string;
  description: string;
  nameEn?: string | null;
  descriptionEn?: string | null;
  price: number;
  stockQuantity: number;
  imageUrl?: string | null;
  category: string;
  categoryEn?: string | null;
}