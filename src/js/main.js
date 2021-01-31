let fileList = document.querySelector("#file-list"),
        fileElements,
        files = [];

const addFile = (filename) => {
  if (filename != "") {
    files.push({
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
      <li draggable="true">
        ${file.filename} <br />
        created ${getFileHistory(loadedDate, file.createdAt)}
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