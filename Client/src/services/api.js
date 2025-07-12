const API_BASE = process.env.REACT_APP_API_URL + '/products';

export async function getProducts() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
