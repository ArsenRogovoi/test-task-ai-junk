import AnimationWindow from "./modules/animationWindowModel.js";
import Entity from "./modules/entityModel.js";
import listenToBtn from "./modules/listenToBtn.js";

const ENTITY_FIXED_SIZE = 50;
const ENTITY_STEP = 20;

const animationWindowEl = document.getElementById("animation-window");
const animationWindowObj = new AnimationWindow(animationWindowEl);

listenToBtn();

const handleLoadingImg = (image) => {
  const entity = new Entity(image, ENTITY_FIXED_SIZE, ENTITY_STEP);
  const added = animationWindowObj.addEntity(entity);
  if (!added) {
    alert("there is not space in animation window!");
  }
};

export default handleLoadingImg;
