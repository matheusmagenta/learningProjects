import ToDoList from "./todolist.js";
import ToDoItem from "./todoitem.js";

const toDoList = new ToDoList();

// Launch app
document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  // add event listeners
  const itemEntryForm = document.getElementById("itemEntryForm");
  itemEntryForm.addEventListener("submit", (event) => {
    // avoid refreshing
    event.preventDefault();
    processSubmission();
  });

  const clearItems = document.getElementById("clearItems");
  clearItems.addEventListener("click", (event) => {
    const list = toDoList.getList();
    if (list.length) {
      const confirmed = confirm(
        "Are you sure you want to clear your entire list?"
      ); // returns a boolean
      if (confirmed) {
        toDoList.clearList();
        // update persistent data
        updatePersistentData(toDoList.getList());
        refreshThePage();
      }
    }
  });
  // procedural

  // load list object
  loadListObject();

  // refresh the page
  refreshThePage();
};

const loadListObject = () => {
  const storedList = localStorage.getItem("myToDoList");
  if (typeof storedList !== "string") return;
  const parsedList = JSON.parse(storedList);
  parsedList.forEach((itemObj) => {
    const newToDoItem = createNewItem(itemObj._id, itemObj._item);
    toDoList.addItemToList(newToDoItem);
  });
};

const refreshThePage = () => {
  clearListDisplay();

  // render the list
  renderList();

  // clear the item entry field
  clearItemEntryField();

  // set focus on item entry field
  setFocusOnItemEntry();
};

const clearListDisplay = () => {
  const parentElement = document.getElementById("listItems");
  deleteContents(parentElement);
};

const deleteContents = (parentElement) => {
  // delete childs of a parent elements
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

const renderList = () => {
  const list = toDoList.getList();
  list.forEach((item) => {
    buildListItem(item);
  });
};

const buildListItem = (item) => {
  // create div.item
  const div = document.createElement("div");
  div.className = "item";
  // create checkbox
  const check = document.createElement("input");
  check.type = "checkbox";
  check.id = item.getId();
  check.tabIndex = 0;

  addClickListenerToCheckBox(check);
  // create label and append it
  const label = document.createElement("label");
  label.htmlFor = item.getId();
  label.textContent = item.getItem();
  div.appendChild(check);
  div.appendChild(label);
  const container = document.getElementById("listItems");
  container.appendChild(div);
};

const addClickListenerToCheckBox = (checkbox) => {
  checkbox.addEventListener("click", (event) => {
    toDoList.removeItemFromList(checkbox.id);
    //remove from persistent data
    updatePersistentData(toDoList.getList());
    // screen reader command
    const removedText = getLabelText(checkbox.id);
    updateScreenReaderConfirmation(removedText, "removed from list");
    //refresh the page after removing
    setTimeout(() => {
      refreshThePage();
    }, 1000);
  });
};

const getLabelText = (checkboxId) => {
  return document.getElementById(checkboxId).nextElementSibling.textContent;
};

const updatePersistentData = (listArray) => {
  localStorage.setItem("myToDoList", JSON.stringify(listArray));
};

const clearItemEntryField = () => {
  document.getElementById("newItem").value = "";
};

const setFocusOnItemEntry = () => {
  document.getElementById("newItem").focus();
};

const processSubmission = () => {
  const newEntryText = getNewEntry();
  if (!newEntryText.length) return;
  const nextItemId = calcNextItemId();
  const toDoItem = createNewItem(nextItemId, newEntryText);
  toDoList.addItemToList(toDoItem);
  //update persistent data
  updatePersistentData(toDoList.getList());
  // screen reader command
  updateScreenReaderConfirmation(newEntryText, "added");
  refreshThePage();
};

const getNewEntry = () => {
  return document.getElementById("newItem").value;
};

const calcNextItemId = () => {
  let nextItemId = 1;
  const list = toDoList.getList();
  if (list.length > 0) {
    nextItemId = list[list.length - 1].getId() + 1;
  }
  return nextItemId;
};

const createNewItem = (itemId, itemText) => {
  const toDo = new ToDoItem();
  toDo.setId(itemId);
  toDo.setItem(itemText);
  return toDo;
};

const updateScreenReaderConfirmation = (newEntryText, actionVerb) => {
  document.getElementById(
    "confirmation"
  ).textContent = `${newEntryText} ${actionVerb}.`;
};
