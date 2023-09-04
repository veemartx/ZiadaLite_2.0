<script>
    // @ts-nocheck
    import { createEventDispatcher, onMount } from "svelte";
    import { Notify } from "notiflix/build/notiflix-notify-aio";
    import { v4 } from "uuid";
    import { apiBaseUrl } from "../../../config/config";
    import axios from "axios";
    import AuthToken from "../../AuthToken.svelte";
    import { AUTH_ERROR_MESSAGE } from "../../../scripts/js/messages";
    import { liveQuery } from "dexie";
    import { db } from "../../../db/db";
    import { getPermittedTokens } from "../../../scripts/js/methods";

    Notify.init({
        ID: "MKA",
        timeout: 4000,
        showOnlyTheLastOne: true,
        cssAnimationStyle: "from-bottom",
        zindex: 1000000000,
    });

    // auth
    let authenticatedUser;

    let authTokens = [];

    let localDbStoreUsers = liveQuery(() => db.users.toArray());

    let localDbStorePermissions = liveQuery(() => db.permissions.toArray());

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

    let showAuthTokenModal = false;

    const RESOURCE = "products";

    const ACTION = "delete";

    const AUTH_CANCEL_MESSAGE =
        "Addition Authentication Cannot Be Cancelled. Returning";

    let createSubcategoryBtnLoading = false;

    export let category;

    let subcategory;

    let subcategoryType;

    let filteredSubcatgoryParents = [];

    let subcategoryTypes = [
        "Subcategory One",
        "Subcategory Two",
        "Subcategory Three",
    ];

    let subcategoryParent;

    // when ever subcategory type changes
    $: {
        if (subcategoryType == "Subcategory One") {
            subcategoryParent = category.name;
            filteredSubcatgoryParents = [];
        } else if (subcategoryType == "Subcategory Two") {
            let ftp = category.subcategories.filter((v) => {
                if (v.type == "Subcategory One") {
                    return v;
                }
            });

            filteredSubcatgoryParents = ftp;
            console.log(ftp);
        } else if (subcategoryType == "Subcategory Three") {
            let ftp = category.subcategories.filter((v) => {
                if (v.type == "Subcategory Two") {
                    return v;
                }
            });

            filteredSubcatgoryParents = ftp;
            console.log(ftp);
        } else {
            subcategoryParent = null;
            filteredSubcatgoryParents = [];
        }
    }

    const authTokenSuccess = () => {
        showAuthTokenModal = false;

        handleCreateSubCategory();
        // console.log(authenticatedUser);
    };

    const cancelAuthentication = () => {
        showAuthTokenModal = false;
        navigate("/");
    };
    // send message to close modal
    const dispatch = createEventDispatcher();

    function handleSuccess() {
        dispatch("success");
    }

    function cancelModal() {
        dispatch("cancel");
    }

    const handleCreateSubCategory = async () => {
        if (!subcategoryParent) {
            Notify.failure("Subcategory Parent Cannot Be Empty");

            return;
        }

        let dt = {
            category: category.name,
            subcategory: subcategory,
            type: subcategoryType,
            parent: subcategoryParent,
            id: v4(),
            init: "Default",
            initName: "Default",
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}createSubCategory.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            // console.log(res);
            if (res.success) {
                Notify.success(res.message);
            } else {
                Notify.failure(res.message);
            }

            cancelModal();
        } catch (err) {
            console.log(err);
        }
    };

    onMount(() => {
        // console.log(payload);
    });
</script>

<main>
    <div class="wrapper">
        <div class="modal">
            <div class="modalContent segment">
                <div class="titleBar">
                    <div class="title">Create Subcategory</div>
                    <div class="action">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <i
                            on:click={cancelModal}
                            class="cancelModal ri-close-circle-line"
                        />
                    </div>
                </div>
                <div class="contentBar">
                    <br />
                    <div class="createAllowedUploadForm">
                        <form
                            on:submit|preventDefault={() => {
                                // showAuthTokenModal = true;
                                handleCreateSubCategory();
                            }}
                            id="createAllowedUploadForm"
                        >
                            <div class="fieldInput">
                                <div class="field">
                                    <label for="type">Category</label>
                                    <input
                                        type="text"
                                        name="type"
                                        id="name"
                                        placeholder="Category"
                                        bind:value={category.name}
                                        readonly
                                    />
                                </div>
                            </div>

                            <div class="fieldInput">
                                <div class="field">
                                    <label for="type">Type</label>
                                    <select
                                        name="subcategoryType"
                                        id="subcategoryType"
                                        required
                                        bind:value={subcategoryType}
                                    >
                                        <option value=""
                                            >Select Subcategory Type</option
                                        >
                                        {#each subcategoryTypes as st}
                                            <option value={st}>{st}</option>
                                        {/each}
                                    </select>
                                </div>
                            </div>

                            <div class="fieldInput">
                                <div class="field">
                                    <label for="type">Subcategory Parent</label>
                                    <select
                                        name="subcategoryType"
                                        id="subcategoryType"
                                        bind:value={subcategoryParent}
                                    >
                                        <option value=""
                                            >Select Subcategory Parent</option
                                        >
                                        {#each filteredSubcatgoryParents as p}
                                            <option value={p.name}
                                                >{p.name}</option 
                                            >
                                        {/each}
                                    </select>
                                </div>
                            </div>

                            <div class="fieldInput">
                                <div class="field">
                                    <label for="type">Subcategory</label>
                                    <input
                                        type="text"
                                        name="type"
                                        id="name"
                                        placeholder="Subcategory"
                                        bind:value={subcategory}
                                        required
                                    />
                                </div>
                            </div>
                            <div
                                class="fieldInput"
                                style="padding-top: 1.5em;text-align:center;"
                            >
                                <button
                                    class={createSubcategoryBtnLoading
                                        ? "ui teal basic loading icon button"
                                        : "ui teal basic icon button"}
                                    style="line-height:1em;border-radius:5px !important"
                                >
                                    <i class="send icon" /> Create</button
                                >
                            </div>
                        </form>
                    </div>
                </div>
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

<style>
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .fieldInput {
        flex: 1;
        margin: 0.5em;
    }

    .title {
        font-size: 17px;
        font-weight: 600;
    }

    .cancelModal {
        font-size: 22px;
        cursor: pointer;
    }

    .cancelModal:hover {
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
    @media only screen and (min-width: 640px) {
    }
</style>
