export async function fetchCategories() {
    const response = await fetch('http://localhost:5000/api/categories');
    return response.json();    
}

export async function fetchProducts() {
    const response = await fetch('http://localhost:5000/api/products');
    return response.json();
}






const API_BASE = 'http://localhost:5000/api/products';

export async function getProducts() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export async function createProduct(product) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
}

export async function updateProduct(id, product) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
} 