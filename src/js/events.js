document.addEventListener("DOMContentLoaded",
                          getDocuments(files));

document.fileAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  
  addFile(document.fileAdd.filename.value);
  
  document.fileAdd.style.display = "none";
});

document.addEventListener("keydown", (event) => {
  if (event.key == "s" && event.ctrlKey) {
    event.preventDefault();
    
    saveDocument(openedFile);
    
    console.log("Document saved");
  }
}, false);