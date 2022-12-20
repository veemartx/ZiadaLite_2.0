<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { apiBaseUrl } from "../config/config";
    import { addCommas } from "../scripts/js/methods";

    let dashData = {};

    let currentBranchPerfomance = [];

    let showCurrenctBranchPerfomance = false;

    let bpTitle = "Overall";

    const getDashData = async () => {
        try {
            let response = await axios.get(`${apiBaseUrl}getMainDashData.php`);

            let result = response.data;

            dashData = result;

            currentBranchPerfomance = dashData.branchPerfomance;

            // console.log(dashData);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCurrenctBranchPerfomance = () => {
        showCurrenctBranchPerfomance = true;
    };
    onMount(() => {
        getDashData();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="">
                <div class="stitle">Top Perfoming Branches</div>

                {#if dashData.branchPerfomance}
                    <div class="branchPerfomanceBar">
                        <div class="perfomanceCol segment">
                            <div class="pTitle">
                                Overall

                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <span
                                    on:click={() => {
                                        bpTitle = "Short Exp";

                                        currentBranchPerfomance =
                                            dashData.branchPerfomance;

                                        handleCurrenctBranchPerfomance();
                                    }}
                                    class="moreIcon"
                                >
                                    <i class="eye icon" />
                                </span>
                            </div>
                            <div class="">
                                <table
                                    class="ui very basic striped unstackable table"
                                >
                                    <thead>
                                        <tr>
                                            <th> Branch </th>
                                            <th> Target </th>
                                            <th> Sales </th>
                                            <th> Variance </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#each dashData.branchPerfomance.slice(0, 3) as bp}
                                            <tr>
                                                <td>
                                                    {bp.branch}
                                                </td>
                                                <td>
                                                    {addCommas(bp.target, 2)}
                                                </td>
                                                <td>
                                                    {addCommas(bp.sales, 2)}
                                                </td>
                                                <td>
                                                    {addCommas(bp.variance, 2)}
                                                </td>
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="perfomanceCol segment">
                            <div class="pTitle">
                                Dead Stock

                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <span
                                    on:click={() => {
                                        bpTitle = "Dead Stock";

                                        currentBranchPerfomance =
                                            dashData.branchPerfomance.sort(
                                                (a, b) => {
                                                    return (
                                                        b.deadStockVariance -
                                                        a.deadStockVariance
                                                    );
                                                }
                                            );
                                        handleCurrenctBranchPerfomance();
                                    }}
                                    class="moreIcon"
                                >
                                    <i class="eye icon" />
                                </span>
                            </div>

                            <div class="">
                                <table
                                    class="ui very basic striped unstackable table"
                                >
                                    <thead>
                                        <tr>
                                            <th> Branch </th>
                                            <th> Target </th>
                                            <th> Sales </th>
                                            <th> Variance </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#each dashData.branchPerfomance
                                            .sort((a, b) => {
                                                return b.deadStockVariance - a.deadStockVariance;
                                            })
                                            .slice(0, 3) as bp}
                                            <tr>
                                                <td>
                                                    {bp.branch}
                                                </td>
                                                <td>
                                                    {addCommas(
                                                        bp.deadStockTarget,
                                                        2
                                                    )}
                                                </td>
                                                <td>
                                                    {addCommas(
                                                        bp.deadStockSales,
                                                        2
                                                    )}
                                                </td>
                                                <td>
                                                    {addCommas(
                                                        bp.deadStockVariance,
                                                        2
                                                    )}
                                                </td>
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="perfomanceCol segment">
                            <div class="pTitle">
                                Short Exp

                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <span
                                    on:click={() => {
                                        bpTitle = "Short Exp";

                                        currentBranchPerfomance =
                                            dashData.branchPerfomance.sort(
                                                (a, b) => {
                                                    return (
                                                        b.shortExpVariance -
                                                        a.shortExpVariance
                                                    );
                                                }
                                            );
                                        handleCurrenctBranchPerfomance();
                                    }}
                                    class="moreIcon"
                                >
                                    <i class="eye icon" />
                                </span>
                            </div>

                            <div class="">
                                <table
                                    class="ui very basic striped unstackable table"
                                >
                                    <thead>
                                        <tr>
                                            <th> Branch </th>
                                            <th> Target </th>
                                            <th> Sales </th>
                                            <th> Variance </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#each dashData.branchPerfomance
                                            .sort((a, b) => {
                                                return b.shortExpVariance - a.shortExpVariance;
                                            })
                                            .slice(0, 3) as bp}
                                            <tr>
                                                <td>
                                                    {bp.branch}
                                                </td>
                                                <td>
                                                    {addCommas(
                                                        bp.shortExpTarget,
                                                        2
                                                    )}
                                                </td>
                                                <td>
                                                    {addCommas(
                                                        bp.shortExpSales,
                                                        2
                                                    )}
                                                </td>
                                                <td>
                                                    {addCommas(
                                                        bp.shortExpVariance,
                                                        2
                                                    )}
                                                </td>
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>

            <br />

            <div class="">
                <div class="stitle">Bottom Perfoming Branches</div>

                {#if dashData.branchPerfomance}
                    <div class="branchPerfomanceBar">
                        <div class="perfomanceCol segment">
                            <div class="pTitle">
                                Overall

                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <span
                                    on:click={() => {
                                        bpTitle = "Overall";

                                        currentBranchPerfomance =
                                            dashData.branchPerfomance;
                                        handleCurrenctBranchPerfomance();
                                    }}
                                    class="moreIcon"
                                >
                                    <i class="eye icon" />
                                </span>
                            </div>
                            <div class="">
                                <table
                                    class="ui very basic striped unstackable table"
                                >
                                    <thead>
                                        <tr>
                                            <th> Branch </th>
                                            <th> Target </th>
                                            <th> Sales </th>
                                            <th> Variance </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#each dashData.branchPerfomance.slice(-3) as bp}
                                            <tr>
                                                <td>
                                                    {bp.branch}
                                                </td>
                                                <td>
                                                    {addCommas(bp.target, 2)}
                                                </td>
                                                <td>
                                                    {addCommas(bp.sales, 2)}
                                                </td>
                                                <td>
                                                    {addCommas(bp.variance, 2)}
                                                </td>
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="perfomanceCol segment">
                            <div class="pTitle">
                                Dead Stock

                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <span
                                    on:click={() => {
                                        bpTitle = "Dead Stock";

                                        currentBranchPerfomance =
                                            dashData.branchPerfomance.sort(
                                                (a, b) => {
                                                    return (
                                                        b.deadStockVariance -
                                                        a.deadStockVariance
                                                    );
                                                }
                                            );
                                        handleCurrenctBranchPerfomance();
                                    }}
                                    class="moreIcon"
                                >
                                    <i class="eye icon" />
                                </span>
                            </div>

                            <div class="">
                                <table
                                    class="ui very basic striped unstackable table"
                                >
                                    <thead>
                                        <tr>
                                            <th> Branch </th>
                                            <th> Target </th>
                                            <th> Sales </th>
                                            <th> Variance </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#each dashData.branchPerfomance
                                            .sort((a, b) => {
                                                return b.deadStockVariance - a.deadStockVariance;
                                            })
                                            .slice(-3) as bp}
                                            <tr>
                                                <td>
                                                    {bp.branch}
                                                </td>
                                                <td>
                                                    {addCommas(
                                                        bp.deadStockTarget,
                                                        2
                                                    )}
                                                </td>
                                                <td>
                                                    {addCommas(
                                                        bp.deadStockSales,
                                                        2
                                                    )}
                                                </td>
                                                <td>
                                                    {addCommas(
                                                        bp.deadStockVariance,
                                                        2
                                                    )}
                                                </td>
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="perfomanceCol segment">
                            <div class="pTitle">
                                Short Exp

                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <span
                                    on:click={() => {
                                        bpTitle = "Short Exp";

                                        currentBranchPerfomance =
                                            dashData.branchPerfomance.sort(
                                                (a, b) => {
                                                    return (
                                                        b.shortExpVariance -
                                                        a.shortExpVariance
                                                    );
                                                }
                                            );
                                        handleCurrenctBranchPerfomance();
                                    }}
                                    class="moreIcon"
                                >
                                    <i class="eye icon" />
                                </span>
                            </div>

                            <div class="">
                                <table
                                    class="ui very basic striped unstackable table"
                                >
                                    <thead>
                                        <tr>
                                            <th> Branch </th>
                                            <th> Target </th>
                                            <th> Sales </th>
                                            <th> Variance </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#each dashData.branchPerfomance
                                            .sort((a, b) => {
                                                return b.shortExpVariance - a.shortExpVariance;
                                            })
                                            .slice(-3) as bp}
                                            <tr>
                                                <td>
                                                    {bp.branch}
                                                </td>
                                                <td>
                                                    {addCommas(
                                                        bp.shortExpTarget,
                                                        2
                                                    )}
                                                </td>
                                                <td>
                                                    {addCommas(
                                                        bp.shortExpSales,
                                                        2
                                                    )}
                                                </td>
                                                <td>
                                                    {addCommas(
                                                        bp.shortExpVariance,
                                                        2
                                                    )}
                                                </td>
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>

            <br /> <br />
            <div class="stitle">Latest Transactions</div>

            {#if dashData.latestTransactions}
                <div class="segment">
                    <table class="ui very basic unstackable striped table">
                        <thead>
                            <th> No </th>
                            <th> Name </th>
                            <th> Transaction Type </th>
                            <th> Branch </th>
                            <th> Date </th>
                            <th> Qty </th>
                        </thead>

                        <tbody>
                            {#each dashData.latestTransactions as tr, i}
                                <tr>
                                    <td>
                                        {i + 1}
                                    </td>
                                    <td>
                                        {tr.initName}
                                    </td>

                                    <td>
                                        {tr.type}
                                    </td>

                                    <td>
                                        {tr.branch}
                                    </td>

                                    <td>
                                        {tr.date}
                                    </td>

                                    <td>
                                        {tr.qtyw}W {tr.qtyp}P
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            {/if}
        </div>
    </div>
</main>

<!-- modal -->
{#if showCurrenctBranchPerfomance}
    <div class="perfomanceModal">
        <div class="content">
            <div class="segment">
                <div class="titleBar">
                    <div class="title">Branch Perfomance ({bpTitle})</div>

                    <div class="actions">
                        <div class="icon-btn">
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <i
                                on:click={() => {
                                    showCurrenctBranchPerfomance = false;
                                }}
                                class="ri-close-line"
                            />
                        </div>
                    </div>
                </div>

                <div class="contentBar" style="padding-top: 1em;">
                    <table class="ui very basic unstackable striped table">
                        <thead>
                            <th> No </th>
                            <th> Branch </th>
                            <th> Target </th>
                            <th> Sales</th>
                            <th> Variance </th>
                            <th> Dead.S Target </th>
                            <th> Dead.S Sales </th>
                            <th> Dead.S Variance </th>
                            <th> Short.E Target </th>
                            <th> Short.E Sales </th>
                            <th> Short.E Variance </th>
                        </thead>

                        <tbody>
                            {#each currentBranchPerfomance as br, i}
                                <tr>
                                    <td>
                                        {i + 1}
                                    </td>
                                    <td>
                                        {br.branch}
                                    </td>
                                    <td>
                                        {br.target}
                                    </td>

                                    <td>
                                        {addCommas(br.sales)}
                                    </td>

                                    <td>
                                        {addCommas(br.variance)}
                                    </td>

                                    <td>
                                        {br.deadStockTarget}
                                    </td>

                                    <td>
                                        {addCommas(br.deadStockSales)}
                                    </td>

                                    <td>
                                        {addCommas(br.deadStockVariance)}
                                    </td>

                                    <td>
                                        {br.shortExpTarget}
                                    </td>

                                    <td>
                                        {addCommas(br.shortExpSales)}
                                    </td>

                                    <td>
                                        {addCommas(br.shortExpVariance)}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
{/if}

<!-- modal -->
<style>

    .branchPerfomanceBar {
        display: flex;
        justify-content: space-between;

        flex-direction: column;
    }

    .perfomanceCol {
        width: 100%;
        margin-top: 1em;
    }

    table {
        font-size: x-small !important;
    }

    .pTitle {
        border-bottom: 1px solid rgba(163, 163, 163, 0.379);
    }

    .perfomanceModal {
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(39, 39, 39, 0.476);
        z-index: 10000;
        width: 100vw;
        height: 100vh;
        backdrop-filter: blur(5px);
    }

    .icon-btn {
        margin: 0;
    }

    .segment {
        margin-top: 1em;
    }

    .contentBar {
        max-height: 90vh;
        overflow: auto;
    }

    .moreIcon {
        float: right;
        color: rgb(51, 153, 66);
        cursor: pointer;
    }
    @media only screen and (min-width: 640px) {
        .branchPerfomanceBar {
            display: flex;
            justify-content: space-between;
            margin-top: 1em;
            flex-direction: row;
        }

        .perfomanceCol {
            margin: 0.4em;
        }
    }
</style>
