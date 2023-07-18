export default function TextArea() {
  const textAreaField = document.querySelectorAll(".textarea__field");

  const handleLengthString = () => {
    textAreaField.forEach((item) => {
      item.addEventListener("keyup", () => {
        const textArea = item.querySelector("textarea");
        item.querySelector(
          "small"
        ).innerHTML = `${textArea.value.length} / ${textArea.maxLength}`;
      });
    });
  };

  handleLengthString();
}
