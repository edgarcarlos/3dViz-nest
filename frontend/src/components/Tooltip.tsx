import { tabData } from '../App';
import { Html } from '@react-three/drei';
import { Vector3 } from 'three';
import { useDataContext } from './context';
import { useData } from './DataProvider';

type TooltipProps = {
    bar: tabData;
    position: Vector3;
};

function Tooltip({ bar, position }: TooltipProps) {
    const { xLabels, zLabels } = useDataContext();
    const { fetched } = useData();
    return (
      fetched &&
        <Html position={position} key={bar.id}>
          <div style={{ background: "white", width: "150px",
            padding: "3px", borderRadius: "5px", 
            boxShadow: "0 0 5px rgba(0,0,0,0.3)" }}>
            {fetched.legend.y}: {bar.value} <br />
            {fetched.legend.z}: {zLabels[bar.labelZ]} <br />
            {fetched.legend.x}: {xLabels[bar.labelX]}
          </div>
        </Html>
    );
}

export default Tooltip;