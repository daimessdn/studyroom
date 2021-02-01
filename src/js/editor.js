const openDocumentInEditor = (filename) => {
  openedFile = files.filter(file => {
    return file.filename == filename;
  })[0];

  editor.innerHTML = `
    <div id="editor-file-title"
         contenteditable="true">
      ${openedFile.filename}
    </div>

    <div id="editor-file-toolbar">
      toolbar will be shown here
    </div>

    <div id="editor-file-content" contenteditable="true">
      ${openedFile.content}
    </div>
  `;

  editorTitle = document.querySelector("#editor-file-title");
  editorToolbar = document.querySelector("#editor-file-toolbar");
  editorContent = document.querySelector("#editor-file-content");

  editorTitle.addEventListener(
    "input", () => {
      renameTitleInEditor(openedFile, editorTitle.textContent);
    }
  );

  if (openedFileElement) {
    openedFileElement.style.border = "3px solid #fff";
  }

  openedFileElement = fileElements.filter(file => {
    console.log(file)
    return file.children[0].textContent == filename;
  })[0];
  openedFileElement.style.border = "3px solid #2F242C";

  console.log(`document "${filename}" opened`);
};

const saveDocument = (filename) => {
  fileToBeSaved = files.filter(file => {
    return file == filename;
  })[0];

  files[files.indexOf(fileToBeSaved)].content = editor.innerHTML;
  files[files.indexOf(fileToBeSaved)].lastSave = new Date();

  openedFile = files[files.indexOf(fileToBeSaved)];
}

const renameTitleInEditor = (filename, newFilename) => {
  fileToBeRenamed = files.filter(file => {
    return file == filename;
  })[0];

  if (newFilename !== "") {
    files[files.indexOf(fileToBeRenamed)].filename = newFilename;
  } else {
    files[files.indexOf(fileToBeRenamed)].filename = "Untitled document";
    editorTitle.textContent = "Untitled document";
  }

  files[files.indexOf(fileToBeRenamed)].lastSave = new Date();

  getDocuments(files);

  openedFile = files[files.indexOf(fileToBeRenamed)];
}