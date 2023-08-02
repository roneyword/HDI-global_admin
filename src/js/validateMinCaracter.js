const validateMinCaracter = (field, obj, min = 3) => {
  const input = field.querySelector("input") || field.querySelector("textarea");

  input.addEventListener("keyup", (e) => {
    if (e.target.value.trim().length < min) {
      field.classList.add("error");

      obj[field.dataset.js] = {
        ...obj[field.dataset.js],
        value: e.target.value,
        error: true,
      };

      return;
    }

    field.classList.remove("error");
    obj[field.dataset.js] = {
      ...obj[field.dataset.js],
      value: e.target.value,
      error: false,
    };
  });
};

export default validateMinCaracter;
