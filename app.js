// import Tesseract from "tesseract.js";
const screen_btn = document.querySelector(".screen-btn"),
  screenshotPreview = document.querySelector(".src-preview"),
  closeBtn = screenshotPreview.querySelector("#close-btn");
const text = document.querySelector("#text");
let container = document.querySelector(".wrapper");
const captureScreen = async () => {
  try {
    container.classList.add("height");
    const screen = await navigator.mediaDevices.getDisplayMedia();
    const video = document.createElement("video");
    video.addEventListener("loadedmetadata", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.play();
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      screen.getVideoTracks()[0].stop();
      screenshotPreview.querySelector("#img").src = canvas.toDataURL();
      screenshotPreview.classList.add("show");
    });
    video.srcObject = screen;
  } catch (error) {
    alert("Failed to Capture ScreenShot");
    container.classList.remove("height");
  }
};

// const extractText = async () => {
//   try {
//     await Tesseract.recognize(screenshotPreview, "eng", {
//       logger: (m) => console.log(m),
//     }).then(({ data: { text } }) => {
//       console.log(text);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
closeBtn.addEventListener("click", () =>
  screenshotPreview.classList.toggle("show")
);
screen_btn.addEventListener("click", captureScreen);
// text.addEventListener("click", extractText);
