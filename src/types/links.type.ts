type TLink = {
  id: string;
  userPhone: string;
  url: string;
  title: string;
  description: string;
  image: string;
  logo: string;
  author: string;
  source: string;
  tags: string[];
  read: boolean;
  comments: string;
  createdAt: string;
};

type TCreateLink = Omit<TLink, 'id' | 'createdAt'>;

type TUpdateLink = Partial<TLink>;

type TMetadata = Record<'url', string | null>;

type TGeneratedMetadataLink = Omit<TLink, 'tags'> & { keywords: string[] };

export type { TLink, TCreateLink, TUpdateLink, TMetadata, TGeneratedMetadataLink };
