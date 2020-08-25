import * as THREE from "three";
export default (size) => {
  const geometry = new THREE.DodecahedronGeometry(size, 3);
  geometry.vertices.forEach(function (v) {
    v.x += 0 - Math.random() * (size / 50);
    v.y += 0 - Math.random() * (size / 50);
    v.z += 0 - Math.random() * (size / 50);
  });

  const texture = new THREE.MeshStandardMaterial({
    flatShading: true,
  });

  const globe = new THREE.Mesh(geometry, texture);
  globe.castShadow = true;
  globe.receiveShadow = true;
  globe.position.set(0, 0, 0);

  return globe;
};
