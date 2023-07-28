export default function Modal() {
  const modalContainer = document.querySelector(".modal-container");

  modalContainer.addEventListener("click", () => {
    modalContainer.classList.add("isActive");
  });
}
