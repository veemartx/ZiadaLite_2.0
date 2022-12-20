<script>
    import { onMount } from "svelte";
    import { numberFormat } from "../scripts/js/methods";

    export let displayType;

    export let stats = {};

    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="stitle">Products At Risk</div>
            <div class="statsBar">
                <div class="statPanel">
                    <div class="statTitleBar">
                        <div class="statTitle">
                            {#if stats.products}
                                {stats.products.title}
                            {/if}
                        </div>
                        <div class="statChange positive">
                            <div class="changeIcon">
                                <sup>
                                    <!-- <i class="ri-arrow-right-up-line" /> -->
                                </sup>
                            </div>
                            <div class="changeFig  skeleton-loader">
                                <!-- +16.24% -->
                            </div>
                        </div>
                    </div>

                    <div class="statFigBar">
                        <div class="statFig">
                            {#if stats.products}
                                {numberFormat(stats.products.number, {
                                    notation: displayType,
                                    precision: 2,
                                    type: "number",
                                })}
                            {:else}
                                <!--  -->
                                <span class="skeleton-loader" />
                            {/if}
                        </div>
                        <div class="statValue">
                            {#if stats.products}
                                Ksh. {numberFormat(stats.products.value, {
                                    notation: displayType,
                                    precision: 2,
                                    type: "number",
                                })}
                            {:else}
                                <!--  -->
                                <span class="skeleton-loader" />
                            {/if}
                        </div>
                    </div>

                    <div class="statDescBar">
                        <div class="statDesc">
                            {#if stats.products}
                                <a href="../dash/products/"
                                    >View {stats.products.title}</a
                                >
                            {:else}
                                <span class="skeleton-loader" />
                            {/if}
                        </div>

                        <div class="statIcon">
                            {#if stats}
                                <div class="statIconBtn icon1">
                                    <i class="ri-shopping-basket-line" />
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>

                <div class="statPanel">
                    <div class="statTitleBar">
                        <div class="statTitle">
                            {#if stats.deadStock}
                                {stats.deadStock.title}
                            {/if}
                        </div>
                        <div class="statChange positive">
                            <div class="changeIcon">
                                <sup>
                                    <!-- <i class="ri-arrow-right-up-line" /> -->
                                </sup>
                            </div>
                            <div class="changeFig  skeleton-loader">
                                <!-- +16.24% -->
                            </div>
                        </div>
                    </div>

                    <div class="statFigBar">
                        <div class="statFig">
                            {#if stats.products}
                                {numberFormat(stats.deadStock.number, {
                                    notation: displayType,
                                    precision: 2,
                                    type: "number",
                                })}
                            {:else}
                                <!--  -->
                                <span class="skeleton-loader" />
                            {/if}
                        </div>
                        <div class="statValue">
                            {#if stats.deadStock}
                                Ksh. {numberFormat(stats.deadStock.value, {
                                    notation: displayType,
                                    precision: 2,
                                    type: "number",
                                })}
                            {:else}
                                <!--  -->
                                <span class="skeleton-loader" />
                            {/if}
                        </div>
                    </div>

                    <div class="statDescBar">
                        <div class="statDesc">
                            {#if stats.deadStock}
                                <a href="../dash/products/"
                                    >View {stats.deadStock.title}</a
                                >
                            {:else}
                                <span class="skeleton-loader" />
                            {/if}
                        </div>

                        <div class="statIcon">
                            {#if stats}
                                <div class="statIconBtn icon2">
                                    <i class="ri-shopping-basket-line" />
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>

                <div class="statPanel">
                    <div class="statTitleBar">
                        <div class="statTitle">
                            {#if stats.shortExp}
                                {stats.shortExp.title}
                            {/if}
                        </div>
                        <div class="statChange positive">
                            <div class="changeIcon">
                                <sup>
                                    <!-- <i class="ri-arrow-right-up-line" /> -->
                                </sup>
                            </div>
                            <div class="changeFig  skeleton-loader">
                                <!-- +16.24% -->
                            </div>
                        </div>
                    </div>

                    <div class="statFigBar">
                        <div class="statFig">
                            {#if stats.shortExp}
                                {numberFormat(stats.shortExp.number, {
                                    notation: displayType,
                                    precision: 2,
                                    type: "number",
                                })}
                            {:else}
                                <!--  -->
                                <span class="skeleton-loader" />
                            {/if}
                        </div>
                        <div class="statValue">
                            {#if stats.shortExp}
                                Ksh. {numberFormat(stats.shortExp.value, {
                                    notation: displayType,
                                    precision: 2,
                                    type: "number",
                                })}
                            {:else}
                                <!--  -->
                                <span class="skeleton-loader" />
                            {/if}
                        </div>
                    </div>

                    <div class="statDescBar">
                        <div class="statDesc">
                            {#if stats.shortExp}
                                <a href="../dash/products/"
                                    >View {stats.shortExp.title}</a
                                >
                            {:else}
                                <span class="skeleton-loader" />
                            {/if}
                        </div>

                        <div class="statIcon">
                            {#if stats}
                                <div class="statIconBtn icon3">
                                    <i class="ri-shopping-basket-line" />
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>

                <div class="statPanel">
                    <div class="statTitleBar">
                        <div class="statTitle">
                            {#if stats.expiringThisMonth}
                                {stats.expiringThisMonth.title}
                            {/if}
                        </div>
                        <div class="statChange positive">
                            <div class="changeIcon">
                                <sup>
                                    <!-- <i class="ri-arrow-right-up-line" /> -->
                                </sup>
                            </div>
                            <div class="changeFig  skeleton-loader">
                                <!-- +16.24% -->
                            </div>
                        </div>
                    </div>

                    <div class="statFigBar">
                        <div class="statFig">
                            {#if stats.expiringThisMonth}
                                {numberFormat(stats.expiringThisMonth.number, {
                                    notation: displayType,
                                    precision: 2,
                                    type: "number",
                                })}
                            {:else}
                                <!--  -->
                                <span class="skeleton-loader" />
                            {/if}
                        </div>
                        <div class="statValue">
                            {#if stats.expiringThisMonth}
                                Ksh. {numberFormat(
                                    stats.expiringThisMonth.value,
                                    {
                                        notation: displayType,
                                        precision: 2,
                                        type: "number",
                                    }
                                )}
                            {:else}
                                <!--  -->
                                <span class="skeleton-loader" />
                            {/if}
                        </div>
                    </div>

                    <div class="statDescBar">
                        <div class="statDesc">
                            {#if stats.expiringThisMonth}
                                <a href="../dash/products/"
                                    >View {stats.expiringThisMonth.title}</a
                                >
                            {:else}
                                <span class="skeleton-loader" />
                            {/if}
                        </div>

                        <div class="statIcon">
                            {#if stats}
                                <div class="statIconBtn icon4">
                                    <i class="ri-shopping-basket-line" />
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>

                <div class="statPanel">
                    <div class="statTitleBar">
                        <div class="statTitle">
                            {#if stats.expiredLastMonth}
                                {stats.expiredLastMonth.title}
                            {/if}
                        </div>
                        <div class="statChange positive">
                            <div class="changeIcon">
                                <sup>
                                    <!-- <i class="ri-arrow-right-up-line" /> -->
                                </sup>
                            </div>
                            <div class="changeFig  skeleton-loader">
                                <!-- +16.24% -->
                            </div>
                        </div>
                    </div>

                    <div class="statFigBar">
                        <div class="statFig">
                            {#if stats.expiredLastMonth}
                                {numberFormat(stats.expiredLastMonth.number, {
                                    notation: displayType,
                                    precision: 2,
                                    type: "number",
                                })}
                            {:else}
                                <!--  -->
                                <span class="skeleton-loader" />
                            {/if}
                        </div>
                        <div class="statValue">
                            {#if stats.expiredLastMonth}
                                Ksh. {numberFormat(
                                    stats.expiredLastMonth.value,
                                    {
                                        notation: displayType,
                                        precision: 2,
                                        type: "number",
                                    }
                                )}
                            {:else}
                                <!--  -->
                                <span class="skeleton-loader" />
                            {/if}
                        </div>
                    </div>

                    <div class="statDescBar">
                        <div class="statDesc">
                            {#if stats.expiredLastMonth}
                                <a href="../dash/products/"
                                    >View {stats.expiredLastMonth.title}</a
                                >
                            {:else}
                                <span class="skeleton-loader" />
                            {/if}
                        </div>

                        <div class="statIcon">
                            {#if stats}
                                <div class="statIconBtn icon5">
                                    <i class="ri-shopping-basket-line" />
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .skeleton-loader {
        width: 100%;
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
        color: orange !important;
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
        margin-top: 1em;
        flex: 1;
    }

    .statTitleBar {
        display: flex;
        justify-content: space-between;
    }

    .statTitle {
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 500;
        margin-right: 1em;
        padding-right: 1em;
        color: rgb(135, 138, 153);
    }

    .statChange {
        display: flex;
        margin-left: 1em;
        font-weight: 600;
        font-size: 13px;
        padding-left: 1em;
    }

    /* .statChange.positive {
        color: rgba(20, 149, 84, 0.843);
    }

    .statChange.negative {
        color: rgba(220, 20, 60, 0.823);
    } */

    .statDescBar {
        display: flex;
        justify-content: space-between;
    }

    .statFig {
        font-size: 20px;
        font-weight: 600;
        color: rgb(73, 80, 87);
    }

    .statFigBar {
        margin-top: 0.7em;
        margin-bottom: 0.7em;
    }

    .statValue {
        font-weight: 600;
        font-size: small;
        color: rgb(76, 76, 76);
        margin-top: 2px;
    }

    .statDesc {
        text-decoration: underline;
        font-weight: 100;
        font-size: x-small;
    }

    .statIconBtn {
        width: 2em;
        height: 2em;
        font-size: 18px;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        margin-top: -1em;
        border-radius: 5px;
    }

    .icon1 {
        background: rgba(0, 255, 21, 0.22);
        color: rgb(20, 165, 20);
    }

    .icon2 {
        background: rgba(0, 255, 229, 0.22);
        color: rgb(20, 165, 160);
    }

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

    .changeIcon {
        margin-top: -5px;
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
        }
    }
</style>
