import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import myFont from 'three/examples/fonts/helvetiker_regular.typeface.json';
import * as THREE from 'three';
import { extend } from "@react-three/fiber";
import { useDataContext } from './context';
extend({ TextGeometry });

type YAxisProps = {
  color?: string;
  xLength: number;
};

function YAxis({ color = 'green', xLength }: YAxisProps) {
  // Assi personalizzati con lunghezze differenti
  const { data } = useDataContext();
  const yValues = new Set(data.map((d) => d.value));
  const maxValue = Math.max(...yValues);
  const yAxisLength = maxValue + 2;
  const multiplesOfFive: number[] = [];
  for (let i = 0; i <= maxValue; i += 5) {
    multiplesOfFive.push(i);
  }
  const labels = multiplesOfFive.map((value) => ({
    text: value.toString(),
    position: new THREE.Vector3(xLength + 1, value, 0),
    rotation: new THREE.Euler(0, Math.PI, 0, 'XYZ')
  }));
  // Creazione delle linee degli assi
  const yAxis = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(xLength, 0, 0),
    new THREE.Vector3(xLength, yAxisLength, 0),
  ]);

  /*  */
  const font = new FontLoader().parse(myFont);
  return (
    <>
      <line>
        <bufferGeometry attach="geometry" {...yAxis} />
        <lineBasicMaterial attach="material" color={color} />
      </line>
      {labels.map((label, index) => (
        <mesh key={index} position={label.position} rotation={label.rotation} >
          <textGeometry
            args={[label.text, { font, size: 0.5, depth: 0.02 }]}
          />
          <meshStandardMaterial color="black" />
        </mesh>
      ))}
    </>
  );
}

export default YAxis;