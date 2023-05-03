<script>
    // @ts-nocheck

    import { addCommas } from "../scripts/js/methods";

    export let stats = [];
</script>

<main>
    <div class="content">
        {#each stats as s}
            <div class="statWidget">
                <div class="statIcon">
                    <i class={s.icon} />
                </div>
                <div class="statDetails">
                    <div class="statName">{s.name}</div>

                    <div class="statValue">
                        {#if isNaN}
                            {s.value}
                        {:else}
                            {addCommas(parseFloat(s.value), 2)}
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
    .content {
        display: flex;
        flex-wrap: wrap;
    }
    .statWidget {
        border: 1px dotted rgba(152, 152, 152, 0.43);
        border-radius: 5px;
        padding: 0.5em;
        width: 40%;
        display: flex;
        justify-content: space-between;
        margin-inline: 0.5em;
        font-family: "Roboto", sans-serif;
        margin-bottom: 1em;
    }

    .statIcon {
        flex: 1;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .statDetails {
        flex: 3;
        padding-left: 0.4em;
    }
    .statIcon i {
        color: var(--ziada-green);
        font-size: x-large;
        /* vertical-align: middle;
         */
    }

    .statName {
        color: rgb(44, 44, 44);
        font-weight: 400;
    }

    .statValue {
        font-weight: 500;
    }

    @media only screen and (min-width: 640px) {
        .productContainer {
            display: flex;
            flex-direction: row;
        }

        .productDetailCol {
            display: flex;
            margin-top: 0.4em;
            justify-content: space-between;
        }

        .statWidget {
            border: 1px dotted rgba(152, 152, 152, 0.43);
            border-radius: 5px;
            padding: 0.5em;
            width: 20%;
        }
    }
</style>
