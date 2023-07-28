import handleLoadingImg from "../main.js";

const listenToBtn = () => {
  const addEntityButton = document.getElementById("add-entity-button");
  const imageInput = document.getElementById("entity-image-input");

  addEntityButton.addEventListener("click", () => {
    imageInput.click();
  });

  imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          handleLoadingImg(image);
        };
      };

      reader.onerror = function () {
        alert("Error in reading file: ", reader.error);
      };

      reader.readAsDataURL(file);
    } else {
      alert("Choosen file is not an image!");
    }
    imageInput.value = null;
  });
};
export default listenToBtn;
