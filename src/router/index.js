import { route } from "quasar/wrappers";
import { useUserStore } from "src/stores/user-store.js";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    const requiredAuth = to.meta.auth;

    //si existe el token en memoria
    if (userStore.token) {
      return next();
    }

    //sino existe el token
    if (requiredAuth || sessionStorage.getItem("user")) {
      await userStore.refreshToken(); // validar al usuario o token
      if (userStore.token) {
        return next();
      }
      return next("/login");
    }
    return next();
  });

  return Router;
});
