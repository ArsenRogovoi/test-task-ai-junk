const useImagesOfEntities = () => {
  const imagesOfEntities = [];

  const addEntityButton = document.getElementById("add-entity-button");
  const imageInput = document.getElementById("entity-image-input");
  const animationWindow = document.getElementById("animation-window");

  addEntityButton.addEventListener("click", () => {
    imageInput.click();
  });

  imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const image = new Image();
        image.width = 98;
        image.height = 98;
        image.src = e.target.result;
        image.onload = () => {
          console.log("Choosen image:", image.src);
          imagesOfEntities.push(image);
          console.log(imagesOfEntities);
          animationWindow.appendChild(image);
        };
      };

      reader.onerror = function () {
        alert("Error in reading file: ", reader.error);
      };

      //   reading choosen file as URL, for getting his source
      reader.readAsDataURL(file);
    } else {
      alert("Choosen file is not an image!");
    }
    imageInput.value = null;
  });

  return { imagesOfEntities };
};
export default useImagesOfEntities;
