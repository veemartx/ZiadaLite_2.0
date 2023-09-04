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
    import CreateBrand from "./CreateBrand.svelte";

    let brands = [];

    let showCreateBrandModal = false;

    const showCreateBrand = () => {
        showCreateBrandModal = true;
    };

    const hideCreateProperty = () => {
        showCreateBrandModal = false;
        getNsBrands();
    };

    const getNsBrands = async () => {
        try {
            let response = await axios({
                method: "POST",
                url: `${apiBaseUrl}getNsBrands.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            brands = response.data;

            console.log(brands);
        } catch (err) {
            console.log(err);
        }
    };

    onMount(() => {
        getNsBrands();
    });
</script>

<main>
    <div class="wrapper">
        <div class="titleBar">
            <div class="title">Brands</div>
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
                    {#each brands as ct, i}
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
    <CreateBrand on:cancel={hideCreateProperty} />
{/if}

<!-- createCategoryModal  -->

<style>
    .title {
        font-size: small;
    }
</style>
