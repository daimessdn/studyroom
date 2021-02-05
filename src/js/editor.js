let welcomeSession = `
  <div class="welcome">
    <img class="welcome-image" src="src/img/studyroom-welcome-image.svg" draggable="false"/>
    <h1 class="welcome-title">Welcome to <strong>studyroom</strong></h1>

    <div class="welcome-content">
      <p>
        <strong>Double-click</strong> the file of <strong>drag and drop</strong> the file here for open your file.
      </p>

      <p>
        You can also create a document by <strong>drag your file (<code>.txt</code> or <code>.md</code> file)</strong> externally.
      </p>

      <p>
        First time here? <br />
        <button id="get-started-button" onclick="addFile('Welcome to studyroom', getStartedContent);">Click to get started!</button>
      </p>
    </div>
  </div>`;

const openDocumentInEditor = (filename) => {
  openedFile = files.filter(file => {
    return file.filename == filename;
  })[0];

  editor.innerHTML = `
    <div id="editor-file-topbar">
      <h2 id="editor-file-title"
           contenteditable="true"
           title="${openedFile.filename}. Click to rename.">${openedFile.filename}</h2>
      <p id="editor-file-last-saved">${ openedFile.lastSaved !== null && openedFile.lastSaved.getTime() !== 0 ? "Last saved " + getFileHistory(new Date(), new Date(openedFile.lastSaved)) : ""}</p>

      <div id="editor-file-toolbar">
        <ul class="toolbar-section" id="semantic-toolbar">
          <li class="toolbar-button" onclick="headerIcon(1)">H<span class="subheader-number-symbol">1</span></li>
          <li class="toolbar-button" onclick="headerIcon(2)">H<span class="subheader-number-symbol">2</span></li>
          <li class="toolbar-button" onclick="headerIcon(3)">H<span class="subheader-number-symbol">3</span></li>
          <li class="toolbar-button" onclick="headerIcon(4)">H<span class="subheader-number-symbol">4</span></li>
          <li class="toolbar-button" onclick="headerIcon(5)">H<span class="subheader-number-symbol">5</span></li>
          <li class="toolbar-button" onclick="headerIcon(6)">H<span class="subheader-number-symbol">6</span></li>
          <li class="toolbar-button" onclick="paragraphIcon()"><i class="fas fa-paragraph"></i></li>
        </ul>

        <ul class="toolbar-section" id="formatting-toolbar">
          <li class="toolbar-button" onclick="boldIcon()"><i class="fa fas fa-bold"></i></li>
          <li class="toolbar-button" onclick="italicIcon()"><i class="fa fas fa-italic"></i></li>
          <li class="toolbar-button" onclick="underlineIcon()"><i class="fa fas fa-underline"></i></li>
          <li class="toolbar-button" onClick="strikeThroughIcon()"><i class="fas fa-strikethrough"></i></li>

          <li class="toolbar-button" onClick="subScriptIcon()"><i class="fas fa-subscript"></i></li>
          <li class="toolbar-button" onClick="superScriptIcon()"><i class="fas fa-superscript"></i></li>

          <li class="toolbar-button" onclick="listIcon(false)"><i class="fa fas fa-list"></i></li>
          <li class="toolbar-button" onclick="listIcon(true)"><i class="fa fas fa-list-ol"></i></li>

          <li class="toolbar-button"onclick="textAlignIcon('left')"><i class="fas fa-align-left"></i></li>
          <li class="toolbar-button"onclick="textAlignIcon('center')"><i class="fas fa-align-center"></i></li>
          <li class="toolbar-button"onclick="textAlignIcon('right')"><i class="fas fa-align-right"></i></li>
          <li class="toolbar-button"onclick="textAlignIcon('justify')"><i class="fas fa-align-justify"></i></li>
        </ul>
      </div>
    </div>

    <div id="editor-file-content" contenteditable="true" oninput="autoSaveDocument(openedFile)">
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
    openedFileElement.style.border = "1px solid #fff";
  }

  openedFileElement = fileElements.filter(file => {
    return file.children[0].textContent == filename;
  })[0];
  openedFileElement.style.border = "5px solid #2F242C";

  console.log(`document "${filename}" opened`);

  fileSearch.value = "";

  localStorage.setItem("openedFile", JSON.stringify(openedFile));

  editorContent.onselectionchange =  () => {
    console.log(document.getSelection().focusOffset);
  };
};

const saveDocument = (filename) => {
  fileToBeSaved = files.filter(file => {
    return file == filename;
  })[0];

  files[files.indexOf(fileToBeSaved)].content = editorContent.innerHTML;
  files[files.indexOf(fileToBeSaved)].lastSaved = new Date();

  localStorage.setItem("files", JSON.stringify(files));

  openedFile = files[files.indexOf(fileToBeSaved)];

  showNotificationStatus("success", `Saved changes for<br /><strong>${fileToBeSaved.filename}</strong>`);
};

const autoSaveDocument = (filename) => {
  fileToBeSaved = files.filter(file => {
    return file == filename;
  })[0];

  files[files.indexOf(fileToBeSaved)].content = editorContent.innerHTML;
  files[files.indexOf(fileToBeSaved)].lastSave = new Date();

  localStorage.setItem("files", JSON.stringify(files));

  openedFile = files[files.indexOf(fileToBeSaved)];

  showNotificationStatus("success", `Auto-saved changes for<br /><strong>${fileToBeSaved.filename}</strong>`);
};

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

  localStorage.setItem("files", JSON.stringify(files));

  getDocuments(files);

  openedFile = files[files.indexOf(fileToBeRenamed)];
};