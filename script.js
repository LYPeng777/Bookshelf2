
let books = JSON.parse(localStorage.getItem("books") || "[]");

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function renderBooks() {
  document.getElementById("tbr").innerHTML = "";
  document.getElementById("read").innerHTML = "";

  books.forEach((book, i) => {
    const el = document.createElement("div");
    el.className = "book";
    el.draggable = true;
    el.dataset.index = i;
    el.title = book.title;
    el.ondragstart = drag;
    (book.status === "read" ? read : tbr).appendChild(el);
  });
}

document.getElementById("bookForm").onsubmit = function(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const file = document.getElementById("cover").files[0];
  const reader = new FileReader();
  reader.onload = function() {
    books.push({ title, cover: reader.result, status: "tbr" });
    saveBooks();
    renderBooks();
  };
  reader.readAsDataURL(file);
};

function allowDrop(e) {
  e.preventDefault();
}

function drag(e) {
  e.dataTransfer.setData("index", e.target.dataset.index);
}

function drop(e) {
  e.preventDefault();
  const i = e.dataTransfer.getData("index");
  const shelf = e.target.id;
  books[i].status = shelf;
  saveBooks();
  renderBooks();
}

renderBooks();
