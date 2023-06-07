<script>
    // @ts-nocheck
    import { liveQuery } from "dexie";
    import { db } from "../../db/db";
    import { createEventDispatcher, onMount } from "svelte";
    import { getPermittedTokens } from "../../scripts/js/methods";
    import AuthToken from "../AuthToken.svelte";
    import { AUTH_ERROR_MESSAGE } from "../../scripts/js/messages";
    import Adjust from "./Adjust.svelte";
    import SaleEdit from "./SaleEdit.svelte";
    import Request from "./Request.svelte";

    // constants
    const RESOURCE = "products";

    const ACTION = "edit";

    const AUTH_CANCEL_MESSAGE = "Authentication Cancelled By User.";

    // props
    export let product;

    // vars
    let authTokens = [];

    let currentAuthAction;

    let showAuthTokenModal = false;

    let showAdjustModal = false;

    let showSaleEditModal = false;

    let showRequestModal = false;

    let showTransferModal = false;

    let authenticatedUser;

    let localDbStoreUsers = liveQuery(() => db.users.toArray());

    let localDbStorePermissions = liveQuery(() => db.permissions.toArray());

    // state changes
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

    // methods
    const dispatch = createEventDispatcher();

    const authTokenSuccess = () => {
        showAuthTokenModal = false;

        switch (currentAuthAction) {
            case "adjust":
                showAdjustModal = true;

                break;

            case "saleEdit":
                showSaleEditModal = true;

                break;

            case "request":
                showRequestModal = true;

                break;

            default:
                break;
        }
    };

    const cancelAuthentication = () => {
        showAuthTokenModal = false;
    };

    const triggerUpdate = () => {
        dispatch("update");
    };

    onMount(() => {
        console.log(product);
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="titleBar">
                <div class="title">Actions</div>
            </div>
            <div class="actionsCol">
                <button
                    on:click={() => {
                        currentAuthAction = "adjust";
                        showAuthTokenModal = true;
                    }}
                    class="basic ui orange icon small button"
                >
                    <i class="edit icon" /> Adjust
                </button>

                <button
                    on:click={() => {
                        currentAuthAction = "saleEdit";
                        showAuthTokenModal = true;
                    }}
                    class="basic ui green icon small button"
                >
                    <i class="edit icon" /> Sale Edit
                </button>

                {#if product.booked != "1"}
                    <button
                        on:click={() => {
                            currentAuthAction = "request";
                            showAuthTokenModal = true;
                        }}
                        class="basic ui blue icon small button"
                    >
                        <i class="download icon" /> Request
                    </button>
                {/if}

                <button class="basic ui teal icon small button">
                    <i class="upload icon" /> Transfer
                </button>

                <button class="basic ui red icon small button">
                    <i class="trash icon" /> Delete
                </button>
            </div>
        </div>
    </div>
</main>

<!-- auth token modal  -->
{#if showAuthTokenModal}
    <AuthToken
        bind:authenticatedUser
        payload={authTokens}
        errorMessage={AUTH_ERROR_MESSAGE}
        cancelMessage={AUTH_CANCEL_MESSAGE}
        on:success={authTokenSuccess}
        on:cancel={cancelAuthentication}
    />
{/if}

<!-- auth token modal  -->

<!-- adjust modal -->
{#if showAdjustModal}
    <Adjust
        {product}
        bind:authenticatedUser
        on:cancel={() => {
            showAdjustModal = false;
        }}
        on:success={() => {
            showAdjustModal = false;
            triggerUpdate();
        }}
    />
{/if}
<!-- adjust modal -->

<!-- sale edit modal -->
{#if showSaleEditModal}
    <SaleEdit
        {product}
        bind:authenticatedUser
        on:cancel={() => {
            showSaleEditModal = false;
        }}
        on:success={() => {
            showSaleEditModal = false;
            triggerUpdate();
        }}
    />
{/if}
<!-- sale edit modal -->

<!-- request modal -->
{#if showRequestModal}
    <Request
        {product}
        bind:authenticatedUser
        on:cancel={() => {
            showRequestModal = false;
        }}
        on:success={() => {
            showRequestModal = false;
            triggerUpdate();
        }}
    />
{/if}

<!-- request modal -->

<style>
    .title {
        font-size: 14px;
        color: var(--ziada-green);
        font-weight: 400;
        font-family: "Roboto", sans-serif;
    }

    .actionsCol {
        padding-top: 1em;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .actionsCol button {
        margin: 0.5em !important;
        width: 8em !important;
    }

    @media only screen and (min-width: 640px) {
        .actionsCol {
            padding-top: 1em;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
        }
    }
</style>
