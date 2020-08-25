import * as THREE from "three";
export default (points) => {
  const vertices = [];
  for (let i = 0; i < points.length; i++) {
    const { x, y, z } = points[i].pos;
    vertices.push(x, y, z);
  }
  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  var material = new THREE.PointsMaterial({ color: 0x888888, size: 0.05 });
  return new THREE.Points(geometry, material);
};
