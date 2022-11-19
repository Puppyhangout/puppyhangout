import { orma_mutate, axios_post } from "./api_helpers";
import { wrap_loading } from "./is_loading";
import { store } from "../store";
import { show_toast } from "./helpers";

export const signup = wrap_loading(async (setIsSuccessful, args?) => {
  if (store.signup.users[0]?.user_info[0]?.photo_url.length === 0) {
    show_toast("error", "upload picture please!");
    return;
  }

  if (store.signup.users[0]?.email.length === 0) {
    show_toast("error", "upload email please!");
    return;
  }

  if (store.signup.users[0]?.first_name.length < 3) {
    show_toast("error", "First name not long enough");
    return;
  }

  if (store.signup.users[0]?.last_name.length < 2) {
    show_toast("error", "Last name not long enough");
    return;
  }

  if (store.signup.users[0]?.password.length < 6) {
    show_toast("error", "password not long enough");
    return;
  }

  // @ts-ignore
  if (
    String(store.signup.has_puppy) === "true" &&
    store.signup.users[0]?.puppies?.[0]?.photos?.[0]?.url?.length === 0
  ) {
    show_toast("error", "upload puppy photo please!");
    return;
  }

  store.signup.users[0].user_info[0].lat = args?.coords?.latitude || "1";
  store.signup.users[0].user_info[0].lng = args?.coords?.longitude || "1";

  const response = orma_mutate({
    $operation: "create",
    users: store.signup.users,
  });

  axios_post(`/send_verification_email`, {
    email: store.signup.users[0].email,
  });

  alert(
    "Please confirm your email by clicking the verification link in your inbox"
  );

  show_toast("success", "Signup successful!");

  setIsSuccessful(true);
  return response;
});

// export const signup_update_location = wrap_loading(async (args) => {

// })
