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

const handleActiveTopics = () => {
  const radioList = document.querySelectorAll(".field__radio__container input");
  const topicsWithImg = document.querySelector("[data-group='topicsWithImg']");
  const onlyTopics = document.querySelector("[data-group='onlyTopics']");

  topicsWithImg.style.display = "none";
  onlyTopics.style.display = "none";

  radioList.forEach((radio) => {
    radio.addEventListener("click", () => {
      if (radio.value == 0) {
        topicsWithImg.style.display = "none";
        onlyTopics.style.display = "none";
      }
      if (radio.value == 1) {
        topicsWithImg.style.display = "block";
        onlyTopics.style.display = "none";
      }
      if (radio.value == 2) {
        topicsWithImg.style.display = "none";
        onlyTopics.style.display = "block";
      }
    });
  });
};

isActiveLanguage();
handleActiveTopics();

// validação dos inputs
let valuesInput = {
  category: {
    value: "",
    error: true,
    referenceError: "",
  },
  linkPageHeader: {
    value: "",
    error: true,
    referenceError: "",
  },
  title: {
    value: "",
    error: true,
    referenceError: "",
  },
  description: {
    value: "",
    error: true,
    referenceError: "",
  },
  imgOne: {
    value: "",
    error: true,
    referenceError: "",
  },
  altImgOne: {
    value: "",
    error: true,
    referenceError: "",
  },
  imgTwo: {
    value: "",
    error: true,
    referenceError: "",
  },
  altImgTwo: {
    value: "",
    error: true,
    referenceError: "",
  },
  imgThree: {
    value: "",
    error: true,
    referenceError: "",
  },
  altImgThree: {
    value: "",
    error: true,
    referenceError: "",
  },
  thumb: {
    value: "",
    error: true,
    referenceError: "",
  },
  linkPage: {
    value: "",
    error: true,
    referenceError: "",
  },
  isValidity: {
    value: "",
    error: false,
    referenceError: "",
  },
};

let topicsWithImg = {
  0: {
    isActive: {
      value: "",
      error: false,
      referenceError: "",
    },
    title: {
      value: "",
      error: true,
      referenceError: "",
    },
    description: {
      value: "",
      error: true,
      referenceError: "",
    },
    imgOne: {
      value: "",
      error: true,
      referenceError: "",
    },
    altImgOne: {
      value: "",
      error: true,
      referenceError: "",
    },
    imgTwo: {
      value: "",
      error: true,
      referenceError: "",
    },
    altImgTwo: {
      value: "",
      error: true,
      referenceError: "",
    },
    link: {
      value: "",
      error: true,
      referenceError: "",
    },
    isPresent: {
      value: "",
      error: false,
      referenceError: "",
    },
  },
};

let onlyTopics = {
  0: {
    isActive: {
      value: "",
      error: false,
      referenceError: "",
    },
    title: {
      value: "",
      error: true,
      referenceError: "",
    },
    order: {
      value: "",
      error: true,
      referenceError: "",
    },
    description: {
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

const isActiveExternalLink = (field, obj, index = null) => {
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

const onGetReference = (referecent) => {
  valuesInput[referecent.dataset.js].referenceError = referecent;
};

const onValidationInputs = () => {
  const inputsValues = document.querySelectorAll("[data-js]");

  inputsValues.forEach((input) => {
    onGetReference(input);

    input.dataset.js === "category" && validateSelect(input, valuesInput, 3);

    input.dataset.js === "linkPageHeader" &&
      validateMinCaracter(input, valuesInput, 3);

    input.dataset.js === "title" && validateMinCaracter(input, valuesInput, 3);

    input.dataset.js === "description" &&
      validateMinCaracter(input, valuesInput, 10);

    input.dataset.js === "imgOne" && validateFile(input, valuesInput);

    input.dataset.js === "altImgOne" &&
      validateMinCaracter(input, valuesInput, 10);

    input.dataset.js === "imgTwo" && validateFile(input, valuesInput);

    input.dataset.js === "altImgTwo" &&
      validateMinCaracter(input, valuesInput, 10);

    input.dataset.js === "imgThree" && validateFile(input, valuesInput);

    input.dataset.js === "altImgThree" &&
      validateMinCaracter(input, valuesInput, 10);

    input.dataset.js === "thumb" && validateFile(input, valuesInput);

    input.dataset.js === "linkPage" &&
      validateMinCaracter(input, valuesInput, 3);

    input.dataset.js === "isValidity" &&
      isActiveExternalLink(input, valuesInput);
  });
};

onValidationInputs();

// // -------------------- validações dos itens dinamicos teste -------------------
const groupTopicsWithImg = document.querySelector(
  "[data-group='topicsWithImg']"
);

const groupOnlyTopics = document.querySelector("[data-group='onlyTopics']");

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

onValidationDinamicInputs(groupTopicsWithImg, topicsWithImg);
onValidationDinamicInputs(groupOnlyTopics, onlyTopics);

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
    // verificar a lista de radio para saber se valida os inputs dinamicos ou nao
    getAllReferenceErrors(topicsWithImg);
    getAllReferenceErrors(onlyTopics);

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
