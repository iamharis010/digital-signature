import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: process.env.PORT as unknown as number,
    },
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "./src/components"),
            "@routes": path.resolve(__dirname, "./src/routes"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@data": path.resolve(__dirname, "./src/data"),
        },
    },
});
