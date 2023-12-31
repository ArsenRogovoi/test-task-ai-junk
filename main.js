import AnimationWindow from "./modules/animationWindowModel.js";
import Entity from "./modules/entityModel.js";
import listenToBtn from "./modules/listenToBtn.js";

const ENTITY_FIXED_SIZE = 50;
const ENTITY_STEP = 20;

const animationWindowEl = document.getElementById("animation-window");
const animationWindowObj = new AnimationWindow(animationWindowEl);

const handleKeyboardEvents = () => {
  document.addEventListener("keydown", (event) => {
    const focusedEntity = animationWindowObj.getFocusedEntity();
    if (focusedEntity) {
      switch (event.key) {
        case "ArrowUp":
          focusedEntity.moveUp(animationWindowObj.entities);
          break;
        case "ArrowDown":
          focusedEntity.moveDown(animationWindowObj.entities);
          break;
        case "ArrowLeft":
          focusedEntity.moveLeft(animationWindowObj.entities);
          break;
        case "ArrowRight":
          focusedEntity.moveRight(animationWindowObj.entities);
          break;
        default:
          break;
      }
    }
  });
};

//handleLoadingImg gets loaded image element and create entity
//instance. Adds this instance to animation window instance and
//set focus on it.
const handleLoadingImg = (image) => {
  const entity = new Entity(
    image,
    ENTITY_FIXED_SIZE,
    ENTITY_STEP,
    animationWindowEl
  );
  const added = animationWindowObj.addEntity(entity);
  if (!added) {
    alert("there is not space in animation window!");
  } else {
    image.addEventListener("click", () => {
      animationWindowObj.setFocusedEntity(+image.id);
    });
  }
};

//In moment that DOM has loaded we runs listenToBtn module
//and add 'keydown' event on document object.
document.addEventListener("DOMContentLoaded", () => {
  listenToBtn();
  handleKeyboardEvents();
});

export default handleLoadingImg;
