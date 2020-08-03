export default function({app,route}){
    const {package_id, payment_type} = route.query;

    if(package_id && payment_type){
        app.$cookies.set("_package_", {package_id,payment_type}, {
          sameSite: "Strict",
          path: "/",
          maxAge: 1800
        });
    }
}