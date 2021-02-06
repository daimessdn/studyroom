const boldIcon = () => {
  let element = document.createElement("strong");

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
}

const italicIcon = () => {
  let element = document.createElement("em");

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
}

const underlineIcon = () => {
  let element = document.createElement("u");

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
}

const strikeThroughIcon = () => {
  let element = document.createElement("s");

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
}

const subScriptIcon = () => {
  let element = document.createElement("sub");

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
}

const superScriptIcon = () => {
  let element = document.createElement("sup");

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  }
}

const headerIcon = (hnum) => {
  if (getSelectionStart().parentNode == editorContent) {
    switchBetweenElements(getSelectionStart(), document.createElement(`h${hnum}`));
  }
}

const paragraphIcon = () => {
  if (getSelectionStart().parentNode == editorContent) {
    switchBetweenElements(getSelectionStart(), document.createElement("p"));
  }
}

const textAlignIcon = (alignment) => {
  if (getSelectionStart().parentNode == editorContent) {
    getSelectionStart().style.textAlign = alignment;
  }
}

const listIcon = (ordered) => {
  if (ordered === true) {
    list = document.createElement("ol");
  } else {
    list = document.createElement("ul");
  }

  if (getSelectionStart().parentNode == editorContent) {
    switchBetweenElements(getSelectionStart(), list);
    list.innerHTML = `<li></li>`;
    list.focus();
  }
}

const codeIcon = (ordered) => {
  code = document.createElement("pre");

  if (getSelectionStart().parentNode == editorContent) {
    switchBetweenElements(getSelectionStart(), code);
    code.innerHTML = `<code></code>`;
    code.focus();
  }
}

const switchBetweenElements = (oldElement, newElement) => {
  for (let i = 0; i < oldElement.attributes.length; i++) {
    newElement.setAttribute(oldElement.attributes.item(i).nodeName, oldElement.attributes.item(i).nodeName);
  }

  newElement.innerHTML = oldElement.innerHTML;

  oldElement.parentNode.replaceChild(newElement, oldElement);
}