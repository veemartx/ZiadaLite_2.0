<script>
    import { formatDate } from "../../scripts/js/methods";

    export let latestTransactions = [];

    let pageSize = 30;

    let currentPage = 1;

    let totalNumberOfPages = 1;

    let pages = [];

    $: {
        if (latestTransactions.length > 0) {
            totalNumberOfPages = latestTransactions.length / pageSize + 1;

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
                <div class="contentTitle">Latest Transactions</div>
            </div>

            <div class="latestTransactionsContainer">
                <div class="" style="overflow-x: auto;">
                    <table
                        class="ui striped unstackable single line very basic table"
                    >
                        <thead>
                            <tr>
                                <th class="ttitle"> Name </th>

                                <th class="ttitle"> Branch </th>

                                <th class="ttitle"> Date </th>

                                <th class="ttitle"> Action </th>

                                <th class="ttitle"> Qty (WP) </th>
                            </tr>
                        </thead>

                        <tbody class="latestTransactionsList">
                            {#each latestTransactions as tr, i}
                                <tr>
                                    <td>
                                        {tr.initName}
                                    </td>

                                    <td>
                                        {tr.branch}
                                    </td>

                                    <td>
                                        {formatDate(tr.date)}
                                    </td>

                                    <td>
                                        {tr.type}
                                    </td>

                                    <td>
                                        {tr.qtyw}W {tr.qtyp}P
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .latestTransactionsContainer {
        background: #fff;
        padding: 1em;
        margin-top: 1em;
    }
</style>
