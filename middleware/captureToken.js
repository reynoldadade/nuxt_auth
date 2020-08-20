/**
 * Enforce authentication token requirement before processing any payment
 * Token is passed as request query and should be required and a valid one
 *
 */

export default function({ route, app }) {
  //Get token from route query
  const { token } = route.query;

  if (token) {
    new Promise(res => {
      app.$cookies.remove("s_token");
      //set token to store and cookie for future use.
      app.$cookies.set("s_token", token, {
        path: "/",
        maxAge: 3600,
        sameSite:"none"
      });
      res(true);
    }).then(_ => {
      window.location.replace(route.path);
    });
  }
}
