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
  let element = document.createElement(`h${hnum}`);
  console.log(element);

  if (window.getSelection) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0).cloneRange();

    range.surroundContents(element);
    selection.removeAllRanges();

    selection.addRange(range);
  } else {
    element.textContent = `Heading ${hnum}`;
    editorContent.appendChild(element);
  }
}