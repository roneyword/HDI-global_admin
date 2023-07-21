export default function Select() {
  const selectField = document.querySelectorAll(".select__field");

  const handleActiveSelectField = () => {
    selectField.forEach((select) => {
      select.addEventListener("click", (e) => {
        select.classList.toggle("isActive");
        handleSelectedValueList(
          document.querySelectorAll(".select__field-list li"),
          select
        );
      });
    });
  };

  const handleSelectedValueList = (list, select) => {
    if (!list) return;
    list.forEach((item) => {
      item.addEventListener("click", () => {
        onDeselected();
        item.classList.add("selected");
        select.querySelector(".select__field-item").innerHTML = item.innerHTML;
        select.classList.add("isSelected");
      });
    });

    const onDeselected = () => {
      list.forEach((item) => {
        item.classList.remove("selected");
      });
    };
  };

  handleActiveSelectField();
}
