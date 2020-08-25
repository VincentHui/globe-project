import * as THREE from "three";
export default () => {
  const Ambient = new THREE.AmbientLight(0x3c3e4f, 1.0);
  const DownwardsLight = new THREE.DirectionalLight(0xffa930, 1.0);
  DownwardsLight.position.set(0, 100, 0);
  DownwardsLight.castShadow = true;
  DownwardsLight.shadow.camera.far = 2000;
  const d = 50;
  DownwardsLight.shadow.camera.left = -d;
  DownwardsLight.shadow.camera.right = d;
  DownwardsLight.shadow.camera.top = d;
  DownwardsLight.shadow.camera.bottom = -d;

  const UpwardsLight = new THREE.DirectionalLight(0xff3300, 0.2);
  UpwardsLight.position.set(1, -1, 0);
  return [Ambient, DownwardsLight, UpwardsLight];
};
