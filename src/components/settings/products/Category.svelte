<script>
    // @ts-nocheck

    import axios from "axios";
    import CreateSubcategory from "./CreateSubcategory.svelte";
    import { apiBaseUrl } from "../../../config/config";
    import { Confirm, Notify } from "notiflix";
    import { formatDate, getCurrentEntity } from "../../../scripts/js/methods";
    import { onMount } from "svelte";

    import AuthToken from "../../AuthToken.svelte";
    import { AUTH_ERROR_MESSAGE } from "../../../scripts/js/messages";
    import { liveQuery } from "dexie";
    import { db } from "../../../db/db";
    import { getPermittedTokens } from "../../../scripts/js/methods";

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

    let currentDeletionSubCategory;

    let showCreateSubCategoryModal = false;

    let category;

    const authTokenSuccess = () => {
        showAuthTokenModal = false;

        deleteSubcategory();
        // console.log(authenticatedUser);
    };

    const cancelAuthentication = () => {
        showAuthTokenModal = false;
        navigate("/");
    };

    const showCreateSubCategory = () => {
        showCreateSubCategoryModal = true;
    };

    const hideCreateSubCategory = () => {
        showCreateSubCategoryModal = false;

        getCategory();
    };

    const deleteSubcategory = async () => {
        let dt = {
            id: currentDeletionSubCategory,
            init: authenticatedUser.uid,
            initName: authenticatedUser.name,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}deleteSubcategory.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            // console.log(res);
            if (res.success) {
                Notify.success(res.message);

                getCategory();
            } else {
                Notify.failure(res.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getCategory = async () => {
        let dt = {
            id: getCurrentEntity(window.location.href),
        };

        const response = await axios({
            method: "POST",
            data: dt,
            url: `${apiBaseUrl}getCategory.php`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const res = response.data;

        category = res;
    };

    onMount(() => {
        getCategory();
    });
</script>

<main>
    <div class="wrapper">
        <div class="titleBar">
            <div class="title">Category</div>
            <div class="action">
                <button
                    on:click={showCreateSubCategory}
                    class="ui basic icon green mini button"
                >
                    <i class="plus icon" />
                </button>
            </div>
        </div>

        <br />
        <div class="contentBar">
            <div class="subtitleBar">
                <b> Subcategories </b>
            </div>

            <table class="ui very basic striped unstackable table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Subcategory</th>
                        <th>Type</th>
                        <th>Parent</th>
                        <th>Created</th>
                        <th>Created By</th>
                        <!-- <th>Delete</th> -->
                    </tr>
                </thead>

                {#if category}
                    <tbody>
                        {#each category.subcategories as sc, i}
                            <tr>
                                <td>{i + 1}</td>
                                <td>{sc.name.toLowerCase()}</td>
                                <td>{sc.type}</td>
                                <td>{sc.parent}</td>
                                <td>{formatDate(sc.created)}</td>
                                <td>{sc.createdBy}</td>
                                <!-- <td>
                                    <span
                                        on:click={() => {
                                            Confirm.show(
                                                `Delete  Subcategory`,
                                                `Delete ${sc.name}?`,
                                                "Ok",
                                                "Cancel",
                                                () => {
                                                    currentDeletionSubCategory =
                                                        sc.id;
                                                    showAuthTokenModal = true;
                                                }
                                            );
                                        }}
                                        style="font-size: large;cursor:pointer"
                                    >
                                        <i class="red trash icon" />
                                    </span>
                                </td> -->
                            </tr>
                        {/each}
                    </tbody>
                {/if}
            </table>
        </div>
    </div>
</main>

<!-- modal  -->
{#if showCreateSubCategoryModal}
    {#if category}
        <CreateSubcategory {category} on:cancel={hideCreateSubCategory} />
    {/if}
{/if}
<!-- modal  -->
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
