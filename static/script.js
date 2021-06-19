const dropContainer = document.getElementById("dropContainer");
const fileInput = document.getElementById("fileInput");
const fileChosen = document.getElementById('file-chosen');
dropContainer.ondragover = dropContainer.ondragenter = function(evt) {
  evt.preventDefault();
};



dropContainer.ondrop = function(evt) {
  // pretty simple -- but not for IE :(
  fileInput.files = evt.dataTransfer.files;

  // If you want to use some of the dropped files
  const dT = new DataTransfer();
  dT.items.add(evt.dataTransfer.files[0]);
  fileInput.files = dT.files;
  fileChosen.textContent = dT.files[0].name
  evt.preventDefault();
};

fileInput.addEventListener('change', function(){
  fileChosen.textContent = this.files[0].name
})