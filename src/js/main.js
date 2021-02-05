let fileList = document.querySelector("#file-list"),
    fileSearch = document.querySelector("#file-search"),
    fileElements,
    openedFile,
    openedFileElement;

let recycleBinList = document.querySelector("#recycle-bin-list"),
    recycleBinSearch = document.querySelector("#recycle-file-search"),
    recycleBinElements;

let files = JSON.parse(localStorage.getItem("files"));
let recycleBin = JSON.parse(localStorage.getItem("recycleBin"));

let editor = document.querySelector("#editor"),
    editorTitle,
    editorToolbar,
    editorContent;

const getStartedContent = `
  <h1 style=\"text-align: center;\">Welcome to <em>studyroom</em></h1><p style=\"text-align: center;\"><strong>studyroom</strong> is a web-based rich text editor, which can be used for creating and managing your word document.</p><h1>Product features</h1><ul><li>Create, delete, duplicate, and rename documents.</li><li>Your files will be kept forever (since it uses local storage as long as you don't clear the cache)<br></li><li>Create documents by uploading from external files (supported <strong>.md</strong>, <strong>.html</strong>, and <strong>.txt</strong> file format)</li><li>Search file using search section on the left sidebar.<br></li><li>Basic editing support: including semantic structures (headings and paragraph), formatting, and text alignments.</li><li>Keyboard shortcuts supports (for several operations)</li></ul><h1>Operation manual</h1><h2>Create a new document<br></h2><ol><li>Click the <strong>\"plus sign\"</strong> on the left sidebar</li><li><strong>Type the file name</strong> you want to create<br></li><li>Last thing, click <strong>Create</strong></li></ol><p>It will create the file and also open it.</p><h2>Create a new document from external files</h2><p>You can create a new document by <strong>drag the external file inside the editor container</strong>. It will create the file with exact file and content based on external file. For this time, studyroom supports <strong>.md</strong>, <strong>.html</strong>, and <strong>.txt</strong> file formats.</p><h2>Create a copy of the document</h2><p>You can create a copy of the document by clicking <strong>Duplicate</strong> on one of the files.</p><h2>Delete the document</h2>You can delete the document by clicking <strong>Delete</strong> on one of the files.<p></p><h2>Opening a document<br></h2><p>You can open a document by <strong>double click one of the files appear in the left sidebar</strong>. When you opened the file, one of files will indicate the thick black border on the file, indicates the file is opened. You can also <strong>drag the document</strong> to the editor container to open the file.</p><h2>Save a document</h2><p>While editing, it will be automatically saved by default, but you can use <strong>Ctrl + S</strong> for saving your document changes manually.<br></p><h2>Rename the document</h2><p>Open the documents, then click the title of the editor container, then type the filename you want to rename.</p><h2>Search documents</h2><p>There is a search bar on the left sidebar. You can use that for search your documents by typing the keyword<strong> based on filename.</strong><br></p>
`;

const addFile = (filename, content = "<p>Here's your new file. You can type, edit, clear, and use some tools for improve your document here.</p>") => {
  const existingFilenames = files.filter(file => {
    return file.filename.includes(filename);
  });

  if (filename != "") {
    files.push({
      id: `document-${makeid(15)}`,
      filename: existingFilenames.length == 0 ? filename : `Copy ${existingFilenames.length} of ${filename}`,
      content: content,
      createdAt: new Date(),
      lastSaved: null
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

  recycleBin.push(fileToBeDeleted);

  showNotificationStatus("success", `Successfully deleted<br /><strong>${fileToBeDeleted.filename}</strong>.<br />The file is in <strong>Recycle Bin</strong>.`)
  
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
  localStorage.setItem("recycleBin", JSON.stringify(recycleBin));

  getDocuments(files);
  getRecycledDocuments(recycleBin);
};

const duplicateDocument = (element) => {
  fileToBeDuplicated = files.filter(file => {
    return (file.filename) == element.textContent;
  })[0];

  addFile(fileToBeDuplicated.filename, fileToBeDuplicated.content);

  showNotificationStatus("success", `Successfully duplicated<br /><strong>${fileToBeDuplicated.filename}</strong>.`)
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
        <img src="src/img/file-not-found.svg" style="width: 10vw;" /><br />
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

  if (document.getElementById(data).parentElement.id == "recycle-bin-list") {
    openRecycledDocumentInEditor(document.getElementById(data).id);
  } else if (document.getElementById(data).parentElement.id == "file-list") {
    openDocumentInEditor(document.getElementById(data).children[0].innerHTML);
  }
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

function makeid(length) {
   var result           = '';
   var characters       = '0123456789abcdef';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
