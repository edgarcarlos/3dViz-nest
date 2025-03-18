import { createContext, useContext } from "react";
import { tabData } from "../App";

type Data = {
    data: tabData[];
    filteredData: tabData[];
    setFilteredData: (value: React.SetStateAction<tabData[]>) => void;
    setSelectedBar: (value: React.SetStateAction<tabData | null>) => void;
    xLabels: string[];
    zLabels: string[];
    showAveragePlane: boolean;
    isGreaterChecked: boolean;
};

export const DataContext = createContext<Data | undefined>(undefined);

export function useDataContext() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used with a DataContext");
  }
  return context;
}