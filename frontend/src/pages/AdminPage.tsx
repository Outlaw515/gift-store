import { useState, useEffect } from 'react';
import type { Product } from '../types/Product';

const API_URL = 'http://localhost:5144/api/products';

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('هدايا جاهزة');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (authenticated) loadProducts();
  }, [authenticated]);

  function loadProducts() {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(() => setMessage('فشل تحميل المنتجات'));
  }

  function resetForm() {
    setEditingId(null);
    setName('');
    setDescription('');
    setPrice('');
    setStockQuantity('');
    setImageUrl('');
    setCategory('هدايا جاهزة');
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setName(product.name);
    setDescription(product.description);
    setPrice(String(product.price));
    setStockQuantity(String(product.stockQuantity));
    setImageUrl(product.imageUrl || '');
    setCategory(product.category || 'هدايا جاهزة');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id: string) {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error();
      setMessage('تم حذف المنتج بنجاح');
      loadProducts();
    } catch {
      setMessage('حدث خطأ أثناء الحذف');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    const payload = {
      name,
      description,
      price: parseFloat(price),
      stockQuantity: parseInt(stockQuantity),
      imageUrl: imageUrl || null,
      category,
    };

    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error();

      setMessage(editingId ? 'تم تعديل المنتج بنجاح' : 'تمت إضافة المنتج بنجاح');
      resetForm();
      loadProducts();
    } catch {
      setMessage('حدث خطأ، حاول مرة أخرى');
    }
  }

  if (!authenticated) {
    return (
      <div className="static-page">
        <h2>دخول الإدارة</h2>
        <input
          type="password"
          placeholder="كلمة المرور"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button
          onClick={() => {
            if (passwordInput === 'rosa2026') setAuthenticated(true);
          }}
          className="admin-submit-btn"
          style={{ marginRight: '0.5rem' }}
        >
          دخول
        </button>
      </div>
    );
  }

  return (
    <div className="static-page">
      <h2>{editingId ? 'تعديل منتج' : 'إضافة منتج جديد'}</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          اسم المنتج
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          الوصف
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          السعر
          <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <label>
          الكمية المتوفرة
          <input type="number" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} required />
        </label>
        <label>
          رابط الصورة (اختياري)
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
        </label>
        <label>
          الفئة
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="هدايا جاهزة">هدايا جاهزة</option>
            <option value="باقات الورد">باقات الورد</option>
            <option value="العطور">العطور</option>
            <option value="الشوكولاتة">الشوكولاتة</option>
          </select>
        </label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit" className="admin-submit-btn">
            {editingId ? 'حفظ التعديلات' : 'إضافة المنتج'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="admin-cancel-btn">
              إلغاء
            </button>
          )}
        </div>
      </form>
      {message && <p className="admin-message">{message}</p>}

      <h2 style={{ marginTop: '2rem' }}>المنتجات الحالية ({products.length})</h2>
      <div className="admin-product-list">
        {products.map((product) => (
          <div className="admin-product-row" key={product.id}>
            <div className="admin-product-info">
              <strong>{product.name}</strong>
              <span>{product.category || 'بدون فئة'} — ${product.price}</span>
            </div>
            <div className="admin-product-actions">
              <button onClick={() => startEdit(product)} className="admin-edit-btn">تعديل</button>
              <button onClick={() => handleDelete(product.id)} className="admin-delete-btn">حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;