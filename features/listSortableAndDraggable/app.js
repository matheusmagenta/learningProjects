// selecting elements
const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

// store the listItems
const listItems = [];

// keeping track of draggable items
let dragStartIndex;

createList();

// insert list item into DOM
function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() })) // scrambling original order
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      // creating DOM element
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
     <span class="number">${index + 1}</span>
     <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-line"></i>
     </div>
    `;
      // adding to array to keep track
      listItems.push(listItem);

      // adding to the DOM
      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // getting start index of the element dragged
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}
function dragEnter() {
  this.classList.add("over");
}
function dragLeave() {
  this.classList.remove("over");
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  // getting end index of the element dragged
  const dragEndIndex = +this.getAttribute("data-index");
  // swapping indexes
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

// swapping list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  // selecting both DOM elements
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  // swapping places
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// checking the order of list items of button click
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

// adding event listeners
function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener("dragstart", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
