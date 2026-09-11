import { Link } from 'react-router-dom';
import { getWhatsAppLink, getInstagramLink } from '../config';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-col footer-brand">
        <img src="/src/assets/logo.jpg" alt="ROSA" className="footer-logo" />
        <p>نحن في روزا نؤمن أن الهدية ليست مجرد شيء، بل رسالة من القلب</p>
      </div>
      <div className="footer-col">
        <h5>روابط المتجر</h5>
        <Link to="/shop">المتجر</Link>
        <Link to="/custom-gifts">الهدايا المخصصة</Link>
        <Link to="/contact">سياسة التوصيل</Link>
      </div>
      <div className="footer-col">
        <h5>معلومات</h5>
        <Link to="/about">من نحن</Link>
        <Link to="/contact">اتصل بنا</Link>
        <Link to="/about">الشروط والأحكام</Link>
      </div>
      <div className="footer-col">
        <h5>تواصل معنا</h5>
        <a href={getWhatsAppLink('مرحباً')} target="_blank" rel="noopener noreferrer">واتساب</a>
        <a href={getInstagramLink()} target="_blank" rel="noopener noreferrer">انستقرام</a>
      </div>
    </footer>
  );
}

export default Footer;