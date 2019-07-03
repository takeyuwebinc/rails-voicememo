// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start();
require("turbolinks").start();
require("@rails/activestorage").start();
require("channels");

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

document.addEventListener("turbolinks:load", init);

function init() {
  if (!navigator.mediaDevices.getUserMedia) return;

  const soundClips = document.querySelector("#js-sound-clips");
  const startButton = document.querySelector("#js-start-recording");
  const stopButton = document.querySelector("#js-stop-recording");

  startButton.disabled = false;
  stopButton.disabled = true;

  const constraints = { audio: true };
  let chunks = [];

  const onSuccess = stream => {
    const mediaRecorder = new MediaRecorder(stream);

    startButton.addEventListener("click", () => {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("recorder started");
      startButton.disabled = true;
      stopButton.disabled = false;
    });

    stopButton.addEventListener("click", () => {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
      startButton.disabled = false;
      stopButton.disabled = true;
    });

    mediaRecorder.onstop = e => {
      console.log("data available after MediaRecorder.stop() called.");

      var clipContainer = document.createElement("article");
      var clipLabel = document.createElement("p");
      var audio = document.createElement("audio");
      clipContainer.classList.add("clip");
      audio.setAttribute("controls", "");

      clipLabel.textContent = Date();

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      soundClips.appendChild(clipContainer);

      audio.controls = true;
      var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      chunks = [];
      var audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
      console.log("recorder stopped");
    };

    mediaRecorder.ondataavailable = e => {
      chunks.push(e.data);
    };
  };

  var onError = err => {
    console.log("The following error occured: " + err);
  };

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
}
