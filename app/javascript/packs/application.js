// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start();
require("turbolinks").start();
require("@rails/activestorage").start();
require("channels");
const axios = require("axios");

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
    var options = { mimeType: "audio/webm" };
    const mediaRecorder = new MediaRecorder(stream, options);

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

      var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      chunks = [];

      var uploadFormData = new FormData();
      var csrfParam = document.querySelector("meta[name='csrf-param']").content;
      var csrfToken = document.querySelector("meta[name='csrf-token']").content;
      uploadFormData.append(csrfParam, csrfToken);
      uploadFormData.append("record[voice]", blob);

      axios
        .post("/records", uploadFormData)
        .then(result => {
          console.log(result);
          window.location.reload(true);
        })
        .catch(error => {
          console.log(error);
        });

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
