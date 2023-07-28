class Entity {
  constructor(image, entitySize, entityStep, animationWindowEl) {
    this.id = undefined;
    this.image = image;
    this.image.style.width = `${entitySize}px`;
    this.image.style.height = `${entitySize}px`;
    this.image.style.position = "absolute";
    this.step = entityStep;
    this.entitySize = entitySize;
    this.animationWindowEl = animationWindowEl;
    this.location = undefined;
  }

  changeId(id) {
    this.id = id;
    this.image.id = id;
  }

  initiateLocation(location) {
    this.location = location;
    this.image.style.left = `${location.x}px`;
    this.image.style.top = `${location.y}px`;
  }

  changeLocation(location) {
    this.location = location;
    this.image.style.left = `${location.x}px`;
    this.image.style.top = `${location.y}px`;
    const imageEl = document.getElementById(`${this.image.id}`);
    imageEl.style.left = `${location.x}px`;
    imageEl.style.top = `${location.y}px`;
  }

  moveUp(allEntities) {
    const entitiesOnMyWay = [];
    let entityOnMyWay = undefined;

    //add to entitiesOnMyWay all the entities that focused entity can collision with them
    allEntities.forEach((ent) => {
      if (ent.id !== this.id) {
        if (
          (ent.location.x <= this.location.x &&
            this.location.x <= ent.location.x + ent.entitySize &&
            ent.location.y <= this.location.y - this.step &&
            this.location.y - this.step <= ent.location.y + ent.entitySize) ||
          (ent.location.x <= this.location.x + this.entitySize &&
            this.location.x + this.entitySize <=
              ent.location.x + ent.entitySize &&
            ent.location.y <= this.location.y - this.step &&
            this.location.y - this.step <= ent.location.y + ent.entitySize)
        ) {
          entitiesOnMyWay.push(ent);
        }
      }
    });

    //check which entity closer to focused entity
    if (entitiesOnMyWay.length) {
      entityOnMyWay = entitiesOnMyWay[0];
      entitiesOnMyWay.forEach((ent) => {
        if (ent.location.y > entityOnMyWay.location.y) entityOnMyWay = ent;
      });
    }

    //if I have an entity on focused entity way I will move to him with collision animation
    if (entityOnMyWay) {
      this.location.y = entityOnMyWay.location.y + this.entitySize + 1;
      this.updateImagePosition();
      this.image.classList.add("collision-animation");
      setTimeout(() => {
        this.image.classList.remove("collision-animation");
      }, 500);
    } else {
      //if there is the border of animation window we collision in the border with collision animation
      if (this.location.y - this.step < 0) {
        this.location.y = 0;
        this.updateImagePosition();
        this.image.classList.add("collision-animation");
        setTimeout(() => {
          this.image.classList.remove("collision-animation");
        }, 500);
      } else {
        // if there is not other entity or border in focused entity way, we just move it up
        this.location.y -= this.step;
        this.updateImagePosition();
      }
    }
  }

  moveDown(allEntities) {
    const entitiesOnMyWay = [];
    let entityOnMyWay = undefined;

    //add to entitiesOnMyWay all the entities that focused entity can collision with them
    allEntities.forEach((ent) => {
      if (ent.id !== this.id) {
        if (
          (ent.location.x <= this.location.x &&
            this.location.x <= ent.location.x + ent.entitySize &&
            ent.location.y <= this.location.y + this.step + this.entitySize &&
            this.location.y + this.step + this.entitySize <=
              ent.location.y + ent.entitySize) ||
          (ent.location.x <= this.location.x + this.entitySize &&
            this.location.x + this.entitySize <=
              ent.location.x + ent.entitySize &&
            ent.location.y <= this.location.y + this.step + this.entitySize &&
            this.location.y + this.step + this.entitySize <=
              ent.location.y + ent.entitySize)
        ) {
          entitiesOnMyWay.push(ent);
        }
      }
    });

    //check which entity closer to focused entity
    if (entitiesOnMyWay.length) {
      entityOnMyWay = entitiesOnMyWay[0];
      entitiesOnMyWay.forEach((ent) => {
        if (ent.location.y < entityOnMyWay.location.y) entityOnMyWay = ent;
      });
    }

    //if I have an entity on focused entity way I will move to him with collision animation
    if (entityOnMyWay) {
      this.location.y = entityOnMyWay.location.y - this.entitySize - 1;
      this.updateImagePosition();
      this.image.classList.add("collision-animation");
      setTimeout(() => {
        this.image.classList.remove("collision-animation");
      }, 500);
    } else {
      //if there is the border of animation window we collision in the border with collision animation
      if (
        this.location.y + this.step >
        this.animationWindowEl.clientHeight - parseInt(this.image.style.height)
      ) {
        this.location.y =
          this.animationWindowEl.clientHeight -
          parseInt(this.image.style.height);
        this.updateImagePosition();
        this.image.classList.add("collision-animation");
        setTimeout(() => {
          this.image.classList.remove("collision-animation");
        }, 500);
      } else {
        // if there is not other entity or border in focused entity way, we just move it down
        this.location.y += this.step;
        this.updateImagePosition();
      }
    }
  }

  moveLeft(allEntities) {
    const entitiesOnMyWay = [];
    let entityOnMyWay = undefined;

    //add to entitiesOnMyWay all the entities that focused entity can collision with them
    allEntities.forEach((ent) => {
      if (ent.id !== this.id) {
        if (
          (ent.location.x <= this.location.x - this.step &&
            this.location.x - this.step <= ent.location.x + ent.entitySize &&
            ent.location.y <= this.location.y &&
            this.location.y <= ent.location.y + ent.entitySize) ||
          (ent.location.x <= this.location.x - this.step &&
            this.location.x - this.step <= ent.location.x + ent.entitySize &&
            ent.location.y <= this.location.y + this.entitySize &&
            this.location.y + this.entitySize <=
              ent.location.y + ent.entitySize)
        ) {
          entitiesOnMyWay.push(ent);
        }
      }
    });

    //check which entity closer to focused entity
    if (entitiesOnMyWay.length) {
      entityOnMyWay = entitiesOnMyWay[0];
      entitiesOnMyWay.forEach((ent) => {
        if (ent.location.x > entityOnMyWay.location.x) entityOnMyWay = ent;
      });
    }

    //if I have an entity on focused entity way I will move to him with collision animation
    if (entityOnMyWay) {
      this.location.x = entityOnMyWay.location.x + this.entitySize + 1;
      this.updateImagePosition();
      this.image.classList.add("collision-animation");
      setTimeout(() => {
        this.image.classList.remove("collision-animation");
      }, 500);
    } else {
      //if there is the border of animation window we collision in the border with collision animation
      if (this.location.x - this.step < 0) {
        this.location.x = 0;
        this.updateImagePosition();
        this.image.classList.add("collision-animation");
        setTimeout(() => {
          this.image.classList.remove("collision-animation");
        }, 500);
      } else {
        // if there is not other entity or border in focused entity way, we just move it left
        this.location.x -= this.step;
        this.updateImagePosition();
      }
    }
  }

  moveRight(allEntities) {
    const entitiesOnMyWay = [];
    let entityOnMyWay = undefined;

    //add to entitiesOnMyWay all the entities that focused entity can collision with them
    allEntities.forEach((ent) => {
      if (ent.id !== this.id) {
        if (
          (ent.location.x <= this.location.x + this.entitySize + this.step &&
            this.location.x + this.entitySize + this.step <=
              ent.location.x + ent.entitySize &&
            ent.location.y <= this.location.y &&
            this.location.y <= ent.location.y + ent.entitySize) ||
          (ent.location.x <= this.location.x + this.entitySize + this.step &&
            this.location.x + this.entitySize + this.step <=
              ent.location.x + ent.entitySize &&
            ent.location.y <= this.location.y + this.entitySize &&
            this.location.y + this.entitySize <=
              ent.location.y + ent.entitySize)
        ) {
          entitiesOnMyWay.push(ent);
        }
      }
    });

    //check which entity closer to focused entity
    if (entitiesOnMyWay.length) {
      entityOnMyWay = entitiesOnMyWay[0];
      entitiesOnMyWay.forEach((ent) => {
        if (ent.location.x < entityOnMyWay.location.x) entityOnMyWay = ent;
      });
    }

    //if I have an entity on focused entity way I will move to him with collision animation
    if (entityOnMyWay) {
      this.location.x = entityOnMyWay.location.x - this.entitySize - 1;
      this.updateImagePosition();
      this.image.classList.add("collision-animation");
      setTimeout(() => {
        this.image.classList.remove("collision-animation");
      }, 500);
    } else {
      //if there is the border of animation window we collision in the border with collision animation
      if (
        this.location.x + this.step >
        this.animationWindowEl.clientWidth - parseInt(this.image.style.width)
      ) {
        this.location.x =
          this.animationWindowEl.clientWidth - parseInt(this.image.style.width);
        this.updateImagePosition();
        this.image.classList.add("collision-animation");
        setTimeout(() => {
          this.image.classList.remove("collision-animation");
        }, 500);
      } else {
        // if there is not other entity or border in focused entity way, we just move it right
        this.location.x += this.step;
        this.updateImagePosition();
      }
    }
  }

  updateImagePosition() {
    this.image.style.left = `${this.location.x}px`;
    this.image.style.top = `${this.location.y}px`;
  }
}

export default Entity;
