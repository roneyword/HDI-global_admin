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
        ...obj[field.dataset.js],
        value: e.target.value,
        error: false,
      };
    } else {
      field.classList.add("error");
      obj[field.dataset.js] = {
        ...obj[field.dataset.js],
        value: e.target.value,
        error: true,
      };
    }
  });
};

export default validateCurrentDate;
