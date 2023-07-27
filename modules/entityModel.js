class Entity {
  constructor(image, entitySize, entityStep) {
    this.id = undefined;
    this.image = image;
    this.image.width = entitySize;
    this.image.height = entitySize;
    this.image.style.position = "absolute";
    this.step = entityStep;
    this.location = undefined;
  }
  changeLocation(location) {
    this.location = location;
    this.image.style.left = `${location.x}px`;
    this.image.style.top = `${location.y}px`;
  }
  changeId(id) {
    this.id = id;
    this.image.id = id;
  }
}

export default Entity;
