import Vue from "vue";
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
    id: 'UA-153845471-1', checkDuplicatedScript: true,
    autoTracking: {
        pageviewOnLoad: false,
    }
})