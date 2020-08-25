import { OrbitControls } from "./orbitControl";
import { SubscribeEvent } from "../broker";
export default (camera, domElement) => {
  SubscribeEvent("UNPICK_THEATRE", () => (controls.autoRotate = true));
  SubscribeEvent("PICK_THEATRE", (theatre) => (controls.autoRotate = false));
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  return controls;
};
