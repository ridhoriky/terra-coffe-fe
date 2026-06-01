export interface SiteSettings {
  id: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  locationText: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  altText: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  message: string;
  avatarUrl: string | null;
  sortOrder: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}
