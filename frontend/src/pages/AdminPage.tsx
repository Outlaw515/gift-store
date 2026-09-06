import { useState } from 'react';

function AdminPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:5144/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          stockQuantity: parseInt(stockQuantity),
          imageUrl: imageUrl || null,
        }),
      });

      if (!response.ok) throw new Error('فشل إضافة المنتج');

      setMessage('تمت إضافة المنتج بنجاح');
      setName('');
      setDescription('');
      setPrice('');
      setStockQuantity('');
      setImageUrl('');
    } catch {
      setMessage('حدث خطأ، حاول مرة أخرى');
    }
  }

  return (
    <div className="static-page">
      <h2>إضافة منتج جديد</h2>
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
        <button type="submit" className="admin-submit-btn">إضافة المنتج</button>
      </form>
      {message && <p className="admin-message">{message}</p>}
    </div>
  );
}

export default AdminPage;