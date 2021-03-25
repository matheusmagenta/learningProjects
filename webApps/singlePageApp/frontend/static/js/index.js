import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import Settings from "./views/Settings.js";

// creating regex pattern
const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

// getting params from array after regex match
const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  // combining values and keys
  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

// navigating through history
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  // defining routes
  const routes = [
    // inserting HTML
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/posts/:id", view: PostView },
    { path: "/settings", view: Settings },
  ];

  // test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });
  // looking through the array trying to find a match to a condition
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  // in case of no match
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }
  // creating a new instance of the view from the match route (that have routes and views)
  const view = new match.route.view(getParams(match));

  // getting HTML from through the method and injecting in #app element
  document.querySelector("#app").innerHTML = await view.getHtml();

  //console.log("potentialMatches: ", potentialMatches);
  //console.log("match: ", match);
  //console.log("match.route.view: ", match.route.view);
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  // delegating event
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      // avoids to follow the link and refresh the page
      e.preventDefault();
      // navigate to the actual href of the element itself
      navigateTo(e.target.href);
    }
  });
  router();
});
