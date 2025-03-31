import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Link = {
  id: string;
  url: string;
  title: string;
  description: string;
  author: string;
  source: string;
  tags: string[];
  comments: string;
  read: boolean;
  created_ad: string;
};

export const MOCK_LINKS: Link[] = [
  {
    id: 'link-1',
    url: 'https://www.example.com/article-1',
    title: 'The Future of AI in Healthcare',
    description: 'An in-depth look at how artificial intelligence is revolutionizing the healthcare industry.',
    author: 'Dr. Jane Smith',
    source: 'Example Medical Journal',
    tags: ['AI', 'Healthcare', 'Technology', 'Innovation'],
    read: false,
    comments: '',
    created_ad: '2023-10-26T10:00:00Z',
  },
  {
    id: 'link-2',
    url: 'https://www.techblog.com/coding-tips',
    title: '10 Essential Coding Tips for Beginners',
    description: 'A guide for new programmers on how to write clean, efficient, and maintainable code.',
    author: 'John Doe',
    source: 'Tech Blog',
    tags: ['Coding', 'Programming', 'Beginners', 'Tips', 'Development'],
    read: false,
    comments: '',
    created_ad: '2023-10-25T14:30:00Z',
  },
  {
    id: 'link-3',
    url: 'https://www.travelmagazine.com/exotic-destinations',
    title: 'Exploring the Most Exotic Travel Destinations',
    description: 'Discover breathtaking locations around the world that are off the beaten path.',
    author: 'Sarah Williams',
    source: 'Travel Magazine',
    tags: ['Travel', 'Exotic', 'Destinations', 'Adventure', 'Culture'],
    read: false,
    comments: '',
    created_ad: '2023-10-24T09:15:00Z',
  },
  {
    id: 'link-4',
    url: 'https://www.foodie.com/vegan-recipes',
    title: 'Delicious and Easy Vegan Recipes',
    description: 'A collection of simple and tasty vegan recipes for every meal of the day.',
    author: 'Emily Brown',
    source: 'Foodie Website',
    tags: ['Vegan', 'Recipes', 'Food', 'Cooking', 'Healthy'],
    read: false,
    comments: '',
    created_ad: '2023-10-23T16:45:00Z',
  },
];

type LinkState = {
  links: Link[];
  error: Error | null;
};

const initialState: LinkState = {
  links: MOCK_LINKS,
  error: null,
};

export const linkSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    setLinks: (state, action: PayloadAction<{ links: Link[] }>) => {
      return { ...state, ...action.payload };
    },
    addLink: (state, action: PayloadAction<{ link: Link }>) => {
      return { ...state, links: [...state.links, action.payload.link] };
    },
    updateLink: (state, action: PayloadAction<{ link: Partial<Link> & { id: string } }>) => {
      const _links = [...state.links].map((link) => {
        return link.id === action.payload.link.id ? { ...link, ...action.payload.link } : link;
      });
      return { ...state, links: _links };
    },
    deleteLink: (state, action: PayloadAction<{ id: string }>) => {
      const _links = [...state.links].filter((link) => link.id !== action.payload.id);
      return { ...state, links: _links };
    },
  },
});
