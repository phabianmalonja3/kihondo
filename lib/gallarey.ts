 export interface GalleryItem {
  id: number;
  title: string;
  image_path: string;
  category: Category;
  status: "Active";
}
export interface Category {
  id: number;
  name: string;
}

