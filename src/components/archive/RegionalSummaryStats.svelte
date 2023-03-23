<script>
    import { addCommas, numberFormat } from "../../scripts/js/methods";

    export let stats = [];

    export let displayType;
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="regionsSummary segment">
                <table class="ui striped very basic unstackable table">
                    <thead>
                        <tr>
                            <th> No </th>
                            <th> Region </th>
                            <th> All Products </th>
                            <th> Short Exp </th>
                            <th> Dead Stock </th>
                            <th> Today's Sales </th>

                            <th> Yesterday's Sales </th>
                            <th> Unfulfilled TR. </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each stats as stat, i}
                            <tr>
                                <td>
                                    {i + 1}
                                </td>
                                <td>
                                    {stat.region}
                                </td>
                                <td>
                                    {addCommas(stat.products, 0)}
                                    <span
                                        >( {numberFormat(stat.productsValue, {
                                            notation: displayType,
                                            precision: 2,
                                            type: "currency",
                                        })})
                                    </span>
                                </td>

                                <td>
                                    {addCommas(stat.shortExp, 0)}
                                    <span
                                        >( {numberFormat(stat.shortExpValue, {
                                            notation: displayType,
                                            precision: 2,
                                            type: "currency",
                                        })})
                                    </span>
                                </td>

                                <td>
                                    {addCommas(stat.deadStock, 0)}
                                    <span
                                        >( {numberFormat(stat.deadStockValue, {
                                            notation: displayType,
                                            precision: 2,
                                            type: "currency",
                                        })})
                                    </span>
                                </td>

                                <td>
                                    {addCommas(stat.todaySales, 0)}
                                    <span
                                        >( {numberFormat(stat.todaySalesValue, {
                                            notation: displayType,
                                            precision: 2,
                                            type: "currency",
                                        })})
                                    </span>
                                </td>

                                <td>
                                    {addCommas(stat.yesterdaySales, 0)}
                                    <span
                                        >( {numberFormat(
                                            stat.yesterdaySalesValue,
                                            {
                                                notation: displayType,
                                                precision: 2,
                                                type: "currency",
                                            }
                                        )})
                                    </span>
                                </td>

                                <td>
                                    {addCommas(stat.unfulfilled, 0)}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>

<style>
    .regionsSummary {
        margin-top: 0.5em;
    }

    table {
        font-size: smaller !important;
    }
</style>
