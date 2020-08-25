import * as THREE from "three";
const lineVertexShader = `
varying vec3 vPos;
void main() 
{
  vPos = position;
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}
`;

const lineFragmentShader = `
uniform vec3 origin;
uniform vec3 color;
uniform float limitDistance;
varying vec3 vPos;

void main() {
  float distance = clamp(length(vPos - origin), 0., limitDistance);
  float opacity = 1. - distance / limitDistance;
  gl_FragColor = vec4(color, opacity);
}

`;
export default (endPos) => {
  const lineGeom = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(),
    endPos,
  ]);

  const rayLine = new THREE.Line(
    lineGeom,
    new THREE.ShaderMaterial({
      uniforms: {
        color: {
          value: new THREE.Color(0x80f2ff),
        },
        origin: {
          value: new THREE.Vector3(),
        },
        limitDistance: {
          value: 50 + Math.random() * 30,
        },
      },
      vertexShader: lineVertexShader,
      fragmentShader: lineFragmentShader,
      transparent: true,
    })
  );

  return rayLine;
};
