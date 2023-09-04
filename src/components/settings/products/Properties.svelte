<script>
    import axios from "axios";
    import CreateCategory from "./CreateCategory.svelte";
    import { apiBaseUrl } from "../../../config/config";
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { formatDate } from "../../../scripts/js/methods";
    import CreateProductProperty from "./CreateProductProperty.svelte";
    import { async } from "pdfmake/build/pdfmake";
    import { Notify } from "notiflix";

    let categories = [];

    let showCreatePropertyModal = false;

    const showCreateProperty = () => {
        showCreatePropertyModal = true;
    };

    const hideCreateProperty = () => {
        showCreatePropertyModal = false;
        getProperties();
    };

    const getProperties = async () => {
        try {
            let response = await axios({
                method: "POST",
                url: `${apiBaseUrl}getProductProperties.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            categories = response.data;

            console.log(categories);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteProperty = async (propertyId) => {
        let dt = {
            id: propertyId,
        };

        if (confirm("Delete Selected Property?")) {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}deleteProperty.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            // console.log(res);
            if (res.success) {
                Notify.success(res.message);

                getProperties();
            } else {
                Notify.failure(res.message);
            }
        }
    };

    onMount(() => {
        getProperties();
    });
</script>

<main>
    <div class="wrapper">
        <div class="titleBar">
            <div class="title">Product Properties</div>
            <div class="action">
                <button
                    on:click={showCreateProperty}
                    class="ui basic icon green mini button"
                >
                    <i class="plus icon" />
                </button>
            </div>
        </div>
        <br />
        <div class="contentBar">
            <table class="ui very basic striped unstackable table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Required</th>
                        <th>Created</th>
                        <th>Status</th>
                        <!-- <th>Remove</th> -->
                    </tr>
                </thead>
                <tbody>
                    {#each categories as ct, i}
                        <tr>
                            <td>{i + 1}</td>
                            <td>{ct.name}</td>
                            <td>{ct.type}</td>
                            <td style="font-weight: 600;">
                                {#if ct.required}
                                    <span style="color: green;"> Yes </span>
                                {:else}
                                    <span style="color: crimson;"> No </span>
                                {/if}
                            </td>
                            <td>{formatDate(ct.created)}</td>
                            <td>{ct.status}</td>
                            <!-- <td>
                                <span
                                    class="remove"
                                    on:click={() => {
                                        handleDeleteProperty(ct.id);
                                    }}
                                >
                                    <i class="trash icon" /> Remove
                                </span>
                            </td> -->
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</main>

<!-- createCategoryModal  -->
{#if showCreatePropertyModal}
    <CreateProductProperty on:cancel={hideCreateProperty} />
{/if}

<!-- createCategoryModal  -->

<style>
    .title {
        font-size: small;
    }

    /* .remove {
        font-weight: 600;
        color: crimson;
        cursor: pointer;
    } */
</style>
