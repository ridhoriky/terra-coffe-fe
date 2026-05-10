export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  isSeasonal: boolean;
  seasonStart: string | null;
  seasonEnd: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  category: { id: string; name: string; slug: string };
  name: string;
  slug: string;
  description: string | null;
  price: number;
  finalPrice: number;
  imageUrl: string | null;
  calories: number | null;
  tags: string[];
  isAvailable: boolean;
  isFeatured: boolean;
  discount: {
    active: boolean;
    type: "percentage" | "fixed" | null;
    value: number | null;
    label: string | null;
    endsAt: string | null;
  };
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}
