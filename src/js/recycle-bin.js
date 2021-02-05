const getRecycledDocuments = (files) => {
  recycleBinList.innerHTML = "";

  let loadedDate = new Date();

  if (files.length > 0) {
    files.forEach(file => {
      recycleBinList.innerHTML += `
      <li draggable="true"
          ondragstart="drag(event)"
          ondblclick="openRecycledDocumentInEditor('${file.id}')"
          id="${file.id}"
          title="${file.filename}.\nDouble-click or drag to editor to open the file.">
        <div class="files-filename">${file.filename}</div>
        <span class="files-datecreated">Created ${getFileHistory(loadedDate, file.createdAt)}</span>
        <div class="files-action">
          <button onclick="restoreFile('${file.id}')" class="duplicate-file-button"><i class="fas fa-trash-restore"></i> Restore
          </button>
          <button onclick="permanentlyDeleteFile('${file.id}')" class="delete-file-button"><i class="fa fa-trash"></i> Delete
          </button>
        </div>
      </li>`;

      recycleBinList.style.justifyContent = "flex-start";
      recycleBinList.style.alignItems = "flex-start";
      recycleBinList.style.textAlign = "left";
    });
  } else {
    recycleBinList.innerHTML = `
      <p class="no-file-message">
        <img src="src/img/trash-empty.svg" /><br />
        All clear!
      </p>`;

    recycleBinList.style.justifyContent = "center";
    recycleBinList.style.alignItems = "center";
    recycleBinList.style.textAlign = "center";
  }

  recycleBinElements = Array.prototype.slice.call(recycleBinList.children);
};

const openRecycledDocumentInEditor = (id) => {
  openedFile = recycleBin.filter(file => {
    return file.id == id;
  })[0];

  editor.innerHTML = `
    <div id="editor-file-topbar">
      <h2 id="recycled-file-title"
           title="${openedFile.filename}. Click to rename.">${openedFile.filename}</h2>
    </div>

    <div id="recycled-file-content">
      ${openedFile.content}
    </div>
  `;

  if (openedFileElement) {
    openedFileElement.style.border = "1px solid #fff";
  }

  openedFileElement = recycleBinElements.filter(file => {
    return file.id == id;
  })[0];
  openedFileElement.style.border = "5px solid #2F242C";

  console.log(`document "${filename}" opened`);

  fileSearch.value = "";

  localStorage.setItem("openedFile", JSON.stringify(openedFile));

  editorContent.onselectionchange =  () => {
    console.log(document.getSelection().focusOffset);
  };
};

const restoreFile = (fileId) => {
  fileToBeRestored = recycleBin.filter(file => {
    return file.id == fileId;
  })[0];

  console.log(fileToBeRestored);

  files.push(fileToBeRestored);

  recycleBin = recycleBin.filter(file => {
    return file.id != fileId;
  });

  console.log(files);

  getDocuments(files);
  getRecycledDocuments(recycleBin);

  localStorage.setItem("files", JSON.stringify(files));
  localStorage.setItem("recycleBin", JSON.stringify(recycleBin));

  showNotificationStatus("success", `Successfully restored<br /><strong>${fileToBeRestored.filename}</strong>.`)
};

const permanentlyDeleteFile = (fileId) => {
  fileToBePermanentlyDeleted = recycleBin.filter(file => {
    return file.id == fileId;
  })[0];

  recycleBin = recycleBin.filter(file => {
    return file.id != fileId;
  });

  console.log(files);

  getDocuments(files);
  getRecycledDocuments(recycleBin);

  localStorage.setItem("recycleBin", JSON.stringify(recycleBin));

  showNotificationStatus("success", `Permanently deleted<br /><strong>${fileToBePermanentlyDeleted.filename}</strong>.`)
};

const emptyRecycleBin = () => {
  recycleBin = [];

  localStorage.setItem("recycleBin", JSON.stringify(recycleBin));
  getRecycledDocuments(recycleBin);
};