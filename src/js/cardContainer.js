// somente teste pode apagar
// pega todos os elementos
const cardContainer = document.querySelectorAll(".card__container");

cardContainer.forEach((card) => {
  const buttonAdd = card.querySelector(
    ".card__container .card__controler__add"
  );

  const createCloneCard = () => {
    const containerCard = document.querySelector(".card__container");
    const cardOriginal = containerCard.querySelector(".card");
    const cardClone = cardOriginal.innerHTML;

    return cardClone;
  };

  const clonedCard = createCloneCard();

  const handleAddCard = (button) => {
    button.addEventListener("click", () => createCard());
  };

  const onHandleAddValidation = (card) => {
    const inputsValues = card.querySelectorAll("[data-validation]");

    const validateMinCaracter = (field, type, obj, min = 3) => {
      const input = field.querySelector(type);

      input.addEventListener("keyup", (e) => {
        if (e.target.value.trim().length < min) {
          field.classList.add("error");

          obj[field.dataset.js] = {
            value: e.target.value,
            error: true,
          };

          return;
        }

        field.classList.remove("error");
        obj[field.dataset.js] = {
          value: e.target.value,
          error: false,
        };
      });
    };

    inputsValues.forEach((input) => {
      // inserir a validaçã aqui
      if (input.dataset.validation === "min") {
        validateMinCaracter(input, "textarea", {}, 10);
      }
    });
  };

  handleAddCard(buttonAdd);
  onHandleAddValidation(card);

  const createCard = () => {
    const newElement = document.createElement("div");
    newElement.innerHTML = clonedCard;
    newElement.classList.add("card");
    card.appendChild(newElement);

    onHideButton();
    toUpdateEvent();
    handleCloseCard();
  };

  const toUpdateEvent = () => {
    const cardList = card.querySelectorAll(".card");
    handleAddCard(
      cardList[cardList.length - 1].querySelector(
        ".card__container .card__controler__add"
      )
    );

    cardList.forEach((cardItem) => {
      onHandleAddValidation(cardItem);
    });
  };

  const onHideButton = () => {
    const cardList = card.querySelectorAll(".card");

    console.log(cardList.length);

    cardList.forEach((card, index) => {
      if (cardList.length === 1) {
        card.querySelector(".card__controler__add").classList.remove("d-none");
        card.querySelector(".card__controler__close").classList.add("d-none");
        return;
      }

      if (index !== cardList.length - 1) {
        card.querySelector(".card__controler__add").classList.add("d-none");
      }

      if (index === cardList.length - 1) {
        card.querySelector(".card__controler__add").classList.remove("d-none");
      }

      card.querySelector(".card__controler__close").classList.remove("d-none");
    });
  };

  const handleCloseCard = () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      card
        .querySelector(".card__container .card__controler__close")
        .addEventListener("click", () => {
          card.remove();
          onHideButton();
        });
    });
  };
});

// pega somente um elemento
// const buttonAdd = document.querySelector(
//   ".card__container .card__controler__add"
// );

// const containerCard = document.querySelector(".card__container");

// const createCloneCard = () => {
//   const containerCard = document.querySelector(".card__container");
//   const cardOriginal = containerCard.querySelector(".card");
//   const cardClone = cardOriginal.innerHTML;

//   return cardClone;
// };

// const clonedCard = createCloneCard();

// const handleAddCard = (button) =>
//   button.addEventListener("click", () => createCard());

// handleAddCard(buttonAdd);

// const createCard = () => {
//   const newElement = document.createElement("div");
//   newElement.innerHTML = clonedCard;
//   newElement.classList.add("card");
//   containerCard.appendChild(newElement);

//   onHideButton();
//   toUpdateEvent();
//   handleCloseCard();
// };

// const toUpdateEvent = () => {
//   const cardList = containerCard.querySelectorAll(".card");
//   handleAddCard(
//     cardList[cardList.length - 1].querySelector(
//       ".card__container .card__controler__add"
//     )
//   );
// };

// const onHideButton = () => {
//   const cardList = containerCard.querySelectorAll(".card");

//   console.log(cardList.length);

//   cardList.forEach((card, index) => {
//     if (cardList.length === 1) {
//       card.querySelector(".card__controler__add").classList.remove("d-none");
//       card.querySelector(".card__controler__close").classList.add("d-none");
//       return;
//     }

//     if (index !== cardList.length - 1) {
//       card.querySelector(".card__controler__add").classList.add("d-none");
//     }

//     if (index === cardList.length - 1) {
//       card.querySelector(".card__controler__add").classList.remove("d-none");
//     }

//     card.querySelector(".card__controler__close").classList.remove("d-none");
//   });
// };

// const handleCloseCard = () => {
//   const cards = document.querySelectorAll(".card");

//   cards.forEach((card) => {
//     card
//       .querySelector(".card__container .card__controler__close")
//       .addEventListener("click", () => {
//         card.remove();
//         onHideButton();
//       });
//   });
// };
