<script>
    import axios from "axios";
    import CreateCategory from "./CreateCategory.svelte";
    import { apiBaseUrl } from "../../../config/config";
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { formatDate } from "../../../scripts/js/methods";
    import CreateProductProperty from "./CreateProductProperty.svelte";
    import CreateSubcategory from "./CreateSubcategory.svelte";

    let categories = [];

    let showCreatePropertyModal = false;

    const showCreateProperty = () => {
        showCreatePropertyModal = true;
    };

    const hideCreateProperty = () => {
        showCreatePropertyModal = false;
    };

    const getProperties = async () => {
        try {
            let response = await axios({
                method: "POST",
                url: `${apiBaseUrl}getProperties.php`,
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

    onMount(() => {
        getProperties();
    });
</script>

<main>
    <div class="wrapper">
        <div class="titleBar">
            <div class="title">Subcategories</div>
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
                        <th>Subcategory</th>
                        <th>Category</th>
                        <th>Created</th>
                        <th>Status</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {#each categories as ct, i}
                        <tr>
                            <td>{i + 1}</td>
                            <td>{ct.name}</td>
                            <td>{ct.subcategories}</td>
                            <td>{formatDate(ct.created)}</td>
                            <td>{ct.status}</td>
                            <td>
                                <Link to={"../category/ct/" + ct.id}>
                                    <span class="view">
                                        <i class="eye icon" /> View
                                    </span>
                                </Link>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</main>



<style>
    .title {
        font-size: small;
    }

    .view {
        font-weight: 600;
    }
</style>
