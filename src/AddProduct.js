import React, { useState } from 'react';

const AddProduct = ({ categories, onAddProduct, onCancel }) => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();
    setError('');

    // Kiểm tra ràng buộc
    if (!productId || !productName || !selectedCategory || !price || !quantity || !dateAdded || !description) {
      setError('Tất cả các trường đều bắt buộc phải nhập!');
      return;
    }

    const priceNum = Number(price);
    const quantityNum = Number(quantity);

    if (!/PROD-\d{4}/.test(productId)) {
      setError('Mã sản phẩm phải đúng định dạng PROD-XXXX! Trong (với X là các số)');
      return;
    }
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Giá sản phẩm phải là số lớn hơn 0!');
      return;
    }
    if (!Number.isInteger(quantityNum) || quantityNum <= 0) {
      setError('Số lượng sản phẩm phải là số nguyên lớn hơn 0!');
      return;
    }
    if (new Date(dateAdded) > new Date()) {
      setError('Ngày nhập sản phẩm không được lớn hơn ngày hiện tại!');
      return;
    }

    // Gọi hàm thêm sản phẩm
    onAddProduct({
      id: productId,
      name: productName,
      category: selectedCategory,
      price: priceNum,
      quantity: quantityNum,
      dateAdded,
      description,
    });

    // Hiển thị thông báo thành công
    alert("Sản phẩm đã được thêm thành công!");
    
    // Reset form
    setProductId('');
    setProductName('');
    setSelectedCategory('');
    setPrice('');
    setQuantity('');
    setDateAdded('');
    setDescription('');

    // Quay về màn hình danh sách
    onCancel();
  };

  return (
    <div>
      <h2>Thêm mới sản phẩm</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleAddProduct}>
        <div>
          <label>Mã sản phẩm:</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Thể loại:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Chọn thể loại</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Giá:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Số lượng:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ngày nhập sản phẩm:</label>
          <input
            type="date"
            value={dateAdded}
            onChange={(e) => setDateAdded(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mô tả sản phẩm:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Thêm mới</button>
        <button type="button" onClick={onCancel}>Hủy</button>
      </form>
    </div>
  );
};

export default AddProduct;

