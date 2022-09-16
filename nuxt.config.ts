import Components from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    vite: {
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        "primary-color": "#f43f5e",
                        "border-radius-base": "5px",
                    },
                    javascriptEnabled: true,
                },
            },
        },
        plugins: [
            Components({
                resolvers: [
                    AntDesignVueResolver({
                        importStyle: "less",
                    }),
                ],
            }),
        ],
    },
})
