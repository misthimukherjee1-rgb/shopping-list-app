const input = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const listEl = document.getElementById("list");
const clearDoneBtn = document.getElementById("clearDoneBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

// Load saved items
let items = JSON.parse(localStorage.getItem("shopping_items") || "[]");

function save() {
  localStorage.setItem("shopping_items", JSON.stringify(items));
}

function render() {
  listEl.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");
    if (item.done) li.classList.add("done");

    const left = document.createElement("div");
    left.className = "left";

    const label = document.createElement("span");
    label.textContent = item.text;

    const pill = document.createElement("span");
    pill.className = "pill";
    pill.textContent = item.done ? "Done" : "To buy";

    left.appendChild(label);
    left.appendChild(pill);

    const actions = document.createElement("div");
    actions.className = "actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "iconBtn";
    toggleBtn.textContent = item.done ? "↩️" : "✅";
    toggleBtn.title = "Toggle done";
    toggleBtn.onclick = () => {
      items[index].done = !items[index].done;
      save();
      render();
    };

    const delBtn = document.createElement("button");
    delBtn.className = "danger";
    delBtn.textContent = "🗑️";
    delBtn.title = "Delete";
    delBtn.onclick = () => {
      items.splice(index, 1);
      save();
      render();
    };

    actions.appendChild(toggleBtn);
    actions.appendChild(delBtn);

    li.appendChild(left);
    li.appendChild(actions);
    listEl.appendChild(li);
  });
}

function addItem() {
  const text = input.value.trim();
  if (!text) return;

  items.unshift({ text, done: false });
  input.value = "";
  save();
  render();
  input.focus();
}

addBtn.addEventListener("click", addItem);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addItem();
});

clearDoneBtn.onclick = () => {
  items = items.filter(i => !i.done);
  save();
  render();
};

clearAllBtn.onclick = () => {
  items = [];
  save();
  render();
};

render();
