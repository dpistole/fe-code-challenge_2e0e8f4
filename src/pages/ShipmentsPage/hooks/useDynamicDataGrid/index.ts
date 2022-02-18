import { useCallback, useState, useRef } from "react";
import { useWindowResize } from "beautiful-react-hooks";

export interface UseDynamicDataGrid {
  pageSize: number;
  dataGridContainerRef: (node: HTMLDivElement) => void;
}

const DATA_GRID_HEADER_HEIGHT = 56;
const DATA_GRID_FOOTER_HEIGHT = 52;
const DATA_GRID_SCROLLBAR_HEIGHT = 25;

export const useDynamicDataGrid = (): UseDynamicDataGrid => {
  // initialize a state value to store the pageSize used by the DataGrid
  const [pageSize, setPageSize] = useState(0);
  // initialize a ref for storing the grid container
  const gridContainerRef = useRef<null | HTMLDivElement>(null);

  const getPageSizeFromNode = (node: HTMLDivElement) => {
    // else we have a DIV Element and we get the height
    const totalHeight = node.clientHeight;
    const heightAvailableForRows =
      totalHeight -
      DATA_GRID_HEADER_HEIGHT -
      DATA_GRID_FOOTER_HEIGHT -
      DATA_GRID_SCROLLBAR_HEIGHT;

    // calculate page size by dividing available height by 52px
    return Math.floor(heightAvailableForRows / 52);
  };

  // define a callback function that will get passed the container ref so that we can determine its size
  const dataGridContainerRef = useCallback((node: HTMLDivElement) => {
    // if we are unmounting null is passed, and we dont need to resize
    if (node === null) {
      return;
    }
    gridContainerRef.current = node;
    // update the pageSize
    setPageSize(getPageSizeFromNode(node));
  }, []);

  // on resize recalculate the page size
  useWindowResize(() => {
    if (gridContainerRef.current !== null) {
      setPageSize(getPageSizeFromNode(gridContainerRef.current));
    }
  });

  return {
    pageSize,
    dataGridContainerRef,
  };
};
