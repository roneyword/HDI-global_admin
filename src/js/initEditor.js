const initEditor = (field) => {
  const editor = field.querySelector(".editor");

  BalloonEditor.create(editor).catch((error) => {
    console.error(error);
  });
};

export default initEditor;
