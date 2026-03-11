// API configuration and utilities
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: Record<string, any>;
  headers?: Record<string, string>;
}

async function apiFetch<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const method = options?.method || 'GET';
  
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  };

  if (options?.body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(error.message || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error [${method} ${endpoint}]:`, error);
    throw error;
  }
}

// ─── Cars API ────────────────────────────────────────────────────────────────

export async function getCars(params?: {
  location?: string;
  category?: string;
  fuel?: string;
  transmission?: string;
  minPrice?: number;
  maxPrice?: number;
  seats?: number;
  available?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  const queryString = new URLSearchParams(
    Object.entries(params || {})
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)])
  ).toString();

  const endpoint = `/api/cars${queryString ? `?${queryString}` : ''}`;
  return apiFetch<any>(endpoint);
}

export async function getCarById(id: string) {
  return apiFetch<any>(`/api/cars/${id}`);
}

export async function checkAvailability(carId: string, pickupDate: string, returnDate: string) {
  const params = new URLSearchParams({
    pickupDate,
    returnDate,
  });
  return apiFetch<any>(`/api/cars/${carId}/availability?${params}`);
}

export async function getLocations() {
  return apiFetch<{ success: boolean; locations: string[] }>('/api/locations');
}

export async function getCategories() {
  return apiFetch<{ success: boolean; categories: string[] }>('/api/categories');
}

// ─── Pricing API ─────────────────────────────────────────────────────────────

export async function calculatePricing(
  carId: string,
  pickupDate: string,
  returnDate: string,
  promoCode?: string
) {
  return apiFetch<any>('/api/pricing', {
    method: 'POST',
    body: {
      carId,
      pickupDate,
      returnDate,
      promoCode,
    },
  });
}

export async function validatePromoCode(code: string) {
  return apiFetch<any>('/api/promo/validate', {
    method: 'POST',
    body: { code },
  });
}

// ─── Bookings API ────────────────────────────────────────────────────────────

export interface BookingRequest {
  carId: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation?: string;
  returnLocation?: string;
  promoCode?: string;
  driver: {
    name: string;
    email: string;
    phone?: string;
  };
}

export async function createBooking(data: BookingRequest) {
  return apiFetch<any>('/api/bookings', {
    method: 'POST',
    body: data,
  });
}

export async function getBooking(reference: string) {
  return apiFetch<any>(`/api/bookings/${reference}`);
}

export async function cancelBooking(reference: string) {
  return apiFetch<any>(`/api/bookings/${reference}/cancel`, {
    method: 'PATCH',
  });
}

export async function getAllBookings() {
  return apiFetch<any>('/api/bookings');
}

// ─── Health Check ────────────────────────────────────────────────────────────

export async function healthCheck() {
  try {
    return await apiFetch<any>('/api/health');
  } catch (error) {
    console.error('Health check failed:', error);
    return { success: false, status: 'error' };
  }
}
