const inputFieldLink = document.querySelectorAll("[data-copy='link']");
inputFieldLink.forEach((link) => {
  const handleCopy = link.querySelector("button");
  const inputValue = link.querySelector("input");
  const tooltip = link.querySelector(".tooltip");

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
});
