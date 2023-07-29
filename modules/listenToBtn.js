import handleLoadingImg from "../main.js";

const listenToBtn = () => {
  const addEntityButton = document.getElementById("add-entity-button");
  const imageInput = document.getElementById("entity-image-input");

  // on click on plus button we click on imageInput and now we able to choose image from PC
  addEntityButton.addEventListener("click", () => {
    imageInput.click();
  });

  // on changing image in our invisible input we runs event 'change'
  imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    // we check if file we choosed is an image
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      // after image has been loaded we create img element and pass it on handleLoadingImg in main.js
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          handleLoadingImg(image);
        };
      };

      // if we have an error we alert our user
      reader.onerror = function () {
        alert("Error in reading file: ", reader.error);
      };

      // readAsDataUrl reads the file and update 'result' property with data URL
      reader.readAsDataURL(file);
    } else {
      alert("Choosen file is not an image!");
    }
    imageInput.value = null;
  });
};
export default listenToBtn;
