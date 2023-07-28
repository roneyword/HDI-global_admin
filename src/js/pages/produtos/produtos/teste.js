const isActiveLanguage = () => {
  const buttonLanguage = document.querySelectorAll(".content-language button");

  const handleActiveLanguage = () => {
    buttonLanguage.forEach((language) => {
      language.addEventListener("click", () => {
        onDesactiveLaguage();
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

// validação dos inputs
let valuesInput = {
  category: {
    value: "",
    error: true,
    referenceError: "",
  },
  linkPage: {
    value: "",
    error: true,
    referenceError: "",
  },
  nameProduct: {
    value: "",
    error: true,
    referenceError: "",
  },
  description: {
    value: "",
    error: true,
    referenceError: "",
  },
  imgPrincipal: {
    value: "",
    error: true,
    referenceError: "",
  },
  altImg: {
    value: "",
    error: true,
    referenceError: "",
  },
  imgSecondary: {
    value: "",
    error: true,
    referenceError: "",
  },
  altImgSecondary: {
    value: "",
    error: true,
    referenceError: "",
  },
  linkBtn: {
    value: "",
    error: true,
    referenceError: "",
  },
  btnCallToActionHeader: {
    value: "",
    error: true,
    referenceError: "",
  },
  descriptionHowTo: {
    value: "",
    error: true,
    referenceError: "",
  },
  benefitsOne: {
    value: "",
    error: true,
    referenceError: "",
  },
  benefitsTwo: {
    value: "",
    error: true,
    referenceError: "",
  },
  benefitsThree: {
    value: "",
    error: true,
    referenceError: "",
  },
};

let basicCoverage = [
  {
    nameCoverage: {
      value: "",
      error: true,
      referenceError: "",
    },
    iconCoverage: {
      value: "",
      error: true,
      referenceError: "",
    },
  },
];

let additionalBasic = [
  {
    nameCoverage: {
      value: "",
      error: true,
      referenceError: "",
    },
    iconCoverage: {
      value: "",
      error: true,
      referenceError: "",
    },
  },
];

const validateMinCaracter = (field, obj, min = 3, index = null) => {
  const input = field.querySelector("input") || field.querySelector("textarea");

  input.addEventListener("keyup", (e) => {
    if (e.target.value.trim().length < min) {
      field.classList.add("error");

      if (index !== null) {
        console.log(index);
        // obj[index] = {
        //   ...obj[index],
        //   [field.dataset.name]: {
        //     value: e.target.value,
        //     error: true,
        //   },
        // };

        obj[index][field.dataset.name] = {
          value: e.target.value,
          error: true,
        };

        return;
      }

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

const onGetReference = (referecent) => {
  valuesInput[referecent.dataset.js].referenceError = referecent;
};

const onValidationInputs = () => {
  const inputsValues = document.querySelectorAll("[data-js]");

  inputsValues.forEach((input) => {
    onGetReference(input);
    input.dataset.js === "category" && validateSelect(input, valuesInput);

    input.dataset.js === "linkPage" &&
      validateMinCaracter(input, valuesInput, 3);

    input.dataset.js === "nameProduct" &&
      validateMinCaracter(input, valuesInput, 3);

    input.dataset.js === "description" &&
      validateMinCaracter(input, valuesInput, 10);

    input.dataset.js === "imgPrincipal" && validateFile(input, valuesInput);

    input.dataset.js === "altImg" &&
      validateMinCaracter(input, valuesInput, 10);

    input.dataset.js === "imgSecondary" && validateFile(input, valuesInput);

    input.dataset.js === "altImgSecondary" &&
      validateMinCaracter(input, valuesInput, 10);

    input.dataset.js === "linkBtn" &&
      validateMinCaracter(input, valuesInput, 3);

    input.dataset.js === "btnCallToActionHeader" &&
      validateSelect(input, valuesInput);

    input.dataset.js === "descriptionHowTo" &&
      validateMinCaracter(input, valuesInput, 10);

    input.dataset.js === "benefitsOne" && validateSelect(input, valuesInput);

    input.dataset.js === "benefitsTwo" && validateSelect(input, valuesInput);

    input.dataset.js === "benefitsThree" && validateSelect(input, valuesInput);
  });
};

const handleSubmite = (obj) => {
  const btnSubmite = document.querySelector(".content-footer button");

  btnSubmite.addEventListener("click", () => {
    const hasErrorTrue = (obj) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key].error === true) {
          return true;
        }
      }
      return false;
    };

    const showErroView = (obj) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key].error === true) {
          obj[key].referenceError.classList.add("error");
        }
      }
    };

    showErroView(obj);
    if (hasErrorTrue(obj)) {
      // não pode validar
    } else {
      // pode validar
    }
  });
};

onValidationInputs();
handleSubmite(valuesInput);

// -------------------- validações dos itens dinamicos teste -------------------
const groupAdditionalBasic = document.querySelector(
  "[data-group='additionalBasic']"
);

const groupAdditionalCoverages = document.querySelector(
  "[data-group='additionalCoverages']"
);

const onValidationDinamicInputs = (group, array) => {
  const buttonAdd = group.querySelector(
    ".card__container .card__controler__add"
  );

  const buttonClose = group.querySelector(
    ".card__container .card__controler__close"
  );

  const cardsCreate = [1];

  const createCloneCard = () => group.querySelector(".card").innerHTML;
  const clonedCard = createCloneCard();

  const onHideButton = () => {
    const cardList = group.querySelectorAll(".card");

    cardList.forEach((card, index) => {
      if (cardList.length === 1) {
        card.querySelector(".card__controler__add").classList.remove("d-none");
        card.querySelector(".card__controler__close").classList.add("d-none");
        return;
      }

      if (index !== cardList.length - 1) {
        card.querySelector(".card__controler__add").classList.add("d-none");
      }

      if (index === cardList.length - 1) {
        card.querySelector(".card__controler__add").classList.remove("d-none");
      }

      card.querySelector(".card__controler__close").classList.remove("d-none");
    });
  };

  const toUpdateEvent = () => {
    const cardList = group.querySelectorAll(".card");
    const lastButtonAdd = cardList[cardList.length - 1].querySelector(
      ".card__container .card__controler__add"
    );

    lastButtonAdd.addEventListener("click", insertNewCardOnHTML);
  };

  const handleCloseCard = (card, index) => {
    const i = index - 1 === -1 ? 0 : index;
    card.remove();
    onHideButton();
    onRemoveItemArray(i);
    console.log(i);
    console.log(array);
  };

  const onAddItemArray = () => {
    array.push({
      nameCoverage: {
        value: "",
        error: true,
        referenceError: "",
      },
      iconCoverage: {
        value: "",
        error: true,
        referenceError: "",
      },
    });
  };

  const onRemoveItemArray = (index) => array.splice(index - 1, 1);

  const onValidationInputs = () => {
    const cards = group.querySelectorAll(".card");

    cards.forEach((card, index) => {
      const item = card.querySelectorAll("[data-validation]");

      item.forEach((input) => {
        validateMinCaracter(input, array, 10, index);
      });
    });
  };

  const insertNewCardOnHTML = () => {
    const newElement = document.createElement("div");
    newElement.innerHTML = clonedCard;
    newElement.classList.add("card");
    group.appendChild(newElement);

    onHideButton();
    toUpdateEvent();
    onValidationInputs();
    onAddItemArray();

    newElement
      .querySelector(".card__controler__close")
      .addEventListener("click", () =>
        handleCloseCard(newElement, array.length)
      );
  };

  // initial
  buttonAdd.addEventListener("click", insertNewCardOnHTML);
  buttonClose.addEventListener("click", () =>
    handleCloseCard(group.querySelector(".card"), 0)
  );

  // onValidationInputs();
};

onValidationDinamicInputs(groupAdditionalBasic, basicCoverage);
// onValidationDinamicInputs(groupAdditionalCoverages, additionalBasic);
