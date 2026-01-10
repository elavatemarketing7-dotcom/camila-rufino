
export interface Question {
  id: number;
  text: string;
  options: string[];
}

export type ViewState = 'CHOICE' | 'QUIZ' | 'ANALYZING' | 'RESULT' | 'MAIN_SITE';

export interface GalleryItem {
  id: string;
  url: string;
  category: string;
}
