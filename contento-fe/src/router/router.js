import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home/index";
import Profile from "@/views/Profile/index";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
  ]
});