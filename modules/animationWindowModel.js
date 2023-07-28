import { getRandomInt } from "./utils.js";

class AnimationWindow {
  constructor(animationWindowEl) {
    this.animationWindowEl = animationWindowEl;
    this.entities = [];
    this.focusedEntityId = undefined;
  }
  findFreeLocation(sizeOfEntity) {
    let c = 0;
    let foundLocation = undefined;
    while (!foundLocation && c <= 3000) {
      const left = getRandomInt(
        0,
        this.animationWindowEl.clientWidth - sizeOfEntity
      );
      const top = getRandomInt(
        0,
        this.animationWindowEl.clientHeight - sizeOfEntity
      );
      const intersection = this.entities.length
        ? this.entities.find((ent) => {
            if (
              (left <= ent.location.x &&
                ent.location.x <= left + sizeOfEntity &&
                top <= ent.location.y &&
                ent.location.y <= top + sizeOfEntity) ||
              (left <= ent.location.x &&
                ent.location.x <= left + sizeOfEntity &&
                top <= ent.location.y + ent.image.width &&
                ent.location.y + ent.image.width <= top + sizeOfEntity) ||
              (left <= ent.location.x + ent.image.width &&
                ent.location.x + ent.image.width <= left + sizeOfEntity &&
                top <= ent.location.y + ent.image.width &&
                ent.location.y + ent.image.width <= top + sizeOfEntity) ||
              (left <= ent.location.x + ent.image.width &&
                ent.location.x + ent.image.width <= left + sizeOfEntity &&
                top <= ent.location.y &&
                ent.location.y <= top + sizeOfEntity)
            )
              return ent;
          })
        : null;

      if (!intersection) {
        foundLocation = {
          x: left,
          y: top,
        };
      }
      c = c + 1;
    }
    return foundLocation;
  }
  addEntity(entity) {
    const freeLocation = this.findFreeLocation(entity.image.width);
    if (freeLocation) {
      entity.initiateLocation(freeLocation);
      entity.changeId(this.entities.length);
      this.focusedEntityId = this.entities.length;
      this.entities.push(entity);
      this.animationWindowEl.append(entity.image);
      return true;
    } else {
      return false;
    }
  }
  setFocusedEntity(entityId) {
    this.focusedEntityId = entityId;
  }
  getFocusedEntity() {
    if (typeof this.focusedEntityId === "number")
      return this.entities[this.focusedEntityId];
    return null;
  }
}
export default AnimationWindow;
