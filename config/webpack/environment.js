const { environment } = require("@rails/webpacker");

const opusMediaRecorderEncoderWorkerLoader = {
  test: /opus-media-recorder\/encoderWorker\.js$/,
  loader: "worker-loader"
};
const opusMediaRecorderWasmLoader = {
  test: /opus-media-recorder\/.*\.wasm$/,
  type: "javascript/auto",
  loader: "file-loader"
};

environment.loaders.prepend(
  "opusMediaRecorderEncoderWorkerLoader",
  opusMediaRecorderEncoderWorkerLoader
);
environment.loaders.prepend(
  "opusMediaRecorderWasmLoader",
  opusMediaRecorderWasmLoader
);

module.exports = environment;
