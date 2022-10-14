import "./style.css";

import readXlsxFile from "read-excel-file";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";

const genrate = document.getElementById("upload-btn");
const file = document.getElementById("upload-file");

let list = [];
let sources = [];
file.addEventListener("change", () => {
  readXlsxFile(file.files[0]).then((data) => {
    try {
      data.map((row, index) => {
        list.push(data[(row, index)][0]);
      });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  });
});

genrate.addEventListener("click", () => {
  try {
    list.map((codeText) => {
      sources.push(
        `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${codeText}`
      );
    });
    generateZIP();
  } catch (err) {
    console.log(err);
    alert(err);
  }
});

function generateZIP() {
  var zip = new JSZip();
  var count = 0;
  var zipFilename = "Code.zip";

  sources.forEach(function (url, i) {
    var filename = list[i] + ".png";
    // loading a file and add it in a zip file
    JSZipUtils.getBinaryContent(url, function (err, data) {
      if (err) {
        throw err; // or handle the error
      }
      zip.file(filename, data, { binary: true });
      count++;
      if (count == sources.length) {
        zip.generateAsync({ type: "blob" }).then(function (content) {
          saveAs(content, zipFilename);
        });
      }
    });
  });
}
