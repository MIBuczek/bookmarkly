import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TLink, TUpdateLink } from '@/types/links.type';

type LinksState = {
  links: TLink[];
  total: number;
};

const initialState: LinksState = {
  links: [],
  total: 0,
};

export const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    setLinks: (state, action: PayloadAction<{ links: TLink[]; count: number }>) => {
      state.links = action.payload.links;
      state.total = action.payload.count;
    },
    addLink: (state, action: PayloadAction<{ link: TLink }>) => {
      state.links.push(action.payload.link);
      state.total++;
    },
    updateLink: (state, action: PayloadAction<{ link: TUpdateLink }>) => {
      state.links = [...state.links].map((link) => {
        return link.id === action.payload.link.id ? { ...link, ...action.payload.link } : link;
      });
    },
    deleteLink: (state, action: PayloadAction<{ id: string }>) => {
      state.links = [...state.links].filter((link) => link.id !== action.payload.id);
    },
  },
});
