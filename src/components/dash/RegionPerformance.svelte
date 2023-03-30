<script>
    import { onMount } from "svelte";
    import { apiBaseUrl } from "../../config/config";
    import { addCommas } from "../../scripts/js/methods";

    export let regionsSummary = [];

    let showUnfulfilledPrintPanel = false;

    $: [console.log(regionsSummary)];

    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="contentTitleBar">
                <div class="contentTitle">Regions Summary</div>
            </div>

            <!-- all products -->
            <div class="regionSummaryTitle" style="color: green;">
                All Products
            </div>
            <div class="regionsSummaryCol">
                <div class="statsPanel column">
                    <div class="descriptionContainer">
                        <div class="valueFigureContainer">
                            {addCommas(
                                regionsSummary
                                    .map((p) => p.products)
                                    .reduce(
                                        (partialSum, a) => partialSum + a,
                                        0
                                    ),
                                0
                            )}
                        </div>
                        <div class="figureContainer">
                            <span class="">
                                {addCommas(
                                    regionsSummary
                                        .map((p) => p.productsValue)
                                        .reduce(
                                            (partialSum, a) => partialSum + a,
                                            0
                                        ),
                                    0
                                )}
                            </span>
                        </div>
                        <div class="description">All Regions</div>
                    </div>
                </div>

                {#each regionsSummary as r}
                    <div class="statsPanel column">
                        <div class="descriptionContainer">
                            <div class="valueFigureContainer">
                                {addCommas(r.products, 0)}
                            </div>
                            <div class="figureContainer">
                                <span class=""
                                    >{addCommas(r.productsValue, 2)}
                                </span>
                            </div>
                            <div class="description">{r.region}</div>
                        </div>
                    </div>
                {/each}
            </div>
            <!-- all products -->

            <!-- dead stock   -->
            <div class="regionSummaryTitle" style="color: crimson;">
                Dead Stock
            </div>
            <div class="regionsSummaryCol">
                <div class="statsPanel column">
                    <div class="descriptionContainer">
                        <div class="valueFigureContainer">
                            {addCommas(
                                regionsSummary
                                    .map((p) => p.deadStock)
                                    .reduce(
                                        (partialSum, a) => partialSum + a,
                                        0
                                    ),
                                0
                            )}
                        </div>
                        <div class="figureContainer">
                            <span class="">
                                {addCommas(
                                    regionsSummary
                                        .map((p) => p.deadStockValue)
                                        .reduce(
                                            (partialSum, a) => partialSum + a,
                                            0
                                        ),
                                    2
                                )}
                            </span>
                        </div>
                        <div class="description">All Regions</div>
                    </div>
                </div>

                {#each regionsSummary as r}
                    <div class="statsPanel column">
                        <div class="descriptionContainer">
                            <div class="valueFigureContainer">
                                {addCommas(r.deadStock, 0)}
                            </div>
                            <div class="figureContainer">
                                <span class=""
                                    >{addCommas(r.deadStockValue, 2)}
                                </span>
                            </div>
                            <div class="description">{r.region}</div>
                        </div>
                    </div>
                {/each}
            </div>
            <!-- dead stock   -->

            <!-- short exp  -->
            <div class="regionSummaryTitle" style="color: orangered;">
                Short Exp
            </div>
            <div class="regionsSummaryCol">
                <div class="statsPanel column">
                    <div class="descriptionContainer">
                        <div class="valueFigureContainer">
                            {addCommas(
                                regionsSummary
                                    .map((p) => p.shortExp)
                                    .reduce(
                                        (partialSum, a) => partialSum + a,
                                        0
                                    ),
                                0
                            )}
                        </div>
                        <div class="figureContainer">
                            <span class="">
                                {addCommas(
                                    regionsSummary
                                        .map((p) => p.shortExpValue)
                                        .reduce(
                                            (partialSum, a) => partialSum + a,
                                            0
                                        ),
                                    2
                                )}
                            </span>
                        </div>
                        <div class="description">All Regions</div>
                    </div>
                </div>

                {#each regionsSummary as r}
                    <div class="statsPanel column">
                        <div class="descriptionContainer">
                            <div class="valueFigureContainer">
                                {addCommas(r.shortExp, 0)}
                            </div>
                            <div class="figureContainer">
                                <span class=""
                                    >{addCommas(r.shortExpValue, 2)}
                                </span>
                            </div>
                            <div class="description">{r.region}</div>
                        </div>
                    </div>
                {/each}
            </div>
            <!--short exp   -->

            <!-- unfullfilled -->
            <div class="regionSummaryTitle" style="color: purple;">
                <div class="rsTitle">Unfulfilled Transfer Requests</div>

                <div class="rsAction">
                    <div class="UnfulfilledPrintOptions">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <span
                            on:click={() => {
                                showUnfulfilledPrintPanel =
                                    !showUnfulfilledPrintPanel;
                            }}
                        >
                            Print Options <i class="dropdown icon" />
                        </span>
                    </div>

                    {#if showUnfulfilledPrintPanel}
                        <div class="printOptionsContainer">
                            <div class="ui segment">
                                <div class="ui warning message">
                                    For All Time -> Skip The Month Part
                                </div>
                                <form
                                    class="ui form"
                                    target="_blank"
                                    action="server/print-unfulfilled-transfer-requests.php"
                                >
                                    <div class="field">
                                        <label for="">Month (optional)</label>
                                        <input
                                            type="month"
                                            name="month"
                                            id="month"
                                            min="2021-12"
                                        />
                                    </div>

                                    <div class="field">
                                        <label for="">Region</label>
                                        <select
                                            name="region"
                                            id="unfulfilledRegion"
                                            required
                                        >
                                            <option value=""
                                                >Select Region</option
                                            >
                                            <option value="All">All</option>
                                        </select>
                                    </div>

                                    <div
                                        class="field"
                                        style="text-align:center"
                                    >
                                        <button class="ui purple basic button">
                                            <i class="print icon" /> Print
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
            <div class="regionsSummaryCol">
                <div class="statsPanel column">
                    <div class="descriptionContainer">
                        <div class="figureContainer">
                            {addCommas(
                                regionsSummary
                                    .map((p) => p.unfulfilled)
                                    .reduce(
                                        (partialSum, a) => partialSum + a,
                                        0
                                    ),
                                0
                            )}
                        </div>

                        <div class="description">All Regions</div>
                    </div>
                </div>

                {#each regionsSummary as r}
                    <div class="statsPanel column">
                        <div class="descriptionContainer">
                            <div class="figureContainer">
                                <span class=""
                                    >{addCommas(r.unfulfilled)}
                                </span>
                            </div>
                            <div class="description">{r.region}</div>
                        </div>
                    </div>
                {/each}
            </div>
            <!-- unfullfilled -->
        </div>
    </div>
</main>

<style>
    .statsPanel {
        border: 1px solid rgba(128, 128, 128, 0.151);
        padding: 0.4em;
        border-radius: 4px;
        color: aliceblue;
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
        background: #fff;
        width: 45%;
    }

    .statsPanel:hover {
        background: #f7f7f794;
        border: 1px solid rgba(73, 73, 73, 0.137);
        color: orangered;
    }

    .descriptionContainer {
        flex: 3;
    }

    .valueFigureContainer {
        color: rgb(61, 61, 61);
        font-size: 20px;
        text-align: center;
        font-weight: 600;
        padding-top: 10px;
    }

    .figureContainer {
        font-size: 16px;
        text-align: center;
        font-weight: 600;
        padding-top: 10px;
        color: rgb(61, 61, 61);
    }

    .description {
        font-size: 14px;
        text-align: center;
        padding-top: 10px;
        color: rgb(47, 47, 48);
    }

    .regionsSummaryCol {
        margin-top: 1em;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 1em;
    }

    .regionSummaryTitle {
        font-weight: 600;
        display: flex;
        justify-content: space-between;
    }

    .printOptionsContainer {
        position: absolute;
        background: rgba(255, 0, 0, 0);
        z-index: 100;
        margin-left: -12em;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        border: 1px solid rgba(71, 71, 71, 0.147);
    }

    .UnfulfilledPrintOptions {
        cursor: pointer;
        color: crimson;
        font-weight: 600;
    }
    @media only screen and (min-width: 640px) {
        .statsPanel {
            flex: 1;
        }
    }
</style>
