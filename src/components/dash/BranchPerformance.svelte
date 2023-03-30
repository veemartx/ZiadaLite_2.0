<script>
    import { onMount } from "svelte";
    import { apiBaseUrl } from "../../config/config";
    import {
        addCommas,
        dashCurrentBranchTargetMonth,
    } from "../../scripts/js/methods";

    export let branchPerfomance = [];

    let branchPerfomanceTargetMonth = "";

    let currentBranchPerformance = [];

    let showCurrenctBranchPerfomance = false;

    let bpTitle = "Overall";

    const handleCurrenctBranchPerfomance = () => {
        showCurrenctBranchPerfomance = true;
    };
    onMount(() => {
        branchPerfomanceTargetMonth = dashCurrentBranchTargetMonth();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="contentTitleBar">
                <div class="contentTitle">Branches Perfomance</div>
            </div>

            <div class="">
                {#if branchPerfomance}
                    <div class="branchPerfomanceBar">
                        <div class="perfomanceCol segmente">
                            <div class="pTitle">
                                Overall Top Performing <span class="cmtpd"
                                    >({@html branchPerfomanceTargetMonth})
                                </span>
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <span
                                    on:click={() => {
                                        bpTitle = "Short Exp";

                                        currentBranchPerformance =
                                            branchPerfomance;

                                        handleCurrenctBranchPerfomance();
                                    }}
                                    class="moreIcon"
                                >
                                    <i class="eye icon" />
                                </span>
                            </div>
                            <div class="tableContainer">
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
                                        {#each branchPerfomance.slice(0, 3) as bp}
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
                                                <td
                                                    style={bp.variance < 0
                                                        ? "color:red"
                                                        : "color:green;"}
                                                >
                                                    <b>
                                                        {addCommas(
                                                            bp.variance,
                                                            2
                                                        )}</b
                                                    >
                                                </td>
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="perfomanceCol segmente">
                            <div class="pTitle">
                                Overall Bottom Performing <span class="cmtpd"
                                    >({@html branchPerfomanceTargetMonth})

                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <span
                                        on:click={() => {
                                            bpTitle = "Overall";

                                            currentBranchPerformance =
                                                branchPerfomance;
                                            handleCurrenctBranchPerfomance();
                                        }}
                                        class="moreIcon"
                                    >
                                        <i class="eye icon" />
                                    </span>
                                </span>
                            </div>
                            <div class="tableContainer">
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
                                        {#each branchPerfomance.slice(-3) as bp}
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
                                                <td
                                                    style={bp.variance < 0
                                                        ? "color:red"
                                                        : "color:green;"}
                                                >
                                                    <b>
                                                        {addCommas(
                                                            bp.variance,
                                                            2
                                                        )}</b
                                                    >
                                                </td>
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="branchPerfomanceBar">
                        <div class="perfomanceCol segmente">
                            <div class="pTitle">
                                Dead Stock Top Performing <span class="cmtpd"
                                    >({@html branchPerfomanceTargetMonth})
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <span
                                        on:click={() => {
                                            bpTitle = "Dead Stock";

                                            currentBranchPerformance =
                                                branchPerfomance.sort(
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
                                </span>
                            </div>

                            <div class="tableContainer">
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
                                        {#each branchPerfomance
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

                                                <td
                                                    style={bp.deadStockVariance <
                                                    0
                                                        ? "color:red"
                                                        : "color:green;"}
                                                >
                                                    <b>
                                                        {addCommas(
                                                            bp.deadStockVariance,
                                                            2
                                                        )}</b
                                                    >
                                                </td>
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="perfomanceCol segmente">
                            <div class="pTitle">
                                Dead Stock Bottom Performing

                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <span
                                    on:click={() => {
                                        bpTitle = "Dead Stock";

                                        currentBranchPerformance =
                                            branchPerfomance.sort((a, b) => {
                                                return (
                                                    b.deadStockVariance -
                                                    a.deadStockVariance
                                                );
                                            });
                                        handleCurrenctBranchPerfomance();
                                    }}
                                    class="moreIcon"
                                >
                                    <i class="eye icon" />
                                </span>
                            </div>

                            <div class="tableContainer">
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
                                        {#each branchPerfomance
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
                                                <td
                                                    style={bp.deadStockVariance <
                                                    0
                                                        ? "color:red"
                                                        : "color:green;"}
                                                >
                                                    <b>
                                                        {addCommas(
                                                            bp.deadStockVariance,
                                                            2
                                                        )}</b
                                                    >
                                                </td>
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="branchPerfomanceBar">
                        <div class="perfomanceCol segmente">
                            <div class="pTitle">
                                Short Exp Top Performing  <span class="cmtpd"
                                >({@html branchPerfomanceTargetMonth})

                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <span
                                    on:click={() => {
                                        bpTitle = "Short Exp";

                                        currentBranchPerformance =
                                            branchPerfomance.sort((a, b) => {
                                                return (
                                                    b.shortExpVariance -
                                                    a.shortExpVariance
                                                );
                                            });
                                        handleCurrenctBranchPerfomance();
                                    }}
                                    class="moreIcon"
                                >
                                    <i class="eye icon" />
                                </span>
                            </div>

                            <div class="tableContainer">
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
                                        {#each branchPerfomance
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
                                                <td
                                                    style={bp.shortExpVariance <
                                                    0
                                                        ? "color:red"
                                                        : "color:green;"}
                                                >
                                                    <b>
                                                        {addCommas(
                                                            bp.shortExpVariance,
                                                            2
                                                        )}</b
                                                    >
                                                </td>
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="perfomanceCol segmente">
                            <div class="pTitle">
                                Short Exp Bottom Performing

                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <span
                                    on:click={() => {
                                        bpTitle = "Short Exp";

                                        currentBranchPerformance =
                                            branchPerfomance.sort((a, b) => {
                                                return (
                                                    b.shortExpVariance -
                                                    a.shortExpVariance
                                                );
                                            });
                                        handleCurrenctBranchPerfomance();
                                    }}
                                    class="moreIcon"
                                >
                                    <i class="eye icon" />
                                </span>
                            </div>

                            <div class="tableContainer">
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
                                        {#each branchPerfomance
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

                                                <td
                                                    style={bp.shortExpVariance <
                                                    0
                                                        ? "color:red"
                                                        : "color:green;"}
                                                >
                                                    <b>
                                                        {addCommas(
                                                            bp.shortExpVariance,
                                                            2
                                                        )}</b
                                                    >
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
        </div>
    </div>
</main>

<!-- modal -->
{#if showCurrenctBranchPerfomance}
    <div class="perfomanceModal">
        <div class="content">
            <div class="segmente">
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
                            {#each currentBranchPerformance as br, i}
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

    .tableContainer {
        overflow-x: auto;
    }

    .pTitle {
        border-bottom: 1px solid rgba(163, 163, 163, 0.379);
        padding: 0.4em;
        font-weight: 600;
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

    .segmente {
        margin-top: 1em;
        background: #fff;
        border-radius: 4px;
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

    .cmtpd {
        font-size: 10px;
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
