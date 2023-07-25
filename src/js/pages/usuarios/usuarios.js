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
  name: {
    value: "",
    error: true,
    referenceError: "",
  },
  email: {
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

const validationEmail = (field, obj) => {
  const input = field.querySelector("input");

  input.addEventListener("keyup", (e) => {
    let pattern =
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    let validate = pattern.test(e.target.value);

    if (!validate) {
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
    input.dataset.js === "name" &&
      validateMinCaracter(input, "input", valuesInput, 3);

    input.dataset.js === "email" && validationEmail(input, valuesInput);
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
