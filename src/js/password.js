const inputFieldPassword = document.querySelectorAll(
  "[data-password='password']"
);
inputFieldPassword.forEach((link) => {
  const btn = link.querySelector("button");
  const input = link.querySelector("input");
  btn.addEventListener("click", () => {
    input.type === "password"
      ? (input.type = "text")
      : (input.type = "password");
  });
});
