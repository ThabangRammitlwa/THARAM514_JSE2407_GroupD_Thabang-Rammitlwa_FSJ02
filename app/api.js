const API_BASE_URL = 'https://next-ecommerce-api.vercel.app';
export async function fetchProducts(params = {}) {
  const {
    page = 1,
    limit = 20,
    search = '',
    category = '',
    sortBy = 'price',
    sortOrder = 'asc',
  } = params;

  // Calculate skip value for pagination
  const skip = (page - 1) * limit;

  // Create query parameters
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
    search,
    category,
    sortBy,
    sortOrder,
  });

  // Make the API request with query parameters
  const response = await fetch(`${API_BASE_URL}/products?${queryParams}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  // Parse and return the response data
  const data = await response.json();
  return {
    products: data || [],
    totalPages: data.totalPages || 1,
    totalProducts: data.totalProducts || 0,
  };
}

export async function fetchProductById(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}
  
export async function fetchCategories() {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}