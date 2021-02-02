document.addEventListener("DOMContentLoaded",
                          getDocuments(files));

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
      } else {
        addFile(fileMetadata.name, event.target.result);
      }
    })

    reader.readAsText(event.dataTransfer.files[0]);
  }); 
}