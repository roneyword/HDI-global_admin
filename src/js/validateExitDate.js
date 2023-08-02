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
        ...obj[field.dataset.js],
        value: e.target.value,
        error: true,
      };
    } else {
      field.classList.remove("error");
      obj[field.dataset.js] = {
        ...obj[field.dataset.js],
        value: e.target.value,
        error: false,
      };
    }
  });
};

export default validateExitDate;
