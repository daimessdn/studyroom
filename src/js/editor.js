let welcomeSession = `
  <div class="welcome">
    <img class="welcome-image" src="src/img/studyroom-welcome-image.svg" />
    <h1 class="welcome-title">Welcome to <strong>studyroom</strong></h1>

    <div class="welcome-content">
      <p>
        <strong>Double-click</strong> the file of <strong>drag and drop</strong> the file here for open your file.
      </p>

      <p>
        You can also create a document by <strong>drag your file (<code>.txt</code> or <code>.md</code> file)</strong> from outside window.<br />
        It will create a document with exact name and content based on your file.
      </p>
    </div>
  </div>`;

const openDocumentInEditor = (filename) => {
  openedFile = files.filter(file => {
    return file.filename == filename;
  })[0];

  editor.innerHTML = `
    <h2 id="editor-file-title"
         contenteditable="true">
      ${openedFile.filename}
    </h2>

    <div id="editor-file-toolbar">
      <ul class="toolbar-section" id="semantic-toolbar">
        <li><b>H1</b></li>
        <li><b>H2</b></li>
        <li><b>H3</b></li>
        <li><b>H4</b></li>
        <li><b>H5</b></li>
        <li><b>H6</b></li>
      </ul>

      <ul class="toolbar-section" id="formatting-toolbar">
        <li><i class="fa fas fa-bold"></i></li>
        <li><i class="fa fas fa-italic"></i></li>
        <li><i class="fa fas fa-underline"></i></li>
      </ul>
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
    openedFileElement.style.border = "2px solid #fff";
  }

  openedFileElement = fileElements.filter(file => {
    return file.children[0].textContent == filename;
  })[0];
  openedFileElement.style.border = "2px solid #2F242C";

  console.log(`document "${filename}" opened`);
};

const saveDocument = (filename) => {
  fileToBeSaved = files.filter(file => {
    return file == filename;
  })[0];

  files[files.indexOf(fileToBeSaved)].content = editor.children[2].innerHTML;
  files[files.indexOf(fileToBeSaved)].lastSave = new Date();

  openedFile = files[files.indexOf(fileToBeSaved)];
}

const renameTitleInEditor = (filename, newFilename) => {
  fileToBeRenamed = files.filter(file => {
    return file == filename;
  })[0];

  if (newFilename !== "") {
    files[files.indexOf(fileToBeRenamed)].filename = newFilename.replaceAll("\n", "");
  } else {
    files[files.indexOf(fileToBeRenamed)].filename = "Untitled document";
    editorTitle.textContent = "Untitled document";
  }

  files[files.indexOf(fileToBeRenamed)].lastSave = new Date();

  getDocuments(files);

  openedFile = files[files.indexOf(fileToBeRenamed)];
}