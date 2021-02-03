let fileList = document.querySelector("#file-list"),
    fileSearch = document.querySelector("#file-search"),
    fileElements,
    openedFile,
    openedFileElement;

let files = [
  {
    "id": "document-recipe_for_dinner-0",
    "filename": "Recipe for dinner",
    "content": "<ul><li>tenderloin steak</li><li>vinegar</li><li>shoyu</li><li>bean</li><li>egg</li><li>carrot</li>",
    "createdAt": new Date("2021-02-01T11:53:41.975Z"),
    "lastSave": null
  },
  {
    "id": "document-my_new_file-1",
    "filename": "My new file",
    "content": "hello world!",
    "createdAt": new Date("2021-02-01T11:55:57.674Z"),
    "lastSave": null
  },
  {
    "id": "document-weekly_report-1",
    "filename": "Weekly report",
    "content": "<h1>Weekly report</h1><p>Done some improvements in editing features, need to repair some bugs on interface.</p>",
    "createdAt": new Date("2021-02-01T13:55:57.674Z"),
    "lastSave": null
  }
];

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

  getDocuments(files);
  document.fileAdd.filename.value = "";
  openDocumentInEditor(files[files.length - 1].filename);
};

const deleteDocuments = (element) => {
  // console.log(element, element.textContent);
  fileToBeDeleted = files.filter(file => {
    // console.log(file.filename, file.filename != element.textContent);
    return (file.filename) == element.textContent;
  });

  if (openedFile) {
    if (openedFile.filename == element.textContent) {
      editor.innerHTML = welcomeSession;
    }

    openedFile = null;
  }

  files = files.filter(file => {
    // console.log(file.filename, file.filename != element.textContent);
    return (file.filename) != element.textContent;
  });

  getDocuments(files);
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
        <span class="files-filename">${file.filename}</span> <br />
        <span class="files-datecreated">Created ${getFileHistory(loadedDate, file.createdAt)}</span>
        <div class="files-action">
          <button onclick="deleteDocuments(this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling)" class="delete-file-button"><i class="fa fa-trash" aria-hidden="true"></i> Delete</button>
        </div>
      </li>`;
      
      // console.log(new Date().getTime() - file.createdAt.getTime());
    });
  } else {
    fileList.innerHTML = `
      There's nothing here. Create a new one.<br />
      <button id="new-file-button" onclick="document.querySelector('#new-document-modal').style.display = 'flex';"><i class="fa fa-plus"></i> New file</button>`;
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