const validateSelect = (field, obj) => {
  const handleSelectedValueList = (list, select) => {
    if (!list) return;
    list.forEach((item) => {
      item.addEventListener("click", () => {
        onDeselected();
        item.classList.add("selected");
        select.querySelector(".select__field-item").innerHTML = item.innerHTML;
        select.classList.add("isSelected");

        obj[field.dataset.js] = {
          ...obj[field.dataset.js],
          value: item.innerHTML,
          error: false,
        };
      });
    });

    const onDeselected = () => {
      list.forEach((item) => {
        item.classList.remove("selected");
      });
    };
  };

  field.addEventListener("click", (e) => {
    field.classList.toggle("isActive");
    handleSelectedValueList(
      document.querySelectorAll(".select__field-list li"),
      field
    );

    console.log(obj);
  });
};

export default validateSelect;
