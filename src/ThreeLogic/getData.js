import * as theatre from "../points.json";
import * as THREE from "three";
const lonLatToVector3 = (lng, lat, out) => {
  out = out || new THREE.Vector3();

  //flips the Y axis
  lat = Math.PI / 2 - lat;

  //distribute to sphere
  out.set(
    Math.sin(lat) * Math.sin(lng),
    Math.cos(lat),
    Math.sin(lat) * Math.cos(lng)
  );

  return out;
};
export default (scale = 100) =>
  theatre.default.map((item) => ({
    ...item,
    pos: lonLatToVector3(item.lat, item.lon).multiplyScalar(scale),
  }));
