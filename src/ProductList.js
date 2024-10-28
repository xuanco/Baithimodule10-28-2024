import React, { useState } from 'react';

const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const AddProduct = ({ onAddProduct, onCancel }) => {
  const [newProduct, setNewProduct] = useState({ id: '', name: '', category: '', quantity: '', price: '', dateAdded: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.id || !newProduct.name || !newProduct.category || !newProduct.quantity || !newProduct.price || !newProduct.dateAdded) {
      setMessage('Tất cả các trường đều bắt buộc phải nhập.');
      return;
    }
    if (!/^PROD-\d{4}$/.test(newProduct.id)) {
      setMessage('Mã sản phẩm phải đúng định dạng PROD-XXXX.(với X là các số)');
      return;
    }
    if (new Date(newProduct.dateAdded) > new Date()) {
      setMessage('Ngày nhập sản phẩm không được lớn hơn ngày hiện tại.');
      return;
    }
    if (parseInt(newProduct.quantity) <= 0) {
      setMessage('Số lượng sản phẩm phải là số nguyên lớn hơn 0.');
      return;
    }
    if (parseFloat(newProduct.price) <= 0) {
      setMessage('Giá sản phẩm phải là số lớn hơn 0.');
      return;
    }

    onAddProduct(newProduct);
    setMessage('Thêm sản phẩm thành công!');
    setNewProduct({ id: '', name: '', category: '', quantity: '', price: '', dateAdded: '' });
  };

  return (
    <div>
      <h2>Thêm mới sản phẩm</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mã sản phẩm:</label>
          <input type="text" name="id" value={newProduct.id} onChange={handleChange} required />
        </div>
        <div>
          <label>Tên sản phẩm:</label>
          <input type="text" name="name" value={newProduct.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Thể loại:</label>
          <select name="category" value={newProduct.category} onChange={handleChange} required>
            <option value="">Chọn thể loại</option>
            <option value="Thực phẩm chức năng">Thực phẩm chức năng</option>
            <option value="Thiết bị y tế">Thiết bị y tế</option>
            <option value="Dược phẩm">Dược phẩm</option>
          </select>
        </div>
        <div>
          <label>Giá:</label>
          <input type="number" name="price" value={newProduct.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Số lượng:</label>
          <input type="number" name="quantity" value={newProduct.quantity} onChange={handleChange} required />
        </div>
        <div>
          <label>Ngày nhập sản phẩm:</label>
          <input type="date" name="dateAdded" value={newProduct.dateAdded} onChange={handleChange} required />
        </div>
        <button type="submit">Thêm mới</button>
        <button type="button" onClick={onCancel}>Hủy</button>
      </form>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 'PROD-0001', name: 'Blackmores Omega Double High Strength Fish Oil', category: 'Thực phẩm chức năng', quantity: 1000, price: 598000, dateAdded: '2022-01-24' },
    { id: 'PROD-0002', name: 'Blackmores CoQ10 150mg', category: 'Thực phẩm chức năng', quantity: 100, price: 513000, dateAdded: '2022-10-15' },
    { id: 'PROD-0003', name: 'Máy đo huyết áp bắp tay Microlife B3 Basic', category: 'Thiết bị y tế', quantity: 500, price: 1350000, dateAdded: '2023-02-03' },
    { id: 'PROD-0004', name: 'Eflergan', category: 'Dược phẩm', quantity: 65, price: 30000, dateAdded: '2021-11-11' },
    { id: 'PROD-0005', name: 'Nhiệt kế hồng ngoại Kachi JXB-315', category: 'Thiết bị y tế', quantity: 20, price: 768000, dateAdded: '2022-10-15' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const filteredProducts = products.filter(product => (
    (product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === '' || product.category === selectedCategory)
  ));

  // Sắp xếp danh sách sản phẩm theo tổng số ký tự trong tên sản phẩm
  const sortedProducts = [...filteredProducts].sort((a, b) => a.name.length - b.name.length);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setIsAdding(false);
  };

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nhập tên sản phẩm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        >
          <option value="">Chọn thể loại</option>
          <option value="Thực phẩm chức năng">Thực phẩm chức năng</option>
          <option value="Thiết bị y tế">Thiết bị y tế</option>
          <option value="Dược phẩm">Dược phẩm</option>
        </select>
        <button style={{ padding: '5px 10px', marginRight: '10px' }} onClick={() => {/* Xử lý tìm kiếm ở đây */}}>Tìm kiếm</button>
        <button style={{ padding: '5px 10px' }} onClick={() => setIsAdding(true)}>Thêm mới</button>
      </div>

      {isAdding ? (
        <AddProduct onAddProduct={handleAddProduct} onCancel={() => setIsAdding(false)} />
      ) : (
        <>
          {sortedProducts.length > 0 ? (
            <table border="1" cellPadding="5" cellSpacing="0">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã sản phẩm</th>
                  <th>Tên sản phẩm</th>
                  <th>Thể loại</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Ngày nhập</th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price.toLocaleString('vi-VN')}</td>
                    <td>{formatDate(product.dateAdded)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Không có kết quả</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;



