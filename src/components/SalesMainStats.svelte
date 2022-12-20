<script>
    import { onMount } from "svelte";
    import { addCommas, numberFormat } from "../scripts/js/methods";

    export let displayType;

    export let stats = {};

    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="stitle">Sales At A Glance</div>
            <div class="statsBar">
                <div class="statPanel">
                    <div class="iconBar">
                        <div class="statIcon">
                            <div class="salesStatIcon icon1">
                                <i class="ri-shopping-basket-line" />
                            </div>
                        </div>
                    </div>

                    <div class="detailsBar">
                        <div class="statTitle">Today's Sales</div>
                        <div class="figureBar">
                            <div class="statFig">
                                {#if stats.currentMonth}
                                    <div class="">
                                        <span>
                                            Ksh {numberFormat(
                                                stats.today.value,
                                                {
                                                    notation: displayType,
                                                    precision: 2,
                                                    type: "currency",
                                                }
                                            )}
                                        </span>

                                        <span class="salesStatNum">
                                            ({numberFormat(stats.today.sales, {
                                                notation: displayType,
                                                precision: 2,
                                                type: "number",
                                            })})
                                        </span>
                                    </div>
                                {:else}
                                    <div
                                        class="skeleton"
                                        style="width:20em;color:rgba(0,0,0,0)"
                                    >
                                        Content Loading
                                    </div>
                                {/if}
                            </div>

                            {#if stats.currentMonth}
                                <div class="statFigChange">
                                    {#if stats.currentMonth.all.value > stats.previousMonth.all.value}
                                        <div class="positive salesStatChange">
                                            {addCommas(
                                                ((stats.today.value -
                                                    stats.yesterday.value) /
                                                    stats.yesterday.value) *
                                                    100,
                                                2
                                            )}%
                                        </div>
                                    {:else}
                                        <div class="negative salesStatChange">
                                            {addCommas(
                                                ((stats.today.value -
                                                    stats.yesterday.value) /
                                                    stats.yesterday.value) *
                                                    100,
                                                2
                                            )}%
                                        </div>
                                    {/if}
                                </div>
                            {:else}
                                <div class="skeleton">Loading</div>
                            {/if}
                        </div>

                        <div class="descBar">
                            <div class="salesStatsDesc">
                                {#if stats.previousMonth}
                                    From {numberFormat(stats.yesterday.value, {
                                        notation: displayType,
                                        precision: 2,
                                        type: "currency",
                                    })} Yesterday
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="statPanel">
                    <div class="iconBar">
                        <div class="statIcon">
                            <div class="salesStatIcon icon1">
                                <i class="ri-shopping-basket-line" />
                            </div>
                        </div>
                    </div>

                    <div class="detailsBar">
                        <div class="statTitle">This Month Sales</div>
                        <div class="figureBar">
                            <div class="statFig">
                                {#if stats.currentMonth}
                                    <div class="">
                                        <span>
                                            Ksh {numberFormat(
                                                stats.currentMonth.all.value,
                                                {
                                                    notation: displayType,
                                                    precision: 2,
                                                    type: "currency",
                                                }
                                            )}
                                        </span>

                                        <span class="salesStatNum">
                                            ({numberFormat(
                                                stats.currentMonth.all.sales,
                                                {
                                                    notation: displayType,
                                                    precision: 2,
                                                    type: "number",
                                                }
                                            )})
                                        </span>
                                    </div>
                                {:else}
                                    <div
                                        class="skeleton"
                                        style="width:20em;color:rgba(0,0,0,0)"
                                    >
                                        Content Loading
                                    </div>
                                {/if}
                            </div>

                            {#if stats.currentMonth}
                                <div class="statFigChange">
                                    {#if stats.currentMonth.all.value > stats.previousMonth.all.value}
                                        <div class="positive salesStatChange">
                                            {addCommas(
                                                ((stats.currentMonth.all.value -
                                                    stats.previousMonth.all
                                                        .value) /
                                                    stats.previousMonth.all
                                                        .value) *
                                                    100,
                                                2
                                            )}%
                                        </div>
                                    {:else}
                                        <div class="negative salesStatChange">
                                            {addCommas(
                                                ((stats.currentMonth.all.value -
                                                    stats.previousMonth.all
                                                        .value) /
                                                    stats.previousMonth.all
                                                        .value) *
                                                    100,
                                                2
                                            )}%
                                        </div>
                                    {/if}
                                </div>
                            {:else}
                                <div class="skeleton">Loading</div>
                            {/if}
                        </div>

                        <div class="descBar">
                            <div class="salesStatsDesc">
                                {#if stats.previousMonth}
                                    From {numberFormat(
                                        stats.previousMonth.all.value,
                                        {
                                            notation: displayType,
                                            precision: 2,
                                            type: "currency",
                                        }
                                    )} Last Month
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="statPanel">
                    <div class="iconBar">
                        <div class="statIcon">
                            <div class="salesStatIcon icon3">
                                <i class="ri-shopping-basket-line" />
                            </div>
                        </div>
                    </div>

                    <div class="detailsBar">
                        <div class="statTitle">This Month Short Exp Sales</div>
                        <div class="figureBar">
                            <div class="statFig">
                                {#if stats.currentMonth}
                                    <div class="">
                                        <span>
                                            Ksh {numberFormat(
                                                stats.currentMonth.shortExp
                                                    .value,
                                                {
                                                    notation: displayType,
                                                    precision: 2,
                                                    type: "currency",
                                                }
                                            )}
                                        </span>

                                        <span class="salesStatNum">
                                            ({numberFormat(
                                                stats.currentMonth.shortExp
                                                    .sales,
                                                {
                                                    notation: displayType,
                                                    precision: 2,
                                                    type: "number",
                                                }
                                            )})
                                        </span>
                                    </div>
                                {:else}
                                    <div
                                        class="skeleton"
                                        style="width:20em;color:rgba(0,0,0,0)"
                                    >
                                        Content Loading
                                    </div>
                                {/if}
                            </div>

                            {#if stats.currentMonth}
                                <div class="statFigChange">
                                    {#if stats.currentMonth > stats.previousMonth.shortExp.value}
                                        <div class="positive salesStatChange">
                                            {addCommas(
                                                ((stats.currentMonth.shortExp
                                                    .value -
                                                    stats.previousMonth.shortExp
                                                        .value) /
                                                    stats.previousMonth.shortExp
                                                        .value) *
                                                    100,
                                                2
                                            )}%
                                        </div>
                                    {:else}
                                        <div class="negative salesStatChange">
                                            {addCommas(
                                                ((stats.currentMonth.shortExp
                                                    .value -
                                                    stats.previousMonth.shortExp
                                                        .value) /
                                                    stats.previousMonth.shortExp
                                                        .value) *
                                                    100,
                                                2
                                            )}%
                                        </div>
                                    {/if}
                                </div>
                            {/if}
                        </div>

                        <div class="descBar">
                            <div class="salesStatsDesc">
                                {#if stats.previousMonth}
                                    From {numberFormat(
                                        stats.previousMonth.shortExp.value,
                                        {
                                            notation: displayType,
                                            precision: 2,
                                            type: "currency",
                                        }
                                    )} Last Month
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="statPanel">
                    <div class="iconBar">
                        <div class="statIcon">
                            <div class="salesStatIcon icon5">
                                <i class="ri-shopping-basket-line" />
                            </div>
                        </div>
                    </div>

                    <div class="detailsBar">
                        <div class="statTitle">This Month Dead Stock Sales</div>
                        <div class="figureBar">
                            <div class="statFig">
                                {#if stats.currentMonth}
                                    <div class="">
                                        <span>
                                            Ksh {numberFormat(
                                                stats.currentMonth.deadStock
                                                    .value,
                                                {
                                                    notation: displayType,
                                                    precision: 2,
                                                    type: "currency",
                                                }
                                            )}
                                        </span>

                                        <span class="salesStatNum">
                                            ({numberFormat(
                                                stats.currentMonth.deadStock
                                                    .sales,
                                                {
                                                    notation: displayType,
                                                    precision: 2,
                                                    type: "number",
                                                }
                                            )})
                                        </span>
                                    </div>
                                {:else}
                                    <div
                                        class="skeleton"
                                        style="width:20em;color:rgba(0,0,0,0)"
                                    >
                                        Content Loading
                                    </div>
                                {/if}
                            </div>

                            {#if stats.currentMonth}
                                <div class="statFigChange">
                                    {#if stats.currentMonth > stats.previousMonth.shortExp.value}
                                        <div class="positive salesStatChange">
                                            {addCommas(
                                                ((stats.currentMonth.deadStock
                                                    .value -
                                                    stats.previousMonth
                                                        .deadStock.value) /
                                                    stats.previousMonth
                                                        .deadStock.value) *
                                                    100,
                                                2
                                            )}%
                                        </div>
                                    {:else}
                                        <div class="negative salesStatChange">
                                            {addCommas(
                                                ((stats.currentMonth.deadStock
                                                    .value -
                                                    stats.previousMonth
                                                        .deadStock.value) /
                                                    stats.previousMonth
                                                        .deadStock.value) *
                                                    100,
                                                2
                                            )}%
                                        </div>
                                    {/if}
                                </div>
                            {/if}
                        </div>

                        <div class="descBar">
                            <div class="salesStatsDesc">
                                {#if stats.previousMonth}
                                    From {numberFormat(
                                        stats.previousMonth.deadStock.value,
                                        {
                                            notation: displayType,
                                            precision: 2,
                                            type: "currency",
                                        }
                                    )} Last Month
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .skeleton {
        width: 100% !important;
        height: 1em;
        border-radius: 5px;
        display: block;
        background: linear-gradient(
                to right,
                rgba(85, 60, 60, 0),
                rgba(255, 255, 255, 0.5) 50%,
                rgba(255, 255, 255, 0) 80%
            ),
            rgb(182, 182, 182);
        background-repeat: repeat-y;
        background-size: 50px 500px;
        background-position: 0 0;
        animation: shine 1s infinite;
    }
    @keyframes shine {
        to {
            background-position: 100% 0, /* move highlight to right */ 0 0;
        }
    }

    .statsBar {
        display: flex;
        flex-direction: column;
    }

    .statPanel {
        background: rgb(255, 255, 255);
        padding: 1em;
        border-radius: 5px;
        display: flex;
        flex: 1;
        align-items: center;
        margin-top: 1em;
    }


    /* sales */

    .statsBar {
        display: flex;
        flex-direction: column;
    }

    .statTitle {
        font-weight: 500;
        color: rgb(135, 138, 153);
        text-transform: uppercase;
        font-size: smaller;
    }

    .iconBar {
        flex: 1;
        align-items: center;
        justify-content: center;
        margin-right: 0.3em;
    }

    .salesStatIcon {
        width: 2em;
        height: 2em;
        font-size: 18px;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        border-radius: 5px;
    }
    .detailsBar {
        flex: 4;
        display: flex;
        flex-direction: column;
    }

    .statFig {
        font-size: medium;
        font-weight: 600;
        color: rgb(73, 80, 87);
        margin-right: 1em;
        flex: 3;
    }
    .statFigChange {
        flex: 1;
    }

    .figureBar {
        display: flex;
        justify-content: space-between;
    }

    .salesStatChange {
        padding: 0.1em;
        font-weight: 500;
        padding-inline: 0.5em;
        font-size: x-small;
    }

    .negative.salesStatChange {
        background: rgba(255, 0, 0, 0.175);
        color: crimson;
    }

    .positive.salesStatChange {
        background: rgba(0, 255, 174, 0.175);
        color: rgb(15, 101, 68);
    }

    .salesStatsDesc {
        font-weight: 400;
        color: rgb(135, 138, 153);
    }

    .icon1 {
        background: rgba(0, 255, 21, 0.22);
        color: rgb(20, 165, 20);
    }

    /* .icon2 {
        background: rgba(0, 255, 229, 0.22);
        color: rgb(20, 165, 160);
    } */

    .icon3 {
        background: rgba(251, 0, 255, 0.22);
        color: rgb(165, 20, 146);
    }

    .icon4 {
        background: rgba(255, 183, 0, 0.22);
        color: rgb(165, 109, 20);
    }

    .icon5 {
        background: rgba(0, 68, 255, 0.22);
        color: rgb(20, 20, 165);
    }

    .salesStatNum {
        font-size: xx-small;
    }

    @media only screen and (min-width: 640px) {
        .statsBar {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        .statPanel {
            background: rgb(255, 255, 255);
            padding: 1em;
            border-radius: 5px;
            margin: 0.4em;
            align-items: center;
            flex: 1;
        }

        .statsBar {
            display: flex;
            flex-direction: row;
            /* align-items: center;
            justify-content: center; */
        }
    }
</style>
