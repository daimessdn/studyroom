document.addEventListener("DOMContentLoaded",() => {
  if (localStorage.getItem("files") === null) {
    console.log("There is no files storage there. Creating...");
    localStorage.setItem("files", JSON.stringify([]));

    console.log("There is no recycle bin storage there. Creating...");
    localStorage.setItem("recycleBin", JSON.stringify([]));
  }

  localStorage.setItem("openedFile", "");

  files = JSON.parse(localStorage.getItem("files"));
  recycleBin = JSON.parse(localStorage.getItem("recycleBin"));

  files.forEach(file => {
    file.createdAt = new Date(file.createdAt);
    file.lastSave = new Date(file.lastSaved);
  });

  recycleBin.forEach(file => {
    file.createdAt = new Date(file.createdAt);
    file.lastSave = new Date(file.lastSaved);
  });

  getDocuments(files);
  getRecycledDocuments(recycleBin)
});

document.fileAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  
  addFile(document.fileAdd.filename.value);
  
  document.querySelector('#new-document-modal').style.display = 'none';
});

document.addEventListener("keydown", (event) => {
  if (event.key == "s" && event.ctrlKey) {
    event.preventDefault();
    
    saveDocument(openedFile);
    
    console.log("Document saved");
  } else if (event.key == "b" && event.ctrlKey) {
    event.preventDefault();
    
    console.log(window.getSelection());
    boldIcon();
    
    console.log("Text bold saved");
  } else if (event.key == "i" && event.ctrlKey) {
    event.preventDefault();
    
    console.log(window.getSelection());
    italicIcon();
    
    console.log("Text italic saved");
  } else if (event.key == "u" && event.ctrlKey) {
    event.preventDefault();
    
    console.log(window.getSelection());
    underlineIcon();
    
    console.log("Text underline saved");
  }
  // text alignment case
  else if (event.key == "j" && event.ctrlKey) {
    event.preventDefault();
    textAlignIcon("justify");
  } else if (event.key == "l" && event.ctrlKey) {
    event.preventDefault();
    textAlignIcon("left");
  } else if (event.key == "r" && event.ctrlKey) {
    event.preventDefault();
    textAlignIcon("right");
  } else if (event.key == "e" && event.ctrlKey) {
    event.preventDefault();
    textAlignIcon("center");
  } 
}, false);

if (window.FileList && window.File) {
  editor.addEventListener("dragover", event => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  });

  editor.addEventListener('drop', event => {
    console.log(window.File);
    event.stopPropagation();
    event.preventDefault();

    const fileMetadata = event.dataTransfer.files[0];

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      if (fileMetadata.type == "text/markdown") {
        mdToHtmlContent = new showdown.Converter().makeHtml(event.target.result);
        addFile(fileMetadata.name, mdToHtmlContent);
      } else if (fileMetadata.type == "text/plain") {
        processedText = event.target.result.replace(new RegExp("\n", "g"), "<br />");
        processedText = `<p>${processedText}</p>`;

        addFile(fileMetadata.name, processedText);
      } else {
        addFile(fileMetadata.name, event.target.result);
      }
    })

    reader.readAsText(event.dataTransfer.files[0]);

    showNotificationStatus("success",
                           `Successfully created a document from <strong>${fileMetadata.name}</strong>.`)
  }); 
}

fileSearch.addEventListener("input", (event) => {
  fileList.style.justifyContent = "flex-start";
  fileList.style.alignItems = "flex-start";
  fileList.style.textAlign = "left";

  queryResults = files.filter(file => {
    // console.log(fileElement.children[0].textContent);
    return file.filename.includes(fileSearch.value);
  });

  if (queryResults.length === 0) {
    if (fileSearch.value === "") {
      getDocuments(queryResults);
    } else {
      fileList.innerHTML = `
        <p class="no-file-search-message">
          <img src="src/img/file-not-found.svg" /><br />
          Search not found.
        </p>
      `;

      fileList.style.justifyContent = "center";
      fileList.style.alignItems = "center";
      fileList.style.textAlign = "center";
    }
  } else {
    getDocuments(queryResults);
  }
});

recycleBinSearch.addEventListener("input", (event) => {
  recycleBinList.style.justifyContent = "flex-start";
  recycleBinList.style.alignItems = "flex-start";
  recycleBinList.style.textAlign = "left";

  queryResults = recycleBin.filter(file => {
    // console.log(fileElement.children[0].textContent);
    return file.filename.includes(recycleBinSearch.value);
  });

  if (queryResults.length === 0) {
    if (recycleBinSearch.value === "") {
      getRecycledDocuments(queryResults);
    } else {
      recycleBinList.innerHTML = `
        <p class="no-file-search-message">
          <img src="src/img/file-not-found.svg" /><br />
          Search not found.
        </p>
      `;

      recycleBinList.style.justifyContent = "center";
      recycleBinList.style.alignItems = "center";
      recycleBinList.style.textAlign = "center";
    }
  } else {
    getRecycledDocuments(queryResults);
  }
});
