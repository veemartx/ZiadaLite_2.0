<script>
    import { Link } from "svelte-navigator";

    export let links = [];
</script>

<main>
    <div class="wrapper">
        <div class="settingsNav">
            {#each links as link}
                <div class="snav">
                    <Link to={link}>
                        <div class="nav">{link}</div>
                    </Link>
                </div>
            {/each}
        </div>
    </div>
</main>

<style>
    .settingsNav {
        display: flex;
    }

    .snav {
        padding: 0.5em;
        background-color: rgba(174, 0, 255, 0.187);
        margin: 0.5em;
        border-radius: 5px;
        font-weight: 600;
    }

    .snav:hover {
        background-color: rgba(174, 0, 255, 0.29);
    }

    .nav {
        font-weight: 600;
        text-transform: capitalize;
    }
</style>
