import * as THREE from "three";

export default (size) => {
  // Create geometry with detail level 3
  const geometry = new THREE.DodecahedronGeometry(size, 3);

  // Get the position attribute
  const positionAttribute = geometry.attributes.position;

  // Modify each vertex position
  for (let i = 0; i < positionAttribute.count; i++) {
    // Get current position
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    const z = positionAttribute.getZ(i);

    // Apply random displacement (smaller than original for better results)
    positionAttribute.setXYZ(
      i,
      x + (Math.random() - 0.5) * (size / 100),
      y + (Math.random() - 0.5) * (size / 100),
      z + (Math.random() - 0.5) * (size / 100)
    );
  }

  // Update the geometry
  positionAttribute.needsUpdate = true;
  geometry.computeVertexNormals(); // Important for proper lighting

  // Create material
  const material = new THREE.MeshStandardMaterial({
    flatShading: true,
  });

  // Create mesh
  const globe = new THREE.Mesh(geometry, material);
  globe.castShadow = true;
  globe.receiveShadow = true;
  globe.position.set(0, 0, 0);

  return globe;
};
