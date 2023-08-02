const handleLengthString = (field) => {
  field.addEventListener("keyup", () => {
    if (getTypeInput(field)) {
      const textArea = field.querySelector("textarea");
      field.querySelector(
        "small"
      ).innerHTML = `${textArea.value.length} / ${textArea.maxLength}`;

      return;
    }

    const textArea = field.querySelector(".editor");

    field.querySelector("small").innerHTML = `${
      textArea.innerText.length
    } / ${textArea.getAttribute("maxlength")}`;
  });

  const getTypeInput = (item) => {
    const textArea = item.querySelector("textarea");

    if (textArea) return true;

    return false;
  };
};

export default handleLengthString;
