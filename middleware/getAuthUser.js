import { actionTypes } from "../store";

export default async function({ app, $axios, store }) {
  const user = store.getters["user"];

  if (!user) {
    const wa_temp_token = app.$cookies.get("wa_temp_token");
    if (wa_temp_token) {
      const res = await $axios
        .$get("user/profile")
        .catch(err => console.log({ err }));
      if (res && res.data) {
        store.dispatch(actionTypes.SET_USER, res.data);
      }
    }
  }
}
