const openDocumentInEditor = (filename) => {
  const openedFile = files.filter(file => {
    return file.filename == filename;
  });

  editor.innerHTML = openedFile[0].content;
  console.log(`document "${filename}" opened`);
}