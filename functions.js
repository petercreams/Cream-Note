function format(command, value) {
  document.execCommand(command, false, value);
}

var text;

function destroyClickedElement(event) {
  document.body.removeChild(event.target);
}

function saveDocument() {
  var documentContent = document.querySelector(".textBox").innerHTML;
  var objmap = { text: documentContent };
  text = JSON.stringify(objmap);
  console.log("saved");
}

function saveTextAsFile() {
  saveDocument();
  var textToWrite = text;
  var textFileAsBlob = new Blob([textToWrite], { type: "application/json" });
  var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null) {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  } else {
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();
}

function loadFileAsText() {
  var fileToLoad = document.getElementById("fileToLoad").files[0];

  var fileReader = new FileReader();
  fileReader.onload = (fileLoadedEvent) => {
    var textFromFileLoaded = fileLoadedEvent.target.result;

    var obj = JSON.parse(textFromFileLoaded);
    document.querySelector(".textBox").innerHTML = obj.text;
  };
  fileReader.readAsText(fileToLoad, "UTF-8");
}