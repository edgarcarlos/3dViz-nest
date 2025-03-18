import { useMemo, useState } from 'react';
import { tabData } from '../App';
import { useDataContext } from './context';

type FiltersProps = {
  selectedBar: tabData | null;
  setIsGreaterChecked: (value: React.SetStateAction<boolean>) => void;
}

// Funzione per il filtro Top N
const filterTopN = (data: tabData[], n: number) => {
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  return sortedData.slice(0, n);
};

// Funzione per il filtro Bottom N
const filterBottomN = (data: tabData[], n: number) => {
  const sortedData = [...data].sort((a, b) => a.value - b.value);
  return sortedData.slice(0, n);
};

// Funzione per il filtro sopra la media
const filterAboveValue = (data: tabData[], value: number) => {
  return data.filter((d) => d.value >= value);
};

// Funzione per il filtro sotto la media
const filterBelowValue = (data: tabData[], value: number) => {
  return data.filter((d) => d.value <= value);
};

function Filters({ selectedBar, setIsGreaterChecked }: FiltersProps) {
  const { data, setFilteredData, setSelectedBar } = useDataContext();
  let { isGreaterChecked } = useDataContext();
  const [nValue, setNValue] = useState(""); // Valore di N per il filtro top/bottom
  const [isTopChecked, setIsTopChecked] = useState(false); // Checkbox top
  const [isBottomChecked, setIsBottomChecked] = useState(false); // Checkbox bottom
  const [isUpperChecked, setIsUpperChecked] = useState(false); // Checkbox sopra la media
  const [isLowerChecked, setIsLowerChecked] = useState(false); // Checkbox sotto la media
/*   const [isGreaterChecked, setIsGreaterChecked] = useState(true); // Checkbox sopra una barra
 */
  const globalAverage = useMemo(() => {
    return data.length > 0 ? data.map((d) => d.value).reduce((acc, curr) => acc + curr, 0) / data.length : 0;
  }, []);

  const handleTopBottomFilter = () => {
    if (!isTopChecked && !isBottomChecked) return;
    let filteredData = [...data];
    if (isTopChecked) filteredData = filterTopN(filteredData, parseInt(nValue));
    if (isBottomChecked) filteredData = filterBottomN(filteredData, parseInt(nValue));
    setFilteredData(filteredData);
    setSelectedBar(null);
  };

  const handleAverageFilter = () => {
    if (!isUpperChecked && !isLowerChecked) return;
    let filteredData = [...data];
    if (isUpperChecked) filteredData = filterAboveValue([...data], globalAverage);
    if (isLowerChecked) filteredData = filterBelowValue([...data], globalAverage);
    setFilteredData(filteredData);
    setSelectedBar(null);
  };

  const handleBarFilter = () => {
    let filteredData = [...data];
    /* console.log(selectedBar);
    console.log(isGreaterChecked); */
    if (!selectedBar) 
      return;
    isGreaterChecked = !isGreaterChecked;
    if (isGreaterChecked) 
      filteredData = filterAboveValue(filteredData, selectedBar.value);
    else 
      filteredData = filterBelowValue(filteredData, selectedBar.value);
    setFilteredData(filteredData);
  };

  return (
    <div id="filter-container">
      <div id="filter1">
        Filtra top o bottom n barre del grafico
        <div className="filter-body">
          <label htmlFor="number-selector">Inserisci N:</label>
          <input
            type="number"
            id="number-selector"
            min="1"
            placeholder="Inserisci un numero"
            value={nValue}
            onChange={(e) => {
              const newValue = e.target.value;
              if (Number(newValue) > 0) {
                setNValue(newValue); // set il valore solo se è un numero positivo
              }
            }}
          />
          <div>
            <input
              type="radio"
              id="top-radio"
              name="topBottom"
              checked={isTopChecked}
              onChange={() => {
                setIsTopChecked(true);
                setIsBottomChecked(false); // Deseleziona l'altro
              }}
            />
            <label htmlFor="top-radio">Top</label>
          </div>
          <div>
            <input
              type="radio"
              id="bottom-radio"
              name="topBottom"
              checked={isBottomChecked}
              onChange={() => {
                setIsBottomChecked(true);
                setIsTopChecked(false); // Deseleziona l'altro
              }}
            />
            <label htmlFor="bottom-radio">Bottom</label>
          </div>
          <button onClick={handleTopBottomFilter}>Filtra</button>
        </div>
      </div>

      <div id="filter2">
        Filtra in base al valore medio globale
        <div className="filter-body">
          Valore medio globale: <strong>{globalAverage.toFixed(2)}</strong>
          <div>
            <input
              type="radio"
              id="upper-radio"
              name="averageFilter"
              checked={isUpperChecked}
              onChange={() => {
                setIsUpperChecked(true);
                setIsLowerChecked(false); // Deseleziona l'altro
              }}
            />
            <label htmlFor="upper-radio">Upper</label>
          </div>
          <div>
            <input
              type="radio"
              id="lower-radio"
              name="averageFilter"
              checked={isLowerChecked}
              onChange={() => {
                setIsLowerChecked(true);
                setIsUpperChecked(false); // Deseleziona l'altro
              }}
            />
            <label htmlFor="lower-radio">Lower</label>
          </div>
          <button onClick={handleAverageFilter}>Filtra</button>
        </div>
      </div>
      <div id='filter3'>
        Filtra rispetto a una barra
        <div className="filter-body">
          <div>
            <input
              type="radio"
              id="greater-radio"
              name="barFilter"
              checked={isGreaterChecked}
              onChange={() => {
                setIsGreaterChecked(true);
                handleBarFilter();
              }}
            />
            <label htmlFor="greater-radio">Mostra superiori</label>
          </div>
          <div>
            <input
              type="radio"
              id="smaller-radio"
              name="barFilter"
              checked={!isGreaterChecked}
              onChange={() => {
                setIsGreaterChecked(false);
                handleBarFilter();
              }}
            />
            <label htmlFor="smaller-radio">Mostra inferiori</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;

