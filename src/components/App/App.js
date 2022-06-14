import GUIBuilder from '../GUIBuilder/GUIBuilder';

import React, {useState} from 'react';
import dynamicCodeGeneration from '../../assets/dynamic_code_generation.json';
import positionCalculator from '../../hooks/positionCalculator/positionCalculator';

function App() {

  const [positionObjects, setPositionObjects] = useState(positionCalculator(dynamicCodeGeneration));
  console.log(positionObjects);
  return (
    <div className="app">
      <GUIBuilder positionObjects={positionObjects} />
    </div>
  );
}

export default App;
