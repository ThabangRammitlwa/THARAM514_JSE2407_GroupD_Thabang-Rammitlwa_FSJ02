
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/app/components/productDetail'; 
import { fetchProductById } from '@/app/api';

export async function generateMetadata({ params }) {
  const product = await fetchProductById(params.id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.title} | Family Store`,
    description: product.description,
  };
}

async function fetchProductData(id) {
  const product = await fetchProductById(id);
  if (!product) notFound();
  return product;
}

export default async function ProductPage({ params }) {
  const product = await fetchProductData(params.id);

  return <ProductDetail product={product} />;
}








