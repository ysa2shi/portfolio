export interface Post {
  id: string;
  data: {
    title: string;
    description?: string;
    image?: {
      url: string;
      alt: string;
    };
    tags?: string[];
    publishDate: Date;
    published: boolean;
  };
}
