<script>
    // @ts-nocheck

    import axios from "axios";
    import { apiBaseUrl } from "../../../config/config";
    import { Notify } from "notiflix";
    import { formatDate, getCurrentEntity } from "../../../scripts/js/methods";
    import { onMount } from "svelte";
    import { s } from "pdfmake/build/pdfmake";

    Notify.init({
        ID: "MKA",
        timeout: 4000,
        showOnlyTheLastOne: true,
        cssAnimationStyle: "from-bottom",
        zindex: 1000000000,
    });

    let showCreateSubnsProductModal = false;

    let nsProduct;

    let generics = [];

    let brands = [];

    let manufacturers = [];

    let filteredGenerics = [];

    let activeIngredients = [];

    let filteredBrands = [];

    let filteredManufacturers = [];

    let nsBrands = [];

    let nsManufacturers = [];

    let updateProductBtnLoading = false;

    const showCreateSubnsProduct = () => {
        showCreateSubnsProductModal = true;
    };

    const hideCreateSubnsProduct = () => {
        showCreateSubnsProductModal = false;

        getNsProduct();
    };

    const filterGenerics = (query) => {
        let genericNames = generics.map((v) => v.name.toLowerCase());

        let fg = genericNames.filter((g) => {
            if (g.includes(query.toLowerCase())) {
                return g;
            }
        });

        filteredGenerics = fg;
        // console.log(fg);
    };

    const filterBrands = (query) => {
        let brandNames = brands.map((v) => v.name.toLowerCase());

        let fg = brandNames.filter((g) => {
            if (g.includes(query.toLowerCase())) {
                return g;
            }
        });

        filteredBrands = fg;
        // console.log(fg);
    };

    const filterManufacturers = (query) => {
        let manufacturerNames = manufacturers.map((v) => v.name.toLowerCase());

        let fg = manufacturerNames.filter((g) => {
            if (g.includes(query.toLowerCase())) {
                return g;
            }
        });

        filteredManufacturers = fg;
        // console.log(fg);
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

            // console.log(brands);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdateProduct = async () => {
        if (activeIngredients.length == 0) {
            Notify.warning("Active Ingredients Cannot Be Empty");

            return;
        }

        if (nsBrands.length == 0) {
            Notify.warning("Product Brand Cannot Be Empty.Aborting");

            return;
        }

        if (nsManufacturers.length == 0) {
            Notify.warning("Product Manufacturer Cannot Be Empty,Aborting");

            return;
        }

        let newProperties = [
            {
                property: "Brand",
                value: nsBrands[0],
            },
            {
                property: "Active Ingredient",
                value: activeIngredients[0],
            },

            {
                property: "Manufacturer",
                value: nsManufacturers[0],
            },
        ];
        let productProperties = JSON.parse(nsProduct.properties);

        let mergedProperties = productProperties.concat(newProperties);

        // console.log(mergedProperties);

        let dt = {
            id: nsProduct.id,
            properties: mergedProperties,
        };

        try {
            updateProductBtnLoading = true;

            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}updateNsProduct.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            // console.log(res);
            if (res.success) {
                Notify.success(res.message);

                nsBrands = [];
                nsManufacturers = [];
                activeIngredients = [];
                getNsProduct();
            } else {
                Notify.failure(res.message);
            }

            updateProductBtnLoading = false;

            // cancelModal();
        } catch (err) {
            console.log(err);
        }
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
        } catch (err) {
            console.log(err);
        }
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
        getNsProduct();
        getGenerics();
        getNsBrands();
        getNsManufacturers();
    });
</script>

<main>
    <div class="wrapper">
        <div class="titleBar">
            <div class="title">Update Ns Product</div>
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

            <br />
            <br />
            <div class="titleBar">
                <div class="title">UpdateFields</div>
            </div>
            <div class="contentBar">
                <form
                    class="ui form"
                    on:submit|preventDefault={handleUpdateProduct}
                >
                    <!-- active ingredient -->
                    <fieldset>
                        <legend>Active Ingredients</legend>

                        <div class="field">
                            <input
                                type="text"
                                name="search_ai"
                                id="search_ai"
                                placeholder="Search Active Ingredient"
                                on:keyup={(e) => {
                                    // console.log(e.target.value);

                                    filterGenerics(e.target.value);
                                }}
                            />

                            <!-- filter results -->
                            <div class="aiFilterResults">
                                <div class="aiFilterTitle">
                                    Active Ingredient
                                </div>

                                <div class="filterResults">
                                    {#each filteredGenerics as fg, i}
                                        <div
                                            style={i % 2 == 0
                                                ? "background:rgba(50,220,50,0.1)"
                                                : "background:#fff"}
                                            class="filteredGenericCol"
                                        >
                                            <div class="fg">
                                                {fg}
                                            </div>
                                            <div class="fgAct">
                                                <button
                                                    class="ui basic blue icon mini button"
                                                    type="button"
                                                    on:click={() => {
                                                        activeIngredients[0] =
                                                            fg;

                                                        activeIngredients =
                                                            activeIngredients;

                                                        filteredGenerics = [];

                                                        document.getElementById(
                                                            "search_ai"
                                                        ).value = "";
                                                    }}
                                                >
                                                    <i
                                                        style="font-size: 10px;"
                                                        class="plus icon"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                            <!-- filter results -->
                        </div>

                        <div class="selectedActiveIngredients">
                            {#each activeIngredients as ai}
                                <button
                                    type="button"
                                    class="ui basic blue mini button"
                                >
                                    {ai}
                                </button>
                            {/each}
                        </div>
                    </fieldset>
                    <!-- active ingredient -->

                    <!-- brand  -->
                    <fieldset>
                        <legend>Ns Brand</legend>

                        <div class="field">
                            <input
                                type="text"
                                name="search_ai"
                                id="search_br"
                                placeholder="Search Brands"
                                on:keyup={(e) => {
                                    // console.log(e.target.value);

                                    filterBrands(e.target.value);
                                }}
                            />

                            <!-- filter results -->
                            <div class="aiFilterResults">
                                <div class="aiFilterTitle">Ns Brand</div>

                                <div class="filterResults">
                                    {#each filteredBrands as fg, i}
                                        <div
                                            style={i % 2 == 0
                                                ? "background:rgba(50,220,50,0.1)"
                                                : "background:#fff"}
                                            class="filteredGenericCol"
                                        >
                                            <div class="fg">
                                                {fg}
                                            </div>
                                            <div class="fgAct">
                                                <button
                                                    class="ui basic blue icon mini button"
                                                    type="button"
                                                    on:click={() => {
                                                        nsBrands[0] = fg;

                                                        nsBrands = nsBrands;

                                                        filteredBrands = [];

                                                        document.getElementById(
                                                            "search_br"
                                                        ).value = "";
                                                    }}
                                                >
                                                    <i
                                                        style="font-size: 10px;"
                                                        class="plus icon"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                            <!-- filter results -->
                        </div>

                        <div class="selectedActiveIngredients">
                            {#each nsBrands as ai}
                                <button
                                    type="button"
                                    class="ui basic blue mini button"
                                >
                                    {ai}
                                </button>
                            {/each}
                        </div>
                    </fieldset>
                    <!-- brand -->

                    <!-- manufacturer  -->
                    <fieldset>
                        <legend>Ns Manufacturer</legend>

                        <div class="field">
                            <input
                                type="text"
                                name="search_ai"
                                id="search_mn"
                                placeholder="Search Manufacturer"
                                on:keyup={(e) => {
                                    // console.log(e.target.value);

                                    filterManufacturers(e.target.value);
                                }}
                            />

                            <!-- filter results -->
                            <div class="aiFilterResults">
                                <div class="aiFilterTitle">Ns Manufacturer</div>

                                <div class="filterResults">
                                    {#each filteredManufacturers as fg, i}
                                        <div
                                            style={i % 2 == 0
                                                ? "background:rgba(50,220,50,0.1)"
                                                : "background:#fff"}
                                            class="filteredGenericCol"
                                        >
                                            <div class="fg">
                                                {fg}
                                            </div>
                                            <div class="fgAct">
                                                <button
                                                    class="ui basic blue icon mini button"
                                                    type="button"
                                                    on:click={() => {
                                                        nsManufacturers[0] = fg;

                                                        nsManufacturers =
                                                            nsManufacturers;

                                                        filteredManufacturers =
                                                            [];

                                                        document.getElementById(
                                                            "search_mn"
                                                        ).value = "";
                                                    }}
                                                >
                                                    <i
                                                        style="font-size: 10px;"
                                                        class="plus icon"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                            <!-- filter results -->
                        </div>

                        <div class="selectedActiveIngredients">
                            {#each nsManufacturers as ai}
                                <button
                                    type="button"
                                    class="ui basic blue mini button"
                                >
                                    {ai}
                                </button>
                            {/each}
                        </div>
                    </fieldset>
                    <!-- manufacturer -->

                    <div
                        class="field"
                        style="text-align: center;padding-top:2em"
                    >
                        <button class="ui purple basic icon small button">
                            <i class="edit icon" /> Update Ns Product
                        </button>
                    </div>
                </form>
            </div>
        {/if}
    </div>
</main>

<style>
    .aiFilterResults {
        padding: 1em;
    }

    .aiFilterTitle {
        border-bottom: 1px solid rgba(128, 128, 128, 0.264);
        padding-top: 1em;
        font-size: 14px;
        color: teal;
    }

    .filteredGenericCol {
        padding: 1em;
        display: flex;
    }

    .fg {
        flex: 2;
    }

    .fgAct {
        flex: 1;
    }
</style>
