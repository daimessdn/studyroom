document.addEventListener("DOMContentLoaded",
                          getDocuments(files));

document.fileAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  addFile(document.fileAdd.filename.value);
  document.fileAdd.style.display = "none";
});