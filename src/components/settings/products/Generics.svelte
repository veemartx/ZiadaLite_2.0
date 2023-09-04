<script>
    import axios from "axios";
    import CreateCategory from "./CreateCategory.svelte";
    import { apiBaseUrl } from "../../../config/config";
    import { onMount } from "svelte";

    import { Notify } from "notiflix";
    import CreateGeneric from "./CreateGeneric.svelte";
    import { formatDate } from "../../../scripts/js/methods";

    let generics = [];

    let showCreateGenericModal = false;

    const showCreateGeneric = () => {
        showCreateGenericModal = true;
    };

    const hideCreateGeneric = () => {
        showCreateGenericModal = false;
        getGenerics();
    };

    const getGenerics = async () => {
        try {
            let response = await axios({
                method: "POST",
                url: `${apiBaseUrl}getGenerics.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            generics = response.data;

            console.log(generics);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteGeneric = async (genericId) => {
        let dt = {
            id: genericId,
        };

        if (confirm("Delete Selected Property?")) {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}deleteGeneric.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            // console.log(res);
            if (res.success) {
                Notify.success(res.message);

                getGenerics();
            } else {
                Notify.failure(res.message);
            }
        }
    };

    onMount(() => {
        getGenerics();
    });
</script>

<main>
    <div class="wrapper">
        <div class="titleBar">
            <div class="title">Generics (Active Ingredients)</div>
            <div class="action">
                <button
                    on:click={showCreateGeneric}
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
                        <th>Created At</th>
                        <th>Created By</th>
                    </tr>
                </thead>
                <tbody>
                    {#each generics.slice(0, 20) as ct, i}
                        <tr>
                            <td>{i + 1}</td>
                            <td>{ct.name}</td>
                            <td>{formatDate(ct.createdAt)}</td>
                            <td>{ct.createdBy}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</main>

<!-- createCategoryModal  -->
{#if showCreateGenericModal}
    <CreateGeneric on:cancel={hideCreateGeneric} />
{/if}

<!-- createCategoryModal  -->

<style>
    .title {
        font-size: small;
    }
</style>
