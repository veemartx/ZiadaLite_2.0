<script>
    import { formatDate } from "../../scripts/js/methods";

    export let transactions = [];

    export let packSize = 1;
</script>

<main>
    <div class="content">
        <table class="ui very basic striped unstackable single line table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Type</th>
                    <th>Qty</th>
                    <th>Init</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {#each transactions as t, i}
                    <tr>
                        <td>{i + 1}</td>
                        <td>{t.type}</td>
                        <td
                            >{Math.floor(t.pqty / packSize) +
                                "W" +
                                " " +
                                (t.pqty % packSize) +
                                "P"}</td
                        >
                        <td>{t.initiator}</td>
                        <td>{formatDate(t.date)}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</main>

<style>
    .content {
        padding: 1em;
    }
</style>
