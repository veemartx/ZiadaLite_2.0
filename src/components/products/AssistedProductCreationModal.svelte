<script>
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";
    import { apiBaseUrl } from "../../config/config";
    import axios from "axios";
    import { Notify } from "notiflix/build/notiflix-notify-aio";
    import { Confirm } from "notiflix";

    Confirm.init({
        className: "notiflix-confirm",
        width: "300px",
        zindex: 400000,
    });

    export let firstLetters = [];

    export let productType;

    let firstLetter = "A";

    export let productsList = []; //the whole dataset

    let filteredProducts = []; //subset of all products

    let currentPageProducts = []; // subset of filteredProducts

    let filterq = "";

    let pageSize = 20;

    let currentPage = 1;

    let totalNumberOfPages = 1;

    let pages = [];

    let offset;

    $: {
        offset = (currentPage - 1) * pageSize;

        currentPageProducts = filteredProducts.slice(offset, offset + pageSize);
    }

    // make pages
    $: {
        if (filteredProducts.length > 0) {
            totalNumberOfPages = filteredProducts.length / pageSize + 1;

            for (let x = 1; x <= totalNumberOfPages; x++) {
                pages.push(x);
            }

            pages = pages;
        }
    }

    //
    $: {
        if (filterq == "") {
            filteredProducts = productsList;
            pages = [];
        } else {
            pages = [];

            let filtered = productsList.filter((p) => {
                if (
                    p.pn.toLowerCase().includes(filterq.toLowerCase()) ||
                    p.pc.toLowerCase().includes(filterq.toLowerCase())
                ) {
                    return p;
                }
            });

            filteredProducts = filtered;
        }
    }

    $: {
        if (productType != "Dead Stock") {
            let filtered = productsList.filter((p) => {
                if (
                    p.pn.toLowerCase().substring(0, 1) ==
                    firstLetter.toLowerCase()
                ) {
                    return p;
                }
            });

            pages = [];

            filteredProducts = filtered;
        }
    }

    // send message to close modal
    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("close");
    }

    function sendSelected(selected) {
        dispatch("selected", selected);
    }

    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="modal">
            <div class="modalContent segment">
                <div class="titleBar">
                    <div class="title">Assisted Product Creation</div>
                    <div class="close closeModal">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <i on:click={closeModal} class="ri-close-line" />
                    </div>
                </div>

                <div class="contentBar">
                    <div class="filterBar">
                        <div class="ui fluid icon  input">
                            <input
                                class="search"
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Type To Search"
                                bind:value={filterq}
                            />
                        </div>
                    </div>

                    {#if productType != "Dead Stock"}
                        <div class="firstLettersCol">
                            {#each firstLetters as fl}
                                <button
                                    on:click={() => {
                                        // reset page
                                        currentPage = 1;

                                        firstLetter = fl;
                                    }}
                                    class={firstLetter == fl
                                        ? "ui green  mini icon button"
                                        : "ui basic mini icon button"}
                                >
                                    {fl}
                                </button>
                            {/each}
                        </div>
                    {/if}

                    <div class="tableContainer">
                        <table
                            class="ui very basic striped compact single line table unstackable"
                        >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Cost Price</th>
                                    <th>PackSize</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each currentPageProducts as p}
                                    <tr>
                                        <td>{p.pn}</td>
                                        <td>{p.pc}</td>
                                        <td>{p.cp}</td>
                                        <td>{p.ps}</td>
                                        <td>
                                            <button
                                                class="ui mini orange basic button"
                                                on:click={() => {
                                                    Confirm.show(
                                                        "Select",
                                                        `Select ${p.pn}?`,
                                                        "Yes",
                                                        "No",
                                                        () => {
                                                            //   logout
                                                            sendSelected(p);
                                                        },
                                                        () => {
                                                            //    cancel
                                                        },
                                                        {}
                                                    );
                                                }}
                                                ><i
                                                    class="plus icon"
                                                />Select</button
                                            >
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>

                        <br />

                        <div class="pagesCol">
                            {#each pages as pg}
                                <button
                                    on:click={() => {
                                        currentPage = pg;
                                    }}
                                    class={currentPage == pg
                                        ? "ui green  mini icon button"
                                        : "ui basic mini icon button"}
                                >
                                    {pg}
                                </button>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .modalContent {
        margin-top: 1em !important;
        position: absolute !important;
        width: 80%;
        height: 90vh;
    }

    .contentBar {
        width: 100%;
        padding-top: 0.5em;
    }

    .firstLettersCol {
        padding-top: 0.5em;
    }

    .search {
        line-height: 1.8em !important;
    }

    .tableContainer {
        margin-top: 0.3em;
        overflow: auto;
    }

    button {
        font-size: x-small;
    }
</style>
