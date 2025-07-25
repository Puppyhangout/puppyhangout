import { AlertColor } from "@mui/material";
import { observable } from "mobx";
import {
  load_from_local_storage,
  shared_store_prop,
} from "./helpers/local_storage";

export const store = observable({
  toast: {
    toast_content: "",
    toast_severity: "success" as AlertColor,
    toast_auto_hide_duration: 0,
    toast_is_open: false,
  },
  shared: load_from_local_storage(shared_store_prop, {
    tab: "Login" as
      | "Login"
      | "Signup"
      | "Settings"
      | "Chat"
      | "Contact"
      | "About"
      | "Sitters"
      | "Home"
      | "Guide"
      | "Puppies",
    token: "",
    user: null as any,
    email: "",
    first_name: "",
    password: "",
    max_match_dist: 8888,
  }),
  signup: {
    has_puppy: false,
    users: [
      {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        user_info: [
          {
            photo_url: "",
            lat: "",
            lng: "",
            user_description: "",
          },
        ],
        puppies: [
          {
            name: "",
            breed: "",
            size: "",
            photos: [
              {
                url: "",
              },
            ],
          },
        ],
      },
    ],
  },
  home: {
    puppies: [],
  },
  sitters_list: {
    user_info: [],
  },
  puppies_list: {
    puppies: [],
  },
  chats: {
    users: [] as any[],
  },
  settings: {
    form: {
      original: {} as any,
      modified: {} as any,
    },
  },
  chat: {
    to_user: null as any,
    messages: [] as any[],
    pending_message: "",
    unread_message_count: 0,
    last_visited: null as any,
  },
});
