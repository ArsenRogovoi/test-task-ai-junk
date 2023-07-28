class Entity {
  constructor(image, entitySize, entityStep, animationWindowEl) {
    this.id = undefined;
    this.image = image;
    // this.image.width = entitySize;
    // this.image.height = entitySize;
    this.image.style.width = `${entitySize}px`;
    this.image.style.height = `${entitySize}px`;
    this.image.style.position = "absolute";
    // this.image.style.boxSizing = "content-box";
    this.step = entityStep;
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

  moveUp() {
    if (this.location.y - this.step >= 0) {
      this.location.y -= this.step;
      this.updateImagePosition();
    }
  }

  moveDown() {
    if (
      this.location.y + this.step <=
      this.animationWindowEl.clientHeight - parseInt(this.image.style.height)
    ) {
      this.location.y += this.step;
      this.updateImagePosition();
    }
  }

  moveLeft() {
    if (this.location.x - this.step >= 0) {
      this.location.x -= this.step;
      this.updateImagePosition();
    }
  }

  moveRight() {
    if (
      this.location.x + this.step <=
      this.animationWindowEl.clientWidth - parseInt(this.image.style.width)
    ) {
      this.location.x += this.step;
      this.updateImagePosition();
    }
  }

  updateImagePosition() {
    this.image.style.left = `${this.location.x}px`;
    this.image.style.top = `${this.location.y}px`;
  }
}

export default Entity;
