const validateEditor = (field, obj, min = 10) => {
  const input = field.querySelector(".editor");
  const maxLength = input.getAttribute("maxlength");

  input.addEventListener("keyup", (e) => {
    if (input.innerText.length < min) {
      field.classList.add("error");

      obj[field.dataset.js] = {
        ...obj[field.dataset.js],
        value: input.innerHTML,
        error: true,
      };

      return;
    }

    if (input.innerText.length > maxLength) {
      field.classList.add("error");

      obj[field.dataset.js] = {
        ...obj[field.dataset.js],
        value: input.innerHTML,
        error: true,
      };

      return;
    }

    field.classList.remove("error");
    obj[field.dataset.js] = {
      ...obj[field.dataset.js],
      value: input.innerHTML,
      error: false,
    };
  });
};

export default validateEditor;
