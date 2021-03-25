import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";

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
    { path: "/settings", view: Settings },
  ];

  // test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });
  // looking through the array trying to find a match to a condition
  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  // in case of no match
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }
  // creating a new instance of the view from the match route (that have routes and views)
  const view = new match.route.view();

  // getting HTML from through the method and injecting in #app element
  document.querySelector("#app").innerHTML = await view.getHtml();

  console.log("potentialMatches: ", potentialMatches);
  console.log("match: ", match);
  console.log("match.route.view: ", match.route.view);
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
