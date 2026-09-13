import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getWhatsAppLink, getInstagramLink } from '../config';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="footer-col footer-brand">
        <img src="/src/assets/logo.jpg" alt="ROSA" className="footer-logo" />
        <p>{t('footer.tagline')}</p>
      </div>
      <div className="footer-col">
        <h5>{t('footer.shopLinks')}</h5>
        <Link to="/shop">{t('footer.shop')}</Link>
        <Link to="/custom-gifts">{t('footer.customGifts')}</Link>
        <Link to="/contact">{t('footer.deliveryPolicy')}</Link>
      </div>
      <div className="footer-col">
        <h5>{t('footer.info')}</h5>
        <Link to="/about">{t('footer.aboutUs')}</Link>
        <Link to="/contact">{t('footer.contactUsLink')}</Link>
        <Link to="/about">{t('footer.terms')}</Link>
      </div>
      <div className="footer-col">
        <h5>{t('footer.contactUs')}</h5>
        <a href={getWhatsAppLink('مرحباً')} target="_blank" rel="noopener noreferrer">{t('footer.whatsapp')}</a>
        <a href={getInstagramLink()} target="_blank" rel="noopener noreferrer">{t('footer.instagram')}</a>
      </div>
    </footer>
  );
}

export default Footer;