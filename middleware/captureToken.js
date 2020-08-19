/**
 * Enforce authentication token requirement before processing any payment
 * Token is passed as request query and should be required and a valid one
 *
 */

export default function({ route, app }) {
  //Get token from route query
  const { token } = route.query;

  console.log(token);
  if (token) {
    new Promise(res => {
      app.$cookies.remove("token");
      //set token to store and cookie for future use.
      app.$cookies.set("token", token, {
        path: "/",
        maxAge: 3600,
      });
      res(true);
    }).then(_ => {
      window.location.replace(route.path);
    });
  }
}