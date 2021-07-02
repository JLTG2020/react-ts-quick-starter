// import React, { useContext, useRef, useState } from 'react';
// import Header from 'Components/Header';
// import './App.scss';
// // import '@babylonjs/core/Physics/physicsEngineComponent'; // side-effect adds scene.enablePhysics function

// // import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins';
// // import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
// // import { Vector3 } from '@babylonjs/core/Maths/math.vector';
// // import { Nullable } from '@babylonjs/core/types';
// // import { Mesh } from '@babylonjs/core/Meshes/mesh';
// // import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor';
// // import { Color3 } from '@babylonjs/core/Maths/math.color';
// // import { FresnelParameters } from '@babylonjs/core/Materials/fresnelParameters';
// // import { Texture } from '@babylonjs/core/Materials/Textures/texture';

// import BABYLON, { Vector3, Nullable, Mesh } from '@babylonjs/core';
// import { Engine, Scene, useBeforeRender, useClick, useHover } from 'react-babylonjs'
// import CANNON from 'cannon';

// const DefaultScale = new Vector3(1, 1, 1);
// const BiggerScale = new Vector3(1.25, 1.25, 1.25);

// window.CANNON = CANNON;

// const gravityVector = new Vector3(0, -9.81, 0);

// interface IProps {
//   name: string;
//   age: number;
// }

// function CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
//   // This creates a basic Babylon Scene object (non-mesh)
//   var scene = new BABYLON.Scene(engine);

//   // This creates and positions a free camera (non-mesh)
//   var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

//   // This targets the camera to scene origin
//   camera.setTarget(BABYLON.Vector3.Zero());

//   // This attaches the camera to the canvas
//   camera.attachControl(canvas, true);

//   // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
//   var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

//   // Default intensity is 1. Let's dim the light a small amount
//   light.intensity = 0.7;

//   // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
//   var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

//   // Move the sphere upward 1/2 its height
//   sphere.position.y = 1;

//   // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
//   var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

//   return scene;
// }

// function App(props: IProps) {
//   const sphereRef = useRef<Nullable<Mesh>>();

//   const onButtonClicked = () => {
//     if (sphereRef.current) {
//       sphereRef.current.physicsImpostor!.applyImpulse(Vector3.Up().scale(10), sphereRef.current.getAbsolutePosition());
//     }
//   };

//   const [fontsReady, setFontsReady] = useState(false);
//   const faLoaded = useRef(false);
//   const { name, age } = props;

//   return (
//     <div className='app'>
//       <Header />
//       <span>{`Hello! I'm ${name}, ${age} yearssss old.`}</span>
//       <header className='App-header'></header>
//     </div>
//   );
// }

// export default App;

import React, { useState, useRef } from 'react';

import '@babylonjs/core/Physics/physicsEngineComponent'; // side-effect adds scene.enablePhysics function

import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Nullable } from '@babylonjs/core/types';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { FresnelParameters } from '@babylonjs/core/Materials/fresnelParameters';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';

import { Scene, Engine } from 'react-babylonjs';
import './App.css';

import * as CANNON from 'cannon';

import { SceneWithSpinningBoxes } from './test';

window.CANNON = CANNON;

const gravityVector = new Vector3(0, -9.81, 0);

const App: React.FC = () => {
  const sphereRef = useRef<Nullable<Mesh>>();

  const onButtonClicked = () => {
    if (sphereRef.current) {
      sphereRef.current.physicsImpostor!.applyImpulse(Vector3.Up().scale(10), sphereRef.current.getAbsolutePosition());
    }
  };

  const [fontsReady, setFontsReady] = useState(false);
  const adtRef = useRef<AdvancedDynamicTexture | null>(null);
  const faLoaded = useRef(false);

  return (
    <div className='App'>
      <header className='App-header'>
        <p>@babylonjs + `react-babylonjs`</p>
        <SceneWithSpinningBoxes />
        {/* <Engine antialias adaptToDeviceRatio canvasId='sample-canvas'>
          <Scene enablePhysics={[gravityVector, new CannonJSPlugin()]}>
            <arcRotateCamera
              name='arc'
              target={new Vector3(0, 1, 0)}
              alpha={-Math.PI / 2}
              beta={0.5 + Math.PI / 4}
              radius={4}
              minZ={0.001}
              wheelPrecision={50}
              lowerRadiusLimit={8}
              upperRadiusLimit={20}
              upperBetaLimit={Math.PI / 2}
            />
            <hemisphericLight name='hemi' direction={new Vector3(0, -1, 0)} intensity={0.8} />
            <directionalLight
              name='shadow-light'
              setDirectionToTarget={[Vector3.Zero()]}
              direction={Vector3.Zero()}
              position={new Vector3(-40, 30, -40)}
              intensity={0.4}
              shadowMinZ={1}
              shadowMaxZ={2500}
            >
              <shadowGenerator
                mapSize={1024}
                useBlurExponentialShadowMap
                blurKernel={32}
                darkness={0.8}
                shadowCasters={['sphere1', 'dialog']}
                forceBackFacesOnly
                depthScale={100}
              />
            </directionalLight>
            <sphere ref={sphereRef} name='sphere1' diameter={2} segments={16} position={new Vector3(0, 1.5, 0)}>
              <physicsImpostor type={PhysicsImpostor.SphereImpostor} _options={{ mass: 1, restitution: 0.9 }} />
              <standardMaterial
                name='material1'
                specularPower={16}
                diffuseColor={Color3.Black()}
                emissiveColor={new Color3(0.5, 0.5, 0.5)}
                reflectionFresnelParameters={FresnelParameters.Parse({
                  isEnabled: true,
                  leftColor: [1, 1, 1],
                  rightColor: [0, 0, 0],
                  bias: 0.1,
                  power: 1,
                })}
              />
              <plane name='dialog' size={2} position={new Vector3(0, 1.5, 0)} sideOrientation={Mesh.BACKSIDE}>
                <advancedDynamicTexture
                  name='dialogTexture'
                  ref={adtRef}
                  height={1024}
                  width={1024}
                  createForParentMesh
                  hasAlpha
                  generateMipMaps
                  samplingMode={Texture.TRILINEAR_SAMPLINGMODE}
                >
                  <rectangle name='rect-1' height={0.5} width={1} thickness={12} cornerRadius={12}>
                    <rectangle>
                      <babylon-button name='close-icon' background='green' onPointerDownObservable={onButtonClicked}>
                        <textBlock
                          text={`${fontsReady ? '\uF00D' : 'X'} click me`}
                          fontFamily='FontAwesome'
                          fontStyle='bold'
                          fontSize={200}
                          color='white'
                        />
                      </babylon-button>
                    </rectangle>
                  </rectangle>
                </advancedDynamicTexture>
              </plane>
            </sphere>

            <ground name='ground1' width={10} height={10} subdivisions={2} receiveShadows>
              <physicsImpostor type={PhysicsImpostor.BoxImpostor} _options={{ mass: 0, restitution: 0.9 }} />
            </ground>
            <vrExperienceHelper webVROptions={{ createDeviceOrientationCamera: false }} enableInteractions />
          </Scene>
        </Engine> */}
      </header>
    </div>
  );
};
export default App;
