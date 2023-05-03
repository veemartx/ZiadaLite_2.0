<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { Notify, Report } from "notiflix";
    import { apiBaseUrl } from "../../config/config";
    import axios from "axios";
    import { v4 } from "uuid";
    import AssistedProductCreationModal from "./AssistedProductCreationModal.svelte";
    import AuthToken from "../AuthToken.svelte";
    import { navigate } from "svelte-navigator";
    import { getPermittedTokens, updateCrumbs } from "../../scripts/js/methods";

    import { liveQuery } from "dexie";
    import { db } from "../../db/db";

    let addCreateProductListBtn = false;

    let authTokens = [];

    let localDbStoreUsers = liveQuery(() => db.users.toArray());

    let localDbStorePermissions = liveQuery(() => db.permissions.toArray());

    const RESOURCE = "products";

    const ACTION = "add";

    let showAuthTokenModal = false;

    let authenticatedUser;

    const AUTH_ERROR_MESSAGE =
        "Permission Denied: Action Not Allowed For This User.Check Allowed Permissions On Your Profile For More Details";

    const AUTH_CANCEL_MESSAGE =
        "Addition Authentication Cannot Be Cancelled. Returning";

    let crumbs = {
        title: "Assisted Product Creation",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Create Product",
                url: "/products/new",
            },
        ],
    };

    let showAssistedProductCreationModal = false;

    let productCode;

    let packSize;

    let productName;

    let costPrice;

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
    const authTokenSuccess = () => {
        showAuthTokenModal = false;

        // console.log(authenticatedUser);
    };

    const cancelAuthentication = () => {
        showAuthTokenModal = false;
        navigate("/");
    };

    const clearForm = (id) => {
        let form = document.getElementById(id);

        form.reset();
    };

    const handleCreateProduct = async () => {
        addCreateProductListBtn = true;

        let dt = {
            code: productCode,
            name: productName,
            packSize: packSize,
            costPrice: costPrice,
            init: authenticatedUser.uid,
            pid: v4(),
        };

        try {
            let response = await axios({
                method: "post",
                url: apiBaseUrl + "createProduct.php",
                data: dt,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            let result = response.data;

            // console.log(result);
            alert(result.message);
            if (result.success) {
                // Notify.success(result.message);
                navigate("/products/list");
            }

            addCreateProductListBtn = false;
        } catch (err) {
            console.log(err);

            addCreateProductListBtn = false;
        }
    };

    onMount(async () => {
        updateCrumbs(crumbs);
    });

    showAuthTokenModal = true;
    // console.log(authTokens);
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <!-- the big form -->
            <form
                id="addProductListForm"
                on:submit|preventDefault={handleCreateProduct}
            >
                <div class="mainContainer">
                    <div class="rightCol">
                        <div class="segmentContainer">
                            <div class="titleBar">
                                <div class="title">Product Details</div>
                            </div>

                            <div class="fieldInputs">
                                <div class="fieldInput">
                                    <label for="name">Product Name</label>

                                    <div class="formInput">
                                        <input
                                            type="text"
                                            placeholder="Product Name"
                                            bind:value={productName}
                                            required
                                            min="1"
                                        />
                                    </div>
                                </div>

                                <div class="fieldInput">
                                    <label for="name">Product Code</label>

                                    <div class="formInput">
                                        <input
                                            type="text"
                                            placeholder="Product Code"
                                            bind:value={productCode}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <br />

                            <div class="fieldInputs">
                                <div class="fieldInput">
                                    <label for="name">Pack Size</label>

                                    <div class="formInput">
                                        <input
                                            type="number"
                                            placeholder="0"
                                            bind:value={packSize}
                                            required
                                            min="1"
                                        />
                                    </div>
                                </div>

                                <div class="fieldInput">
                                    <label for="name">Cost Price</label>

                                    <div class="formInput">
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            bind:value={costPrice}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="segmentContainer">
                            <div
                                class=""
                                style="padding:1em;text-align:center;"
                            >
                                <button
                                    class={addCreateProductListBtn
                                        ? "ui teal mini loading button"
                                        : "ui teal mini button"}
                                >
                                    <i class="send icon" /> Create Product
                                </button>

                                <button
                                    type="button"
                                    on:click={() => {
                                        clearForm("addProductListForm");
                                    }}
                                    class="ui red mini button"
                                >
                                    <i class="x icon" /> Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <!-- the big form -->
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

<style>
    .mainContainer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .rightCol {
        flex: 3;
        margin-top: 1em;
    }

    .segmentContainer {
        background: #fff;
        padding: 1em;
    }

    input {
        line-height: 3em !important;
    }
    input:focus {
        border: none !important;
    }

    label {
        padding-bottom: 0.5em;
        font-size: 15px;
        font-weight: 400;
    }

    .fieldInputs {
        display: flex;
    }

    .fieldInput {
        flex: 1;
        margin: 0.4em;
    }

    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @media only screen and (min-width: 640px) {
        .mainContainer {
            display: flex;
            flex-direction: row;
        }

        .rightCol {
            flex: 3;
            padding-left: 0.4em;
            margin-left: 0.1em;
            margin-top: 0;
        }
    }
</style>
