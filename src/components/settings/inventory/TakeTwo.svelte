<script>
    import axios from "axios";
    import { createEventDispatcher, onMount } from "svelte";
    import { apiBaseUrl } from "../../../config/config";
    import { getLiuDetails } from "../../../scripts/js/methods";
    import { Notify } from "notiflix";
    // import { async } from "pdfmake/build/pdfmake";

    let dispatch = createEventDispatcher();

    let createProductBtnLoading = false;

    export let products = [];

    const success = () => {
        dispatch("success");
    };

    function cancel() {
        dispatch("cancel");
    }

    let liu = getLiuDetails();

    const handleAddTakeTwo = async () => {
        // console.log(products);

        let dt = {
            products: products,
        };
        try {
            createProductBtnLoading = true;

            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}updateNsProductStockExpiry.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            Notify.success(res.results.length + " Products Updated");

            success();

            createProductBtnLoading = false;
        } catch (err) {
            console.log(err);
        }
    };

    onMount(() => {
        // console.log("hey");
    });
</script>

<main>
    <div class="modal">
        <div class="content">
            <div class="ui segment">
                <div class="titleBar">
                    <div class="title">Take Two Products</div>
                    <div class="actions">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <span
                            on:click={cancel}
                            style="font-size: large;cursor:pointer"
                        >
                            <i class="red x icon" />
                        </span>
                    </div>
                </div>

                <div class="contentBar">
                    {#if products.length > 0}
                        <form
                            class="ui form"
                            on:submit|preventDefault={handleAddTakeTwo}
                        >
                            {#each products as p, i}
                                <div class="two fields">
                                    <div class="field">
                                        <label for="product">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            bind:value={products[i].name}
                                        />
                                    </div>

                                    <div class="field">
                                        <label for="product">Code</label>
                                        <input
                                            type="text"
                                            name="code"
                                            id="code"
                                            bind:value={products[i].code}
                                        />
                                    </div>
                                </div>

                                <div class=" two fields">
                                    <div class="field">
                                        <label for="product">Qty(W)</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            bind:value={products[i].qtyw}
                                            required
                                            placeholder="0"
                                        />
                                    </div>

                                    <div class="field">
                                        <label for="product">Qty(P)</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            bind:value={products[i].qtyp}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            {/each}

                            <div
                                class="field"
                                style="text-align: center;padding-top:1em"
                            >
                                <button class="ui basic teal small button">
                                    <i class="send icon" /> Submit
                                </button>
                            </div>
                        </form>
                    {:else}
                        <div class="errorMessage">
                            <div class="ui error message">
                                No Untaken Products Available At This Moment.
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .modal {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.327);
        backdrop-filter: blur(3px);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content {
        width: 90%;
        max-height: 70vh;
        overflow: auto;
    }

    .field {
        margin: 1em !important;
    }

    input {
        width: 90% !important;
    }
    @media only screen and (min-width: 640px) {
        .content {
            width: 40em;
        }
    }
</style>
