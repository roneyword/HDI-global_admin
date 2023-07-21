const isActiveLanguage = () => {
  const buttonLanguage = document.querySelectorAll(".content-language button");

  const handleActiveLanguage = () => {
    buttonLanguage.forEach((language) => {
      language.addEventListener("click", () => {
        onDesactiveLaguage();
        console.log(language.dataset.language);
        language.classList.add("isActive");
      });
    });
  };

  const onDesactiveLaguage = () => {
    buttonLanguage.forEach((language) => {
      language.classList.remove("isActive");
    });
  };

  handleActiveLanguage();
};
isActiveLanguage();

// teste de inputs
let valuesInput = {
  title: {
    value: "",
    error: true,
  },
  text: {
    value: "",
    error: true,
  },
  imgDesk: {
    value: "",
    error: true,
  },
  imgMobile: {
    value: "",
    error: true,
  },
  altImg: {
    value: "",
    error: true,
  },
  btnCallToAction: {
    value: "",
    error: true,
  },
  entryDate: {
    value: "",
    error: true,
  },
  exitDate: {
    value: "",
    error: true,
  },
  link: {
    value: "",
    error: true,
  },
  isExternal: {
    value: "",
    error: true,
  },
};

const validateMinCaracter = (field, type, obj, min = 3) => {
  const input = field.querySelector(type);

  input.addEventListener("keyup", (e) => {
    if (e.target.value.trim().length < min) {
      field.classList.add("error");

      obj[field.dataset.js] = {
        value: e.target.value,
        error: true,
      };

      return;
    }

    field.classList.remove("error");
    obj[field.dataset.js] = {
      value: e.target.value,
      error: false,
    };
  });
};

const validateSelect = (field, obj) => {
  const selectList = field.querySelectorAll(".select__field-list li");

  selectList.forEach((item) => {
    item.addEventListener("click", () => {
      obj[field.dataset.js] = {
        value: item.innerHTML,
        error: false,
      };
    });
  });
};

const validateCurrentDate = (field, obj) => {
  const inputEl = field.querySelector("input");

  inputEl.addEventListener("change", (e) => {
    const inputDate = new Date(
      inputEl.value.replace(/-/g, "/")
    ).toLocaleDateString();
    const newDate = new Date().toLocaleDateString();

    if (inputDate >= newDate) {
      field.classList.remove("error");
      obj[field.dataset.js] = {
        value: e.target.value,
        error: false,
      };
    } else {
      field.classList.add("error");
      obj[field.dataset.js] = {
        value: e.target.value,
        error: true,
      };
    }
  });
};

const validateExitDate = (field, initDate, obj) => {
  const inputEl = field.querySelector("input");

  inputEl.addEventListener("change", (e) => {
    const newDate = new Date(
      initDate.querySelector("input").value.replace(/-/g, "/")
    ).toLocaleDateString();

    const inputDate = new Date(
      inputEl.value.replace(/-/g, "/")
    ).toLocaleDateString();

    if (inputDate <= newDate) {
      field.classList.add("error");
      obj[field.dataset.js] = {
        value: e.target.value,
        error: true,
      };
    } else {
      field.classList.remove("error");
      obj[field.dataset.js] = {
        value: e.target.value,
        error: false,
      };
    }
  });
};

const isActiveExternalLink = (field, obj) => {
  const externalLink = field.querySelector("input");

  externalLink.addEventListener("click", (e) => {
    obj[field.dataset.js] = {
      value: e.target.checked,
      error: false,
    };
  });
};

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
        value: "",
        error: true,
      };

      return;
    }

    if (!resolutionImg) {
      error.innerText = "Verifique o tamanho em PX da imagem.";

      obj[fieldFile.dataset.js] = {
        value: "",
        error: true,
      };

      return;
    }

    if (!sizeImg) {
      error.innerText = "Verifique o tamanho em MB da imagem.";

      obj[fieldFile.dataset.js] = {
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

const onValidationInputs = () => {
  const inputsValues = document.querySelectorAll("[data-js]");

  inputsValues.forEach((input) => {
    input.dataset.js === "title" &&
      validateMinCaracter(input, "textarea", valuesInput, 10);
    input.dataset.js === "text" &&
      validateMinCaracter(input, "textarea", valuesInput, 10);

    input.dataset.js === "imgDesk" && validateFile(input, valuesInput);
    input.dataset.js === "imgMobile" && validateFile(input, valuesInput);

    input.dataset.js === "altImg" &&
      validateMinCaracter(input, "textarea", valuesInput, 10);
    input.dataset.js === "btnCallToAction" &&
      validateSelect(input, valuesInput);
    input.dataset.js === "entryDate" && validateCurrentDate(input, valuesInput);
    input.dataset.js === "exitDate" &&
      validateExitDate(
        input,
        document.querySelector('[data-js="entryDate"]'),
        valuesInput
      );
    input.dataset.js === "link" &&
      validateMinCaracter(input, "input", valuesInput, 3);
    input.dataset.js === "isExternal" &&
      isActiveExternalLink(input, valuesInput);
  });
};

const handleSubmite = (obj) => {
  const btnSubmite = document.querySelector(".content-footer button");

  btnSubmite.addEventListener("click", () => {
    console.log(obj);
    const hasErrorTrue = (obj) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key].error === true) {
          return true;
        }
      }
      return false;
    };

    if (hasErrorTrue(obj)) {
      // não pode validar
    } else {
      // pode validar
    }
  });
};

onValidationInputs();
handleSubmite(valuesInput);
