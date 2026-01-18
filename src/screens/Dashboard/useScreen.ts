import { useMemo, useState } from 'react';
import { TLink } from '@/types/links.type';
import { useAppSelector } from '@/store';

export type DashboardBaseFilters = 'unread' | 'read' | 'all';

export default function useScreen() {
  const [selectedFilterLinks, setSelectedFilterLinks] = useState<DashboardBaseFilters>('all');
  const [showAddLink, setShowAddLink] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchPhase, setSearchPhase] = useState<string>('');

  const { links } = useAppSelector(({ links }) => links);

  const handleFilterLinks = (filterOption: DashboardBaseFilters) => {
    const _setFilterOption: DashboardBaseFilters = selectedFilterLinks === filterOption ? 'all' : filterOption;
    setSelectedFilterLinks(_setFilterOption);
  };

  const toggleAddLink = () => setShowAddLink(!showAddLink);

  const filteredLinks = useMemo(() => {
    let _filteredLinks = links;

    if (selectedFilterLinks !== 'all') {
      _filteredLinks = links.filter((link: TLink) => {
        if (selectedFilterLinks === 'read') {
          return link.read;
        }

        if (selectedFilterLinks === 'unread') {
          return !link.read;
        }

        return true;
      });
    }

    if (searchPhase) {
      _filteredLinks = _filteredLinks.filter((link: TLink) => {
        const titleMatch = link.title.toLowerCase().includes(searchPhase.toLowerCase());
        const tagsMatch = link.tags.some((tag) => tag.toLowerCase().includes(searchPhase.toLowerCase()));
        return titleMatch || tagsMatch;
      });
    }

    return _filteredLinks;
  }, [links, selectedFilterLinks, searchPhase]);

  return {
    links,
    filteredLinks,
    selectedFilterLinks,
    handleFilterLinks,
    toggleAddLink,
    showAddLink,
    setShowAddLink,
    showSearch,
    setShowSearch,
    searchPhase,
    setSearchPhase,
  };
}
