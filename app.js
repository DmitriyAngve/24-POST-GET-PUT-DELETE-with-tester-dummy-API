const btn = document.querySelector(".btn");
const inpEle = document.querySelector("input");
const output = document.querySelector(".output");
const myForm = document.querySelector("form");

inpEle.value = "Hello World";

btn.addEventListener("click", loadData);

function loadData(e) {
  console.log("ready");
}
