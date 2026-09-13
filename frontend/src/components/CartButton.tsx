import { ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { getWhatsAppLink } from '../config';
import { getLocalizedName } from '../utils/localizeProduct';

function CartButton() {
  const { items, removeFromCart, clearCart, totalItems } = useCart();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  function buildMessage(): string {
    if (items.length === 0) return '';

    const lines = items.map(
      (item) =>
        `- ${item.product.name} (x${item.quantity}) - $${(
          item.product.price * item.quantity
        ).toFixed(2)}`
    );

    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    return `مرحباً، أرغب بطلب التالي:\n\n${lines.join('\n')}\n\nالإجمالي: $${total.toFixed(2)}`;
  }

  function handleSendOrder() {
    const message = buildMessage();
    window.open(getWhatsAppLink(message), '_blank');
    clearCart();
    setOpen(false);
  }

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="cart-container">
      {open && (
        <div className="cart-panel">
          <div className="cart-panel-header">
            <h4>{t('cart.title')}</h4>
            <button onClick={() => setOpen(false)} className="cart-close-btn">
              <X size={18} />
            </button>
          </div>
          <ul className="cart-items-list">
            {items.map((item) => (
              <li key={item.product.id}>
                <span>
                  {getLocalizedName(item.product, i18n.language)} × {item.quantity}
                </span>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="cart-item-remove"
                >
                  {t('cart.remove')}
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleSendOrder} className="cart-send-btn">
            {t('cart.sendOrder')}
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="cart-fab"
        title={t('cart.cartTitle')}
      >
        <ShoppingCart size={24} />
        <span className="cart-badge">{totalItems}</span>
      </button>
    </div>
  );
}

export default CartButton;