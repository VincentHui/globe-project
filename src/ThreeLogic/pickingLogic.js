import * as THREE from "three";
import { FireEvent } from "../broker";

export default (camera, Theatres, globe, data) => {
  let SelectedTheatre = undefined;
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const sphere = new THREE.Sphere(new THREE.Vector3(), 50);
  const MouseIntersects = new THREE.Vector3();
  const ObjectsToScan = Theatres.concat([globe]);
  const onMouseDown = (event) => {
    raycaster.setFromCamera(mouse, camera);

    const objects = raycaster.intersectObjects(ObjectsToScan);
    const unpick = () => {
      FireEvent("UNPICK_THEATRE");
      if (SelectedTheatre) SelectedTheatre.scale.set(1, 1, 1);
    };
    if (objects.length === 0) {
      unpick();
      return;
    }
    if (objects[0].object === globe) {
      unpick();
      return;
    }
    const meshObj = objects[0].object;
    if (SelectedTheatre) SelectedTheatre.scale.set(1, 1, 1);
    SelectedTheatre = meshObj;
    const theaterData = data[Number(meshObj.name)];
    meshObj.scale.set(2, 2, 6);
    FireEvent("PICK_THEATRE", [theaterData]);
  };

  const onMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectSphere(sphere, MouseIntersects);
  };
  return { onMouseDown, onMouseMove };
};
