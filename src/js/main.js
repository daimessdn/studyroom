let fileList = document.querySelector("#file-list"),
    fileSearch = document.querySelector("#file-search"),
    fileElements,
    openedFile,
    openedFileElement;

let files = JSON.parse(localStorage.getItem("files"));

let editor = document.querySelector("#editor"),
    editorTitle,
    editorToolbar,
    editorContent;

const addFile = (filename, content = "<p>Here's your new file. You can type, edit, clear, and use some tools for improve your document here.</p>") => {
  const existingFilenames = files.filter(file => {
    return file.filename.includes(filename);
  });

  if (filename != "") {
    files.push({
      id: `document-${filename.replace(new RegExp(" ", "g"), "_").toLowerCase()}-${files.length}`,
      filename: existingFilenames.length == 0 ? filename : `Copy ${existingFilenames.length} of ${filename}`,
      content: content,
      createdAt: new Date(),
      lastSave: null
    });
  }

  localStorage.setItem("files", JSON.stringify(files));

  getDocuments(files);
  document.fileAdd.filename.value = "";
  openDocumentInEditor(files[files.length - 1].filename);
};

const deleteDocuments = (element) => {
  fileToBeDeleted = files.filter(file => {
    return (file.filename) == element.textContent;
  })[0];

  console.log(fileToBeDeleted);

  showNotificationStatus("success", `Successfully deleted <strong>${fileToBeDeleted.filename}</strong>.`)
  
  if (openedFile) {
    if (openedFile.filename == element.textContent) {
      editor.innerHTML = welcomeSession;
      
      openedFile = null;
      localStorage.setItem("openedFile", JSON.stringify(openedFile));
    }
  }

  files = files.filter(file => {
    return (file.filename) != element.textContent;
  });

  localStorage.setItem("files", JSON.stringify(files));

  getDocuments(files);
};

const duplicateDocument = (element) => {
  fileToBeDuplicated = files.filter(file => {
    return (file.filename) == element.textContent;
  })[0];

  addFile(fileToBeDuplicated.filename, fileToBeDuplicated.content);

  showNotificationStatus("success", `Successfully duplicated <strong>${fileToBeDuplicated.filename}</strong>.`)
};

const getDocuments = (files) => {
  fileList.innerHTML = "";

  let loadedDate = new Date();

  if (files.length > 0) {
    files.forEach(file => {
      fileList.innerHTML += `
      <li draggable="true"
          ondragstart="drag(event)"
          ondblclick="openDocumentInEditor('${file.filename}')"
          id="${file.id}"
          title="${file.filename}.\nDouble-click or drag to editor to open the file.">
        <div class="files-filename">${file.filename}</div>
        <span class="files-datecreated">Created ${getFileHistory(loadedDate, file.createdAt)}</span>
        <div class="files-action">
          <button onclick="duplicateDocument(this.parentElement.previousElementSibling.previousElementSibling)" class="duplicate-file-button"><i class="fa fa-copy" aria-hidden="true"></i> Duplicate
          </button>
          <button onclick="deleteDocuments(this.parentElement.previousElementSibling.previousElementSibling)" class="delete-file-button"><i class="fa fa-trash" aria-hidden="true"></i> Delete
          </button>
        </div>
      </li>`;

      fileList.style.justifyContent = "flex-start";
      fileList.style.alignItems = "flex-start";
      fileList.style.textAlign = "left";
      
      // console.log(new Date().getTime() - file.createdAt.getTime());
    });
  } else {
    fileList.innerHTML = `
      <p class="no-file-message">
        <img src="src/img/file-not-found.svg" /><br />
        There's nothing here.<br />Create a new one.<br />
        <button id="new-file-button" onclick="document.querySelector('#new-document-modal').style.display = 'flex';">
          <i class="fa fa-plus"></i> New file
        </button>
      </p>`;

    fileList.style.justifyContent = "center";
    fileList.style.alignItems = "center";
    fileList.style.textAlign = "center";
  }

  fileElements = Array.prototype.slice.call(fileList.children);
};

const getFileHistory = (currentDate, recentDate) => {
  const differences = currentDate - recentDate;

  if (differences >= 1e3 && differences < 6e4) {
    return Math.round(differences / 1e3) == 1 ? `one second ago` : `${Math.round(differences / 1e3)} seconds ago`;
  } else if (differences >= 6e4 && differences < 36e5) {
    return Math.round(differences / 6e4) == 1 ? `a minute ago` : `${Math.round(differences / 6e4)} minutes ago`;
  } else if (differences >= 36e5  && differences < 864e5) {
    return Math.round(differences / 36e5) == 1 ? `a hour ago` : `${Math.round(differences / 36e5)} hours ago`;
  } else if (differences >= 864e5 && differences < 6.048e+8) {
    return Math.round(differences / 864e5) == 1 ? `a day ago` : `${Math.round(differences / 864e5)} days ago`;
  } else if (differences <= 1e3){
    return "just now";
  }
};

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  openDocumentInEditor(document.getElementById(data).children[0].innerHTML);
}

const showNotificationStatus = (status, message) => {
  let notificationBar = document.querySelector("#notification-trigger");

  notificationBar.innerHTML = message;
  notificationBar.style.display = "block";

  setTimeout(() => { notificationBar.style.display = "none" }, 5000);
}

const getSelectionStart = () => {
  let node = document.getSelection().anchorNode;
  console.log(node.nodeType == 3 ? node.parentNode : node);

  return node.nodeType == 3 ? node.parentNode : node;
}