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
  [...richestPeople].forEach((person, index) => {
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
  });
}
