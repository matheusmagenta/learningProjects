// selecting elements
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

// functions
// searching by song or artist
async function searchSongs(searchTerm) {
  /*   fetch(`${apiURL}/suggest/${searchTerm}`)
    .then((response) => response.json())
    .then((data) => console.log(data)); */
  const response = await fetch(`${apiURL}/suggest/${searchTerm}`);
  const data = await response.json();
  console.log(data);

  showData(data);
}

// showing song and artist in DOM
function showData(data) {
  /*   let output = "";

  data.data.forEach((song) => {
    output += `
            <li>
                <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
            </li>
        `;
  });

  result.innerHTML = `
    <ul class="songs">
        ${output}
    </ul>
  `; */

  result.innerHTML = `
    <ul class="songs">
        ${data.data
          .map(
            (song) => `
        <li>
            <span><strong>${song.artist.name}</strong> - ${song.title}</span>
            <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </li>
        `
          )
          .join("")}
    </ul>
  `;
  //pagination
  if (data.prev || data.next) {
    more.innerHTML = `
    ${
      data.prev
        ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
        : ""
    }
    ${
      data.next
        ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
        : ""
    }
    `;
  } else {
    more.innerHTML = "";
  }
}

// pagination function, prev and next song results
async function getMoreSongs(url) {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await response.json();
  showData(data);
}

// getting lyrics for song function
async function getLyrics(artist, songTitle) {
  const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await response.json();

  // inserting linebreak
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  // inserting in the DOM
  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2><span>${lyrics}</span>`;

  // clearing pagination
  more.innerHTML = "";
}

// event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // get value searched
  const searchTerm = search.value.trim();

  // form validation
  if (!searchTerm) {
    alert("please type in a search term");
  } else {
    // search with value
    searchSongs(searchTerm);
  }
});

// get lyrics button click
result.addEventListener("click", (e) => {
  // selecting clicked element
  const clickedEl = e.target;

  // getting artist and song name from element clicked
  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});
