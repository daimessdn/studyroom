const openRecycleBin = (element) => {
  if (document.querySelector(".clicked-section-sidebar")) {
    document.querySelector(".clicked-section-sidebar").classList.remove("clicked-section-sidebar");
  }

  fileList.style.display = "none";
  recycleBinList.style.display = "flex";

  element.classList.add("clicked-section-sidebar");
}

const openFileList = (element) => {
  if (document.querySelector(".clicked-section-sidebar")) {
    document.querySelector(".clicked-section-sidebar").classList.remove("clicked-section-sidebar");
  }

  fileList.style.display = "flex";
  recycleBinList.style.display = "none";

  element.classList.add("clicked-section-sidebar");
}