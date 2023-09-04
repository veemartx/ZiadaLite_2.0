<script>
    import axios from "axios";
    import { apiBaseUrl } from "../../../config/config";
    import { onMount } from "svelte";
    import CreateManufacturer from "./CreateManufacturer.svelte";
    import { formatDate } from "../../../scripts/js/methods";

    let manufacturers = [];

    let showCreateBrandModal = false;

    const showCreateBrand = () => {
        showCreateBrandModal = true;
    };

    const hideCreateProperty = () => {
        showCreateBrandModal = false;
        getNsManufacturers();
    };

    const getNsManufacturers = async () => {
        try {
            let response = await axios({
                method: "POST",
                url: `${apiBaseUrl}getNsManufacturers.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            manufacturers = response.data;

            // console.log(brands);
        } catch (err) {
            console.log(err);
        }
    };

    onMount(() => {
        getNsManufacturers();
    });
</script>

<main>
    <div class="wrapper">
        <div class="titleBar">
            <div class="title">Manufacturers</div>
            <div class="action">
                <button
                    on:click={showCreateBrand}
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
                    {#each manufacturers as ct, i}
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
{#if showCreateBrandModal}
    <CreateManufacturer on:cancel={hideCreateProperty} />
{/if}

<!-- createCategoryModal  -->

<style>
    .title {
        font-size: small;
    }
</style>
