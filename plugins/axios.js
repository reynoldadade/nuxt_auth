let defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export default function({ app, $axios, redirect, store, env, route }) {
  $axios.onRequest(({ headers }) => {
    const token = app.$cookies.get("wa_temp_token");
    if (token) {
      defaultHeaders = { ...defaultHeaders, Authorization: `Bearer ${token}` };
      headers.common = { ...headers.common, ...defaultHeaders };
    }
  });

  $axios.onError(error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          const redirectAuthURL = `${env.LOGIN_URL}?redirect_url=${env.APP_URL}${route.path}&expect_token=true&refresh_token=true`;
          return redirect(redirectAuthURL);
        case 404:
          return store.dispatch("addNotification", {
            message: "API resource not found : 404",
            type: "error"
          });
        case 403:
          let message = "This action not allowed at the moment!";
          if (error.response.data) {
            if (error.response.data.message) {
              message = error.response.data.message;
            } else if (error.response.data.data) {
              message = error.response.data.data.message;
            }
          }
          return store.dispatch("addNotification", { message, type: "error" });
        case 500:
          return store.dispatch("addNotification", {
            message: "Internal server error",
            type: "error"
          });
      }
    }
    //  else {
    //   console.log({ error });
    //   return redirect("/session-down");
    // }
  });
}
