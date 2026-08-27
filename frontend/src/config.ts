export const WHATSAPP_NUMBER = '967771674456';
export const INSTAGRAM_USERNAME = 'your_instagram_handle';

export function getWhatsAppLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function getInstagramLink(): string {
  return `https://instagram.com/${INSTAGRAM_USERNAME}`;
}