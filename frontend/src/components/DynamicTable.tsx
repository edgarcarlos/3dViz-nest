import { useMemo } from "react";
import { useDataContext } from "./context";

type DynamicTableProps = {
  onCellClick: (id: string) => void;
};

function DynamicTable({ onCellClick }: DynamicTableProps) {
  const { data, filteredData, xLabels, zLabels } = useDataContext();
  const tableData = useMemo(() => { //usememo viene utilizzata per calcolare tabledata, array bidimensionale che rappresenta i valori della tabella, eseguito solo quando data cambia
    const result: number[][] = [];
    const nLabel = xLabels.length;
    for (let i = 0; i < nLabel; i++) {
      result.push([]);
      data
        .filter((d) => d.labelX === i) //ogni label corrisponde a una riga della tabella
        .sort((a, b) => a.labelZ - b.labelZ) //i valori sono ordinati e aggiunti alla riga corrispondente
        .forEach((d) => result[i].push(d.value));
    }
    return result;
  }, [data]);

  // creazione della struttura della tabella, per evidenziare le celle, vengono filtrate e se fanno parte dei valori da mostrare, vengono colorate di verde
  return (
    <table id="table" >
      <thead>
        <tr>
          <td></td>
          {zLabels.map((zLabel) => (
            <th key={zLabel}>{zLabel}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <th>{xLabels[index]}</th>
            {row.map((value, i) => {
              const isHighlighted = filteredData.some(
                (d) => d.labelX === index && d.labelZ === i && d.value === value
              );
              const id = index * row.length + i;
              return (
                <td key={id} id={id.toString()} onClick={() => onCellClick(id.toString())} style={{ backgroundColor: isHighlighted ? "lightgreen" : "lightgray" }}>
                  {value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DynamicTable;