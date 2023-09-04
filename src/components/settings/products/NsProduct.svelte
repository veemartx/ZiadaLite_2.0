<script>
    import axios from "axios";
    import { apiBaseUrl } from "../../../config/config";
    import { Notify } from "notiflix";
    import { formatDate, getCurrentEntity } from "../../../scripts/js/methods";
    import { onMount } from "svelte";
    import { s } from "pdfmake/build/pdfmake";

    let showCreateSubnsProductModal = false;

    let nsProduct;

    const showCreateSubnsProduct = () => {
        showCreateSubnsProductModal = true;
    };


    const hideCreateSubnsProduct = () => {
        showCreateSubnsProductModal = false;

        getNsProduct();
    };

    const getNsProduct = async () => {
        let dt = {
            id: getCurrentEntity(window.location.href),
        };

        const response = await axios({
            method: "POST",
            data: dt,
            url: `${apiBaseUrl}getNsProduct.php`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const res = response.data;

        nsProduct = res;
    };

    onMount(() => {
        getNsProduct();
    });
</script>

<main>
    <div class="wrapper">
        <div class="titleBar">
            <div class="title">Ns Product</div>
            <div class="action" />
        </div>

        <br />

        {#if nsProduct}
            <div class="contentBar">
                <div class="subtitleBar">
                    <b>Name: {nsProduct.name} </b>
                    <br />
                    <b style="color:brown;">Code: {nsProduct.code} </b>
                    <br />
                    <b style="color: dodgerblue;"
                        >PackSize: {nsProduct.packSize}
                    </b>
                    <br />
                    <b style="color:green">
                        Category: {nsProduct.category}
                    </b>
                    <br />
                    <b style="color:crimson">
                        Subcategories: {nsProduct.subcategories}
                    </b>
                </div>

                <table class="ui very basic striped unstackable table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Property</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each JSON.parse(nsProduct.properties) as ppts, i}
                            <tr>
                                <td>
                                    {i + 1}
                                </td>
                                <td>
                                    {ppts.property}
                                </td>
                                <td>
                                    {ppts.value}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}
    </div>
</main>
