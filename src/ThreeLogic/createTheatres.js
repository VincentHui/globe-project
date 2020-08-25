import * as THREE from "three";
import createLine from "./createLine";
const AnchorGeometry = new THREE.BoxGeometry(2, 2, 2);
const AnchorMaterial = new THREE.MeshStandardMaterial({ color: 0x80f2ff });
export default (data) => {
  const Theatres = [];
  for (let index = 0; index < data.length; index += 500) {
    const element = data[index];
    if (!element) continue;
    var theatre = new THREE.Mesh(AnchorGeometry, AnchorMaterial);
    theatre.position.copy(data[index].pos).multiplyScalar(0.5);
    theatre.lookAt(0, 0, 0);
    theatre.castShadow = true;
    theatre.receiveShadow = true;
    theatre.name = index;
    theatre.attach(createLine(data[index].pos));
    Theatres.push(theatre);
  }
  return Theatres;
};
