export interface Brand {
  _id: string;
  name: string;
  logo_url: string;
  discount_percentage: number;
  category: string;
  verified: boolean;
  online: boolean;
  created_at: string;
}

export interface Offer {
  _id: string;
  brand_id: Brand | string;
  title: string;
  description: string;
  discount: number;
  discount_type: 'percentage' | 'flat';
  conditions: string;
  status: 'active' | 'expired' | 'inactive';
  type: 'flash_sale' | 'regular' | 'new_arrival';
  valid_until: string;
  image_url: string;
  minimum_purchase: number;
  verified: boolean;
  online: boolean;
  created_at: string;
}

export interface Category {
  _id: string;
  name: string;
  icon_url: string;
  description: string;
  created_at: string;
}

export interface Testimonial {
  _id: string;
  author_name: string;
  avatar_url: string;
  rating: number;
  feedback: string;
  verified: boolean;
  created_at: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: 'General' | 'Offers' | 'Payment' | 'Shipping' | 'Returns';
  order: number;
  active: boolean;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
