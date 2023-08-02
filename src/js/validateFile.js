const validateFile = (fieldFile, obj) => {
  const handleActiveFileField = () => {
    const btnCancel = fieldFile.querySelector(".container-btn-cancel button");

    fieldFile.addEventListener("change", (e) => {
      handleImgSelected(fieldFile, e);
    });

    btnCancel.addEventListener("click", (e) => {
      fieldFile.querySelector("input").value = "";
      fieldFile.classList.remove("img-selected");
    });
  };

  const handleImgSelected = async (field, e) => {
    const resolutionImg = await checkResolutionImage(field, e);
    const formatImg = await checkformatImage(field, e);
    const sizeImg = await checkSizeImage(field, e);
    const error = field.querySelector("#file-message-error");

    if (!formatImg) {
      error.innerText = "Verifique o formato da imagem.";

      obj[fieldFile.dataset.js] = {
        ...obj[field.dataset.js],
        value: "",
        error: true,
      };

      return;
    }

    if (!resolutionImg) {
      error.innerText = "Verifique o tamanho em PX da imagem.";

      obj[fieldFile.dataset.js] = {
        ...obj[field.dataset.js],
        value: "",
        error: true,
      };

      return;
    }

    if (!sizeImg) {
      error.innerText = "Verifique o tamanho em MB da imagem.";

      obj[fieldFile.dataset.js] = {
        ...obj[field.dataset.js],
        value: "",
        error: true,
      };

      return;
    }

    let imgPreview = field.querySelector(
      ".container-input-img-selected #image_preview"
    );
    let nameImg = field.querySelector(".name-img");

    let reader = new FileReader();
    reader.onload = function (result) {
      imgPreview.src = result.target.result;
      field.classList.add("img-selected");
      nameImg.innerText = e.srcElement.files[0].name;
    };

    reader.readAsDataURL(e.srcElement.files[0]);

    obj[fieldFile.dataset.js] = {
      ...obj[field.dataset.js],
      value: e.srcElement.files[0],
      error: false,
    };

    error.innerText = "";
  };

  const checkResolutionImage = (field, file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = function () {
        const sizeImg = img.width + "x" + img.height;
        let isSvg = file.type.includes("svg");
        if (isSvg || field.dataset.resolution === "") {
          resolve(true);
          return;
        }
        resolve(sizeImg === field.dataset.resolution);
        return;
      };
      img.src = URL.createObjectURL(file.srcElement.files[0]);
    });
  };
  const checkformatImage = (field, file) => {
    const formatFile = file.srcElement.files[0].type;
    let acceptedFormats = field
      .querySelector("input")
      .accept.replace(/\s/g, "")
      .split(",");
    if (acceptedFormats.includes(formatFile)) return true;
    return false;
  };
  const checkSizeImage = (field, file) => {
    const sizeFile = file.srcElement.files[0].size;
    if (sizeFile <= 1024 * 1024 * field.dataset.sizeimg) return true;
    return false;
  };
  handleActiveFileField();
};

export default validateFile;
