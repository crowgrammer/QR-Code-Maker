import "./style.css";
import readXlsxFile from "read-excel-file";

const genrate = document.getElementById("upload-btn");
const file = document.getElementById("upload-file");
const wrapper = document.getElementById("qrs");

let list = [];
let sources = [];
file.addEventListener("change", () => {
  readXlsxFile(file.files[0]).then((data) => {
    //console.table(rows);
    data.map((row, index) => {
      list.push(data[(row, index)][0]);
    });
  });
});

genrate.addEventListener("click", () => {
  list.map((codeText) => {
    sources.push(
      `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${codeText}`
    );
  });
  sources.forEach((src) => {
    let qr = document.createElement("img");
    qr.src = src;
    wrapper.appendChild(qr);
  });
});
