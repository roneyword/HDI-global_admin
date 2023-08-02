const isActiveExternalLink = (field, obj) => {
  const externalLink = field.querySelector("input");

  externalLink.addEventListener("click", (e) => {
    obj[field.dataset.js] = {
      ...obj[field.dataset.js],
      value: e.target.checked,
      error: false,
    };
  });
};

export default isActiveExternalLink;
