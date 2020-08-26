import React, { useEffect } from "react";
import createGlobe from "./ThreeLogic/createGlobe";
import createTheatres from "./ThreeLogic/createTheatres";
import getData from "./ThreeLogic/getData";
import makePointsFromData from "./ThreeLogic/createPointCloud";
import getLights from "./ThreeLogic/createLIghts";
import getPickingFunctions from "./ThreeLogic/pickingLogic";
import createControls from "./ThreeLogic/createControls";
import "./App.css";
import * as THREE from "three";
import { Popup } from "./popUp";

const makeRenderer = (camera) => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x3c3e4f);
  renderer.shadowMap.enabled = true;

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", onWindowResize, false);
  document.getElementById("root").appendChild(renderer.domElement);
  return renderer;
};

function App() {
  useEffect(() => {
    const data = getData();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 130;
    const renderer = makeRenderer(camera);
    const controls = createControls(camera, renderer.domElement);
    const CreatedTheatres = createTheatres(data);

    //add objects to scene
    CreatedTheatres.forEach((theatre) => scene.add(theatre));
    scene.add(makePointsFromData(data));
    getLights().forEach((light) => scene.add(light));
    const globe = createGlobe(50);
    scene.add(globe);

    const { onMouseMove, onMouseDown, onTouchStart } = getPickingFunctions(
      camera,
      CreatedTheatres,
      globe,
      data
    );
    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("mousedown", onMouseDown, false);
    window.addEventListener("touchstart", onTouchStart, false);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return (
    <div className="App">
      <Popup />
    </div>
  );
}

export default App;
