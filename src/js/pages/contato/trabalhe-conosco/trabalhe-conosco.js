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
  link: {
    value: "",
    error: true,
    referenceError: "",
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

const onGetReference = (referecent) => {
  valuesInput[referecent.dataset.js].referenceError = referecent;
};

const onValidationInputs = () => {
  const inputsValues = document.querySelectorAll("[data-js]");

  inputsValues.forEach((input) => {
    onGetReference(input);
    input.dataset.js === "link" &&
      validateMinCaracter(input, "input", valuesInput, 3);
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
