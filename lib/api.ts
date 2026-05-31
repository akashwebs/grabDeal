const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { timeout = 10000, ...fetchOptions } = options;
  
  const url = `${API_BASE_URL}${endpoint}`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

export const api = {
  // Offers
  getOffers: (query?: string) => 
    apiFetch(`/offers${query ? `?${query}` : ''}`),
  
  getOfferById: (id: string) => 
    apiFetch(`/offers/${id}`),
  
  getEndingSoonOffers: () => 
    apiFetch('/offers/ending-soon'),
  
  // Brands
  getBrands: () => 
    apiFetch('/brands'),
  
  getBrandById: (id: string) => 
    apiFetch(`/brands/${id}`),
  
  // Categories
  getCategories: () => 
    apiFetch('/categories'),
  
  // Testimonials
  getTestimonials: () => 
    apiFetch('/testimonials'),
  
  // FAQs
  getFAQs: (category?: string) => 
    apiFetch(`/faqs${category ? `?category=${category}` : ''}`),
};
