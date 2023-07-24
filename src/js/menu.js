const menuList = document.querySelectorAll(".menu__list li");

const handleActiveItemList = () => {
  menuList.forEach((list) => {
    list.addEventListener("click", () => {
      onDesactiveItemList();
      list.classList.add("isActive");
    });
  });
};

const onDesactiveItemList = () => {
  menuList.forEach((list) => {
    list.classList.remove("isActive");
  });
};

handleActiveItemList();
