import type { Product } from '../types/Product';

export function getLocalizedName(product: Product, lang: string): string {
  if (lang === 'en' && product.nameEn) return product.nameEn;
  return product.name;
}

export function getLocalizedDescription(product: Product, lang: string): string {
  if (lang === 'en' && product.descriptionEn) return product.descriptionEn;
  return product.description;
}

export function getLocalizedCategory(product: Product, lang: string): string {
  if (lang === 'en' && product.categoryEn) return product.categoryEn;
  return product.category;
}