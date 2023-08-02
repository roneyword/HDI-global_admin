const copyPast = (field) => {
  const handleCopy = field.querySelector("button");
  const inputValue = field.querySelector("input");
  const tooltip = field.querySelector(".tooltip");

  handleCopy.addEventListener("click", () => {
    tooltip.innerHTML = !inputValue.value.length
      ? "Campo vazio!"
      : "Link copiado";

    inputValue.select();
    inputValue.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inputValue.value);

    tooltip.classList.add("isActive");

    setTimeout(() => {
      tooltip.classList.remove("isActive");
    }, 2000);
  });
};

export default copyPast;
