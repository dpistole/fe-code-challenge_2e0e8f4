import { useState } from "react";
import { useWindowResize } from "beautiful-react-hooks";

export interface UseDynamicDataGrid {
  pageSize: number;
}

export const useDynamicDataGrid = (): UseDynamicDataGrid => {
  const getPageSize = () => {
    const totalHeight = window.innerHeight;
    // subtract toolbar height (64px)
    const heightWithoutToolbar = totalHeight - 64;
    // subtract footer height (52px)
    const heightAvailableForRows = heightWithoutToolbar - 52;
    // calculate page size by dividing available height by 52px (the height of a row) and then remove 1 row to allow for room from the scrollbar
    const usePageSize = Math.floor(heightAvailableForRows / 52) - 1;

    return usePageSize;
  };
  // initialize a state value for storing the number of rows displayed per page
  const [pageSize, setPageSize] = useState(getPageSize());

  useWindowResize(() => {
    setPageSize(getPageSize());
  });

  return {
    pageSize,
  };
};
