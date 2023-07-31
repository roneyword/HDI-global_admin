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

let basicCoverage = {
  0: {
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
};

let additionalBasic = {
  0: {
    nameCoverage: {
      value: "",
      error: true,
      referenceError: "",
    },
  },
};

let assistance = {
  0: {
    nameAssistance: {
      value: "",
      error: true,
      referenceError: "",
    },
  },
};

let contractualConditions = {
  0: {
    title: {
      value: "",
      error: true,
      referenceError: "",
    },
    beginningValidity: {
      value: "",
      error: true,
      referenceError: "",
    },
    expirationDate: {
      value: "",
      error: true,
      referenceError: "",
    },
    isValidity: {
      value: "",
      error: false,
      referenceError: "",
    },
    iconCoverage: {
      value: "",
      error: true,
      referenceError: "",
    },
  },
};

const validateMinCaracter = (field, obj, min = 3, index = null) => {
  const input = field.querySelector("input") || field.querySelector("textarea");

  input.addEventListener("keyup", (e) => {
    if (e.target.value.trim().length < min) {
      field.classList.add("error");

      if (index !== null) {
        obj[index][field.dataset.name].value = e.target.value;
        obj[index][field.dataset.name].error = true;
        obj[index][field.dataset.name].referenceError = field;

        return;
      }

      obj[field.dataset.js] = {
        value: e.target.value,
        error: true,
      };

      return;
    }

    field.classList.remove("error");

    if (index !== null) {
      obj[index][field.dataset.name].value = e.target.value;
      obj[index][field.dataset.name].error = false;
      obj[index][field.dataset.name].referenceError = field;

      return;
    }

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

const validateFile = (fieldFile, obj, index = null) => {
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

      if (index !== null) {
        obj[index][field.dataset.name].value = e.target.value;
        obj[index][field.dataset.name].error = true;
        obj[index][field.dataset.name].referenceError = field;

        return;
      }

      obj[fieldFile.dataset.js] = {
        value: "",
        error: true,
      };

      return;
    }

    if (!resolutionImg) {
      error.innerText = "Verifique o tamanho em PX da imagem.";

      if (index !== null) {
        obj[index][field.dataset.name].value = e.target.value;
        obj[index][field.dataset.name].error = true;
        obj[index][field.dataset.name].referenceError = field;

        return;
      }

      obj[fieldFile.dataset.js] = {
        value: "",
        error: true,
      };

      return;
    }

    if (!sizeImg) {
      error.innerText = "Verifique o tamanho em MB da imagem.";

      if (index !== null) {
        obj[index][field.dataset.name].value = e.target.value;
        obj[index][field.dataset.name].error = true;
        obj[index][field.dataset.name].referenceError = field;

        return;
      }

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

    if (index !== null) {
      obj[index][field.dataset.name].value = e.target.value;
      obj[index][field.dataset.name].error = false;
      obj[index][field.dataset.name].referenceError = field;

      error.innerText = "";

      return;
    }

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

const validateCurrentDate = (field, obj, index = null) => {
  const inputEl = field.querySelector("input");

  inputEl.addEventListener("change", (e) => {
    const inputDate = new Date(
      inputEl.value.replace(/-/g, "/")
    ).toLocaleDateString();
    const newDate = new Date().toLocaleDateString();

    if (inputDate >= newDate) {
      field.classList.remove("error");

      if (index !== null) {
        obj[index][field.dataset.name].value = e.target.value;
        obj[index][field.dataset.name].error = false;
        obj[index][field.dataset.name].referenceError = field;

        return;
      }

      obj[field.dataset.js] = {
        value: e.target.value,
        error: false,
      };
    } else {
      field.classList.add("error");

      if (index !== null) {
        obj[index][field.dataset.name].value = e.target.value;
        obj[index][field.dataset.name].error = true;
        obj[index][field.dataset.name].referenceError = field;

        return;
      }

      obj[field.dataset.js] = {
        value: e.target.value,
        error: true,
      };
    }
  });
};

const validateExitDate = (field, initDate, obj, index = null) => {
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

      if (index !== null) {
        obj[index][field.dataset.name].value = e.target.value;
        obj[index][field.dataset.name].error = true;
        obj[index][field.dataset.name].referenceError = field;

        return;
      }

      obj[field.dataset.js] = {
        value: e.target.value,
        error: true,
      };
    } else {
      field.classList.remove("error");

      if (index !== null) {
        obj[index][field.dataset.name].value = e.target.value;
        obj[index][field.dataset.name].error = false;
        obj[index][field.dataset.name].referenceError = field;

        return;
      }

      obj[field.dataset.js] = {
        value: e.target.value,
        error: false,
      };
    }
  });
};

const isActiveExternalLink = (field, obj, index) => {
  const externalLink = field.querySelector("input");

  externalLink.addEventListener("click", (e) => {
    if (index !== null) {
      obj[index][field.dataset.name].value = e.target.checked;
      obj[index][field.dataset.name].error = false;
      obj[index][field.dataset.name].referenceError = field;

      return;
    }

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

onValidationInputs();

// -------------------- validações dos itens dinamicos teste -------------------
const groupAdditionalBasic = document.querySelector(
  "[data-group='additionalBasic']"
);

const groupAdditionalCoverages = document.querySelector(
  "[data-group='additionalCoverages']"
);

const groupAdditionalAssistance = document.querySelector(
  "[data-group='assistance']"
);

const groupContractualConditions = document.querySelector(
  "[data-group='contractualConditions']"
);

const onValidationDinamicInputs = (group, array) => {
  const buttonAdd = group.querySelector(
    ".card__container .card__controler__add"
  );

  const buttonClose = group.querySelector(
    ".card__container .card__controler__close"
  );

  const cardsCreate = [0];
  const copyArray = JSON.stringify(array[0]);

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

  const handleCloseCard = (card) => {
    cardsCreate.forEach((item, index) => {
      if (item == card.dataset.id) {
        cardsCreate.splice(index, 1);
      }
    });

    card.remove();
    onHideButton();
    onRemoveItemArray(card.dataset.id);
  };

  const onAddItemArray = () => {
    const lastAddItemId = cardsCreate[cardsCreate.length - 1];
    array[lastAddItemId] = {
      ...JSON.parse(copyArray),
    };
  };

  const onRemoveItemArray = (index) => delete array[index];

  const onValidationInputs = () => {
    const cards = group.querySelectorAll(".card");

    cards.forEach((card) => {
      const item = card.querySelectorAll("[data-validation]");

      item.forEach((input) => {
        if (input.dataset.validation === "min") {
          array[card.dataset.id][input.dataset.name].referenceError = input;
          validateMinCaracter(input, array, 10, card.dataset.id);
          return;
        }

        if (input.dataset.validation === "file") {
          array[card.dataset.id][input.dataset.name].referenceError = input;
          validateFile(input, array, card.dataset.id);
          return;
        }

        if (input.dataset.validation === "dateInit") {
          array[card.dataset.id][input.dataset.name].referenceError = input;
          validateCurrentDate(input, array, card.dataset.id);
          return;
        }

        if (input.dataset.validation === "dateFinish") {
          array[card.dataset.id][input.dataset.name].referenceError = input;
          validateExitDate(input, "2023-07-31", array, card.dataset.id);
          return;
        }

        if (input.dataset.validation === "isValidity") {
          array[card.dataset.id][input.dataset.name].referenceError = input;
          isActiveExternalLink(input, array, card.dataset.id);
          return;
        }
      });
    });
  };

  const insertNewCardOnHTML = () => {
    cardsCreate.push(cardsCreate[cardsCreate.length - 1] + 1);
    const newElement = document.createElement("div");
    newElement.innerHTML = clonedCard;
    newElement.classList.add("card");
    newElement.setAttribute("data-id", cardsCreate[cardsCreate.length - 1]);
    group.appendChild(newElement);

    onHideButton();
    toUpdateEvent();
    onAddItemArray();
    onValidationInputs();

    newElement
      .querySelector(".card__controler__close")
      .addEventListener("click", () => handleCloseCard(newElement));
  };

  // initial
  buttonAdd.addEventListener("click", insertNewCardOnHTML);
  buttonClose.addEventListener("click", () =>
    handleCloseCard(group.querySelector(".card"), 0)
  );

  onValidationInputs();
};

onValidationDinamicInputs(groupAdditionalBasic, basicCoverage);
onValidationDinamicInputs(groupAdditionalCoverages, additionalBasic);
onValidationDinamicInputs(groupAdditionalAssistance, assistance);
onValidationDinamicInputs(groupContractualConditions, contractualConditions);

function getAllReferenceErrors(obj) {
  const result = {};
  for (const index in obj) {
    const nestedObj = obj[index];
    for (const fieldName in nestedObj) {
      if (nestedObj[fieldName].error) {
        nestedObj[fieldName].referenceError.classList.add("error");
        result[fieldName] = nestedObj[fieldName].error;
      }
    }
  }

  return result;
}

const handleSubmite = (obj) => {
  const btnSubmite = document.querySelector(".content-footer button");

  btnSubmite.addEventListener("click", () => {
    getAllReferenceErrors(basicCoverage);
    getAllReferenceErrors(additionalBasic);
    getAllReferenceErrors(assistance);
    getAllReferenceErrors(contractualConditions);

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

handleSubmite(valuesInput);
