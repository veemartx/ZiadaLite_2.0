import { writable } from 'svelte/store';

export const Crumbs = writable({
    title: "ZiadaLite",
    display: true,
    crumbs: [
        {
            name: "Home",
            url: "/",
        }
    ],
});