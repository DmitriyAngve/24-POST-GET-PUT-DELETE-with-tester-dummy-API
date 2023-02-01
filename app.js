const btn = document.querySelector(".btn");
const inpEle = document.querySelector("input");
const output = document.querySelector(".output");
inpEle.value = 1;
inpEle.classList.add("num");
inpEle.setAttribute("type", "number");
btn.textContent = "Select Post ID";
btn.addEventListener("click", loadData);
const baseURL = "https://jsonplaceholder.typicode.com/";

function loadData(e) {
  console.log("ready");
  const url = baseURL + "posts/" + inpEle.value;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      addtoPage(data);
    });
}

function addtoPage(info) {
  console.log(info);
  const main = addEle(output, "div", "");
  let html = `<h1>${info.title}</h1>`;
  html += `<p>${info.body}</p>`;
  html += `<small>ID: ${info.id} - UserID: ${info.userId}</small>`;
  const item = addEle(main, "div", html);
}

function addEle(parent, t, html) {
  const ele = document.createElement(t);
  parent.prepend(ele);
  ele.innerHTML = html;
  return ele;
}
