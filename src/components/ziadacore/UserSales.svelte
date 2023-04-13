<script>
    import { onMount } from "svelte";
    import { apiBaseUrl } from "../../config/config";
    import axios from "axios";
    import { Link } from "svelte-navigator";
    import { addCommas, formatDate } from "../../scripts/js/methods";
    import dayjs from "dayjs";
    import { utils, writeFileXLSX } from "xlsx";

    export let startDate;
    export let endDate;
    export let user;

    let userSales = [];

    let currentPageSales = [];

    let userSalesLoading = true;

    let pageSize = 20;

    let currentPage = 1;

    let totalNumberOfPages = 1;

    let pages = [];

    let offset;

    let totalCostValue = 0;

    let totalRetailValue = 0;

    let percentageMargin = 0;

    $: {
        offset = (currentPage - 1) * pageSize;

        currentPageSales = userSales.slice(offset, offset + pageSize);
    }

    // make pages
    $: {
        if (userSales.length > 0) {
            totalNumberOfPages = userSales.length / pageSize + 1;

            for (let x = 1; x <= totalNumberOfPages; x++) {
                pages.push(x);
            }

            pages = pages;
        }
    }

    $: {
        if (startDate && endDate) {
            getUserSales();
        }
    }

    const getUserSales = async () => {
        userSalesLoading = true;

        let dt = {
            start: startDate,
            end: endDate,
            user: user,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}core/getUserSales.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            userSalesLoading = false;

            userSales = res;

            totalCostValue = userSales
                .map((v) => v.cost)
                .reduce((partialSum, a) => partialSum + a, 0);
            totalRetailValue = userSales
                .map((v) => parseFloat(v.retail))
                .reduce((partialSum, a) => partialSum + a, 0);

            percentageMargin =
                ((totalRetailValue - totalCostValue) / totalCostValue) * 100;
        } catch (err) {
            userSalesLoading = false;
            console.log(err);
        }
    };

    const generateExcel = () => {
        let timestamp = dayjs();
        // console.log(inventory);
        const ws = utils.json_to_sheet(userSales);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(
            wb,
            `${user}_${startDate}_${endDate}_UserSales_${timestamp}.xlsx`
        );
    };

    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="titleBar">
                <div class="title">
                    Sales Trend {#if user}
                        <span style="color:crimson;font-weight:600;"
                            >({user})
                        </span>
                    {/if}
                </div>
            </div>

            <div class="summaryContainer">
                <div class="summaryCol" style="color:purple">
                    Total Sales: {addCommas(userSales.length)}
                </div>

                <div class="summaryCol" style="color:dodgerblue">
                    Retail Value: {addCommas(totalRetailValue, 2)}
                </div>

                <div class="summaryCol" style="color:darkgreen">
                    Cost Value: {addCommas(totalCostValue, 2)}
                </div>

                <div class="summaryCol" style="color:crimson">
                    Margin: {addCommas(percentageMargin, 2)}%
                </div>
            </div>
            <br />
            <div class="contentBar">
                {#if userSales}
                    <div class="">
                        <table
                            class="ui very basic striped unstackable single line table"
                        >
                            <thead>
                                <tr>
                                    <th> No </th>
                                    <th> Sale Net </th>
                                    <th> Sale Total </th>
                                    <th> Cost </th>
                                    <th> Receipt </th>
                                    <th> Date </th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each currentPageSales as s, i}
                                    <tr>
                                        <td>
                                            {i + 1 + offset}
                                        </td>
                                        <td>
                                            {s.saleNet}
                                        </td>
                                        <td>{addCommas(s.retail)}</td>
                                        <td>{addCommas(s.cost)}</td>
                                        <td>{addCommas(s.receipt)}</td>
                                        <td>{formatDate(s.date)}</td>
                                        <td>
                                            <Link
                                                to={`/ziada-core/sales/s/${s.id}`}
                                            >
                                                <i class="eye icon" />View
                                            </Link>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                        <br />
                        <br />
                        <div class="pagesCol">
                            {#each pages as pg}
                                <button
                                    on:click={() => {
                                        currentPage = pg;
                                    }}
                                    class={currentPage == pg
                                        ? "ui green  mini icon button"
                                        : "ui basic mini icon button"}
                                >
                                    {pg}
                                </button>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</main>

<style>
    .summaryContainer {
        display: flex;
        padding: 1em;
        background: rgba(255, 0, 0, 0.101);
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .summaryCol {
        width: 45%;
        font-weight: 600;
    }

    .contentBar {
        overflow-x: auto;
    }

    @media only screen and (min-width: 640px) {
        .summaryContainer {
            display: flex;
            padding: 1em;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        .summaryCol {
            flex: 1;
        }
    }
</style>
