const baseURL = "https://jsonplaceholder.typicode.com/";
const btn = document.querySelector(".btn");
const inpEle = document.querySelector("input");
const output = document.querySelector(".output");
const container = document.querySelector(".container");
const output1 = addEle(container, "div", "");
output1.classList.add("container1");
const btn2 = addEle(output1, "button", "add Item");
const input1 = addEle(output1, "input", "");
input1.setAttribute("type", "text");
input1.setAttribute("placeholder", "title");
const input2 = addEle(output1, "input", "");
input2.setAttribute("type", "text");
input2.setAttribute("placeholder", "body");
inpEle.value = 1;
inpEle.classList.add("num");
inpEle.setAttribute("type", "number");
btn.textContent = "Select Post ID";
const btn1 = addEle(output1, "button", "Load All Posts");
btn1.style.display = "block";

btn.addEventListener("click", loadData);
btn1.addEventListener("click", loadAll);
btn2.addEventListener("click", addItem);

function addItem() {
  const title = input1.value || "Title";
  const body = input1.value || "Body Contents";
  const json = {
    title: title,
    body: body,
    userId: 1,
  };
  const url = baseURL + "posts/";
  makeReq(json, "POST", url);
}

function makeReq(json, meth, url) {
  fetch(url, {
    method: meth,
    body: JSON.stringify(json),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      addtoPage(data);
    });
}

function loadAll(e) {
  console.log("ready");
  const url = baseURL + "posts/";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      addItems(data);
    });
}

function addItems(json) {
  output.innerHTML = "";
  json.forEach((element) => {
    addtoPage(element);
  });
}

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
  const delButton = addEle(output, "button", "Delete Item №" + info.id);
  delButton.addEventListener("click", (e) => {
    fetch(baseURL + "posts/1", {
      method: "DELETE",
    });
    main.remove();
    delButton.remove();
  });

  main.classList.add("box");
  let html = `<h1 class="editme">${info.title}</h1>`;
  html += `<p class="editme">${info.body}</p>`;
  html += `<small>ID: ${info.id} - UserID: ${info.userId}</small>`;
  const item = addEle(main, "div", html);
  item.addEventListener(
    "click",
    (e) => {
      console.log(info.id);
      main.classList.add("active");
      const saver = addEle(main, "button", "Save to Server");
      const eles = main.querySelectorAll(".editme");
      eles.forEach((el) => {
        el.setAttribute("contenteditable", true);
      });
      saver.addEventListener(
        "click",
        (e) => {
          const tempObj = {
            title: eles[0].textContent,
            body: eles[1].textContent,
            id: info.id,
            userId: info.userId,
          };
          eles.forEach((el) => {
            el.setAttribute("contenteditable", false);
          });
          // makeReq(tempObj, "PUT");
          putItem(tempObj);
          main.classList.remove("active");
          saver.remove();
        },
        {
          once: true,
        }
      );
    },
    {
      once: true,
    }
  );
}
function putItem(json) {
  console.log(json.id);
  console.log(json);
  const url = baseURL + "posts/" + json.id;
  makeReq(json, "PUT", url);
}

function addEle(parent, t, html) {
  const ele = document.createElement(t);
  parent.prepend(ele);
  ele.innerHTML = html;
  return ele;
}
