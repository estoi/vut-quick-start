import { createRouter, createWebHashHistory } from "vue-router";
import routes from "virtual:generated-pages";
import NProgress from "nprogress";

import "nprogress/nprogress.css";

// routes[0].redirect = "/home";

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (_to, _from, next) => {
    NProgress.start();
    next();
})

router.afterEach((_to) => {
    NProgress.done();
})

export default router;