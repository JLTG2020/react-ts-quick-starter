import React from 'react';
import Header from 'Components/Header';
import './App.scss';
import { BABYLON, DefaultViewer } from 'babylonjs-viewer';

interface IProps {
  name: string;
  age: number;
}

function App(props: IProps) {
  const config = {
    extends: 'extended',
    configuration: './config.json',
    model: {
      url: 'https://babylonjs.com/Assets/FlightHelmet/glTF/FlightHelmet_Materials.gltf',
    },
    templates: {
      main: {
        params: {
          fillScreen: true,
        },
      },
    },
    lab: {
      assetsRootURL: '/external/msft/',
    },
  };

  const viewerElement = document.querySelector('#viewport');
  let dv;
  if (viewerElement !== null) {
    dv = new DefaultViewer(viewerElement, config);
  }
  const { name, age } = props;
  return (
    <div className='app'>
      <Header />
      <span>{`Hello! I'm ${name}, ${age} yearssss old.`}</span>
      <div>
        <div id='viewport' />
      </div>
    </div>
  );
}

export default App;
