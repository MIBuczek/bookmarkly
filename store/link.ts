import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TLink, TUpdateLink } from '@/types/links.type';

type LinkState = {
  links: TLink[];
  total: number;
};

const initialState: LinkState = {
  links: [],
  total: 0,
};

export const linkSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    setLinks: (state, action: PayloadAction<{ links: TLink[]; count: number }>) => {
      console.log(action.payload.links);
      return { ...state, links: [...action.payload.links], total: action.payload.count };
    },
    addLink: (state, action: PayloadAction<{ link: TLink }>) => {
      return { ...state, links: [...state.links, action.payload.link] };
    },
    updateLink: (state, action: PayloadAction<{ link: TUpdateLink }>) => {
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
