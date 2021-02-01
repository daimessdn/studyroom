let fileList = document.querySelector("#file-list"),
        fileElements,
        files = [{
                  "id": "document-recipe_for_dinner-0",
                  "filename": "recipe for dinner",
                  "content": "tenderloin steak, vinegar, shoyu, bean, egg, carrot.",
                  "createdAt": "2021-02-01T11:53:41.975Z",
                  "lastSave": null
                },
                {
                  "id": "document-my_new_files-1",
                  "filename": "my new files",
                  "content": "hello world!",
                  "createdAt": "2021-02-01T11:55:57.674Z",
                  "lastSave": null
                }];

let editor = document.querySelector("#editor");

const addFile = (filename) => {
  if (filename != "") {
    files.push({
      id: `document-${filename.split(" ").join("_")}-${files.length}`,
      filename: filename,
      content: null,
      createdAt: new Date(),
      lastSave: null
    });
  }

  getDocuments(files);
  document.fileAdd.filename.value = "";
};

const deleteDocuments = (element) => {
  console.log(JSON.stringify(element.textContent));
  files = files.filter(file => {
    return (file.filename + " x") != `${element.textContent}`;
  });

  getDocuments(files);
};

const getDocuments = (files) => {
  fileList.innerHTML = "";

  let loadedDate = new Date();

  if (files.length > 0) {
    files.reverse().forEach(file => {
      fileList.innerHTML += `
      <li draggable="true"
          ondragstart="drag(event)"
          ondblclick="openDocumentInEditor('${file.filename}')"
          id="${file.id}">
        <span class="files-filename">${file.filename}</span> <br />
        <span class="files-datecreated">Created ${getFileHistory(loadedDate, file.createdAt)}</span>
        <b onclick="deleteDocuments(this.parentElement);">x</b>
      </li>`;
      
      // console.log(new Date().getTime() - file.createdAt.getTime());
    });
  } else {
    fileList.innerHTML = "There's nothing here. Create a new one.";
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
  } else {
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
  ev.target.appendChild(document.getElementById(data).cloneNode(true));
}