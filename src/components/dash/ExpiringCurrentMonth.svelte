<script>
    import { Link } from "svelte-navigator";

    export let expiringCurrentMonth = [];

    let pageSize = 30;

    let currentPage = 1;

    let totalNumberOfPages = 1;

    let pages = [];

    let currentPageProducts = [];

    let offset;

    let today = new Date();

    // set currentMonth
    today.setMonth(today.getMonth());

    let currentMonth = today.toLocaleString("default", { month: "long" });

    // set previousMonth
    today.setMonth(today.getMonth() - 1);

    let previousMonth = today.toLocaleString("default", { month: "long" });

    $: {
        offset = (currentPage - 1) * pageSize;

        currentPageProducts = expiringCurrentMonth.slice(
            offset,
            offset + pageSize
        );

        // console.log(currentPageProducts);
    }

    $: {
        if (expiringCurrentMonth.length > 0) {
            totalNumberOfPages = expiringCurrentMonth.length / pageSize + 1;

            for (let x = 1; x <= totalNumberOfPages; x++) {
                pages.push(x);
            }

            pages = pages;
        }
    }
</script>

<main>
    <div class="wrappper">
        <div class="content">
            <div class="contentTitleBar">
                <div class="contentTitle">
                    Expiring This Month ({currentMonth})
                </div>
            </div>
            <div class="expiringCurrentMonthContainer">
                <div class="" style="overflow-x: auto;">
                    <table
                        class="ui striped unstackable single line very basic table"
                    >
                        <thead>
                            <tr>
                                <th> No. </th>

                                <th> Name </th>

                                <th> Type </th>

                                <th> Expiry </th>

                                <th> Branch </th>

                                <th> Qty (WP) </th>

                                <th> Req'sted </th>

                                <th> Checked </th>

                                <th> View </th>
                            </tr>
                        </thead>

                        <tbody class="expiringCurrentMonthList">
                            {#each currentPageProducts as ecm, i}
                                <tr>
                                    <td>
                                        {i + 1 + offset}
                                    </td>

                                    <td>
                                        {ecm.name}
                                    </td>

                                    <td>
                                        {ecm.type}
                                    </td>

                                    <td>
                                        {ecm.expiryDate}
                                    </td>

                                    <td>
                                        {ecm.branch}
                                    </td>

                                    <td>
                                        {ecm.qtyw}W {ecm.qtyp}P
                                    </td>

                                    <td
                                        style={ecm.requested == "Y"
                                            ? "color:green"
                                            : "color:red"}
                                        ><b>{ecm.requested}</b></td
                                    >

                                    <td>
                                        {ecm.checks}
                                    </td>

                                    <td>
                                        <div class="actions">
                                            <Link to={`/product/p/${ecm.id}`}>
                                                <i class="eye icon" /> View
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

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
        </div>
    </div>
</main>

<style>
    .expiringCurrentMonthContainer {
        background: #fff;
        padding: 1em;
        margin-top: 1em;
    }


    .pagesCol {
        margin-top: 2em;
    }
</style>
