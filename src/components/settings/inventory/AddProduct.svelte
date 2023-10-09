<script>
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";
    import { Notify } from "notiflix/build/notiflix-notify-aio";
    import AuthToken from "../../AuthToken.svelte";
    import { AUTH_ERROR_MESSAGE } from "../../../scripts/js/messages";
    import { liveQuery } from "dexie";
    import { db } from "../../../db/db";
    import {
        getLiuDetails,
        getPermittedTokens,
    } from "../../../scripts/js/methods";
    import { async } from "pdfmake/build/pdfmake";
    import axios from "axios";
    import { apiBaseUrl } from "../../../config/config";
    import dayjs from "dayjs";
    import Preview from "./Preview.svelte";


    Notify.init({
        ID: "MKA",
        timeout: 4000,
        showOnlyTheLastOne: true,
        cssAnimationStyle: "from-bottom",
        zindex: 1000000000,
    });


    let createProductBtnLoading = false;

    export let searchProduct;

    let showPreview = false;

    let name;

    let code;

    let qty;

    let expiry_date;

    let pack_size;

    let batch;

    let pieces = 0;

    let showBatchError = false;

    let showAuthToken = false;

    let authenticatedUser;

    let authTokens = [];

    let localDbStoreUsers = liveQuery(() => db.users.toArray());

    let localDbStorePermissions = liveQuery(() => db.permissions.toArray());

    let liu = getLiuDetails();

    const RESOURCE = "products";

    const ACTION = "create_products";

    let currentMonth = dayjs().format("MM-YYYY");

    let dispatch = createEventDispatcher();

    $: {
        if ($localDbStoreUsers && $localDbStorePermissions) {
            // get allowed tokens
            authTokens = getPermittedTokens(
                RESOURCE,
                ACTION,
                $localDbStoreUsers,
                $localDbStorePermissions
            );
        }
    }

    // batch on change
    $: {
        if (batch) {
            if (batch.includes(" ")) {
                showBatchError = true;
            } else {
                showBatchError = false;
            }

            console.log(batch.includes(" "));
        } else {
            showBatchError = true;
        }
    }

    function cancel() {
        Notify.warning("Cancelled By User", {
            ID: "MKA",
            timeout: 4000,
            showOnlyTheLastOne: true,
            cssAnimationStyle: "from-bottom",
            zindex: 1000000000,
        });

        dispatch("cancel");
    }

    const success = () => {
        dispatch("success");
    };

    const handleAddProduct = async () => {
        //

        let exp = dayjs(`${expiry_date}-01`)
            .endOf("month")
            .format("YYYY-MM-DD");

        let dt = {
            name: name,
            code: code,
            expiry_date: exp,
            qty: qty,
            batch: batch,
            init: "default",
            pack_size: pack_size,
            pieces: pieces ? pieces : 0,
            branch: liu.b,
        };

        // console.log(dt);
        try {
            createProductBtnLoading = true;

            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}createNsProductStockExpiry.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            // console.log(res);
            if (res.success) {
                Notify.success(res.message);

                success();
            } else {
                Notify.failure(res.message);
            }
            createProductBtnLoading = false;
        } catch (err) {
            console.log(err);
        }
    };

    onMount(() => {
        // console.log(payload);
        name = searchProduct.name;
        code = searchProduct.code;
        pack_size = searchProduct.pack_size;

        // console.log(liu);
    });
</script>

<main>
    <div class="wrapper">
        <div class="modal">
            <div class="modalContent segment">
                <div class="titleBar">
                    <div class="title">Add Product</div>
                    <div class="action">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <i
                            on:click={cancel}
                            class="cancelAuth ri-close-circle-line"
                        />
                    </div>
                </div>
                <div class="contentBar">
                    <br />
                    <div class="authTokenForm">
                        <form
                            on:submit|preventDefault={() => {
                                if (batch.includes(" ")) {
                                    Notify.failure(
                                        "Batch No Cannot Contain Spaces/Special Characters"
                                    );

                                    return;
                                }
                                showPreview = true;
                            }}
                            id="authTokenForm"
                        >
                            <div class="field">
                                <label for="name">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    bind:value={name}
                                    readonly
                                />
                            </div>

                            <div class="field">
                                <label for="name">Product Code</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    bind:value={code}
                                    readonly
                                />
                            </div>

                            <div class="fields">
                                <div class="field">
                                    <label for="name">qty (w)</label>
                                    <input
                                        type="number"
                                        name="qty"
                                        id="qty"
                                        bind:value={qty}
                                        required
                                    />
                                </div>

                                <div class="field">
                                    <label for="name">qty (p)</label>
                                    <input
                                        type="number"
                                        name="pieces"
                                        id="pieces"
                                        bind:value={pieces}
                                    />
                                </div>
                            </div>

                            <div class="fields">
                                <div class="field">
                                    <label for="name">expiry date</label>
                                    <input
                                        type="month"
                                        name="exp"
                                        id="exp"
                                        min={currentMonth}
                                        bind:value={expiry_date}
                                        required
                                    />
                                </div>

                                <div class="field">
                                    <label for="name">Pack Size</label>
                                    <input
                                        type="number"
                                        name="pack_size"
                                        id="pack_size"
                                        bind:value={pack_size}
                                        readonly
                                    />
                                </div>
                            </div>

                            <div class="field">
                                <label for="batch">
                                    Batch
                                    <span
                                        class="showBatchError"
                                        style={showBatchError
                                            ? `display:inline-block`
                                            : `display:none`}
                                    >
                                        <i
                                            >(Cannot Contain Spaces/Special
                                            Characters)</i
                                        ></span
                                    >
                                </label>
                                <input
                                    type="text"
                                    name="batch"
                                    id="batch"
                                    bind:value={batch}
                                    required
                                />
                            </div>

                            <div
                                class="fieldInput"
                                style="padding-top: 1.5em;text-align:center;"
                            >
                                <button
                                    class={createProductBtnLoading
                                        ? "ui teal basic loading icon button"
                                        : "ui teal basic icon button"}
                                    style="line-height:1em;border-radius:5px !important"
                                >
                                    <i class="send icon" /> Send</button
                                >
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<!-- auth token -->
{#if showAuthToken}
    <AuthToken
        bind:authenticatedUser
        errorMessage={AUTH_ERROR_MESSAGE}
        payload={authTokens}
        on:cancel={() => {
            showAuthToken = false;
        }}
        on:success={() => {
            showAuthToken = false;
            handleAddProduct();
        }}
    />
{/if}

<!-- auth token -->

<!-- preview modal  -->
{#if showPreview}
    <Preview
        {name}
        {code}
        {batch}
        {qty}
        {pieces}
        {expiry_date}
        branch={liu.b}
        on:cancel={() => {
            showPreview = false;
        }}
        on:submit={() => {
            handleAddProduct();
        }}
    />
{/if}

<!-- preview modal  -->

<style>
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .field {
        display: flex;
        flex-direction: column;
        margin: 0.5em;
        justify-content: space-between;
    }

    .fieldInput {
        flex-direction: column;
        margin: 0.5em;
    }

    input {
        line-height: 3em;
        color: rgba(0, 0, 0, 0.82);
        width: 100%;
    }

    .title {
        font-size: 22px;
        font-weight: 500;
    }

    .cancelAuth {
        font-size: 22px;
        cursor: pointer;
    }

    .cancelAuth:hover {
        color: crimson;
        transition: 400ms ease-in-out;
        font-size: 24px;
    }

    .segment {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    .modalContent {
        margin-top: -10em;
    }

    .fields {
        display: flex;
        margin-top: 0.5em;
    }

    .showBatchError {
        color: crimson;
        font-weight: 600;
        font-size: x-small;
    }
    @media only screen and (min-width: 640px) {
    }
</style>
