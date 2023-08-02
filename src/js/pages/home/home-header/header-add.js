import handleLengthString from "../../../textArea.js";
import copyPast from "../../../copypaste.js";
import validateMinCaracter from "../../../validateMinCaracter.js";
import validateEditor from "../../../validateEditor.js";
import validateFile from "../../../validateFile.js";
import validateSelect from "../../../validateSelect.js";
import validateCurrentDate from "../../../validateCurrentDate.js";
import validateExitDate from "../../../validateExitDate.js";
import isActiveExternalLink from "../../../isActiveExternalLink.js";
import initEditor from "../../../initEditor.js";

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

let valuesInput = {
  title: {
    value: "",
    error: true,
    referenceError: "",
  },
  text: {
    value: "",
    error: true,
    referenceError: "",
  },
  imgDesk: {
    value: "",
    error: true,
    referenceError: "",
  },
  imgMobile: {
    value: "",
    error: true,
    referenceError: "",
  },
  altImg: {
    value: "",
    error: true,
    referenceError: "",
  },
  btnCallToAction: {
    value: "",
    error: true,
    referenceError: "",
  },
  entryDate: {
    value: "",
    error: true,
    referenceError: "",
  },
  exitDate: {
    value: "",
    error: true,
    referenceError: "",
  },
  link: {
    value: "",
    error: true,
    referenceError: "",
  },
  isExternal: {
    value: "",
    error: false,
    referenceError: "",
  },
};

const onGetReference = (referecent) => {
  valuesInput[referecent.dataset.js].referenceError = referecent;
};

const onValidationInputs = () => {
  const inputsValues = document.querySelectorAll("[data-js]");

  inputsValues.forEach((input) => {
    onGetReference(input);

    if (input.dataset.js === "title") {
      validateMinCaracter(input, valuesInput, 10);
      handleLengthString(input);
    }

    if (input.dataset.js === "text") {
      initEditor(input);
      validateEditor(input, valuesInput, 10);
      handleLengthString(input);
    }

    if (input.dataset.js === "imgDesk") {
      validateFile(input, valuesInput);
    }

    if (input.dataset.js === "imgMobile") {
      validateFile(input, valuesInput);
    }

    if (input.dataset.js === "altImg") {
      validateMinCaracter(input, valuesInput, 10);
    }

    if (input.dataset.js === "btnCallToAction") {
      validateSelect(input, valuesInput);
    }

    if (input.dataset.js === "entryDate") {
      validateCurrentDate(input, valuesInput);
    }

    if (input.dataset.js === "exitDate") {
      validateExitDate(
        input,
        document.querySelector('[data-js="entryDate"]'),
        valuesInput
      );
    }

    if (input.dataset.js === "link") {
      copyPast(input);
      validateMinCaracter(input, valuesInput, 3);
    }

    if (input.dataset.js === "isExternal") {
      isActiveExternalLink(input, valuesInput);
    }
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
