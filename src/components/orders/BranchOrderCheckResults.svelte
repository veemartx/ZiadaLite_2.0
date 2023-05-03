<script>
    export let products = [];

    let pageSize = 20;

    let currentPage = 1;

    let totalNumberOfPages = 1;

    let pages = [];

    let offset;

    let currentPageProducts = [];

    $: {
        if (products.length > 0) {
            offset = (currentPage - 1) * pageSize;

            currentPageProducts = products.slice(offset, offset + pageSize);
        }
    }

    // make pages
    $: {
        if (products.length > 0) {
            totalNumberOfPages = currentPageProducts.length / pageSize + 1;

            pages = [];

            for (let x = 1; x <= totalNumberOfPages; x++) {
                pages.push(x);
            }

            pages = pages;
        }
    }
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="titleBar">
                <div class="title">Bod Check Products</div>
            </div>

            <div class="contentBar">
                <div id="order-check">
                    <table
                        class="ui very basic striped unstackable single line table"
                    >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Code</th>
                                <th>BodNo</th>
                                <th>Expiry</th>
                                <th>Host Branch</th>
                                <th>Available</th>
                                <th>Ordered</th>
                                <th>Transferred</th>
                                <th>Balance</th>
                                <th>MType</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each currentPageProducts as p, i}
                                <tr>
                                    <td>{i + 1 + offset}</td>
                                    <td>{p.name}</td>
                                    <td>{p.code}</td>
                                    <td>{p.bodNo}</td>
                                    <td>{p.expiryDate}</td>
                                    <td>{p.hostBranch}</td>
                                    <td>{p.availableQty}</td>
                                    <td>{p.orderedQty}</td>
                                    <td>{p.transferredQty}</td>
                                    <td>{p.remainingQty}</td>
                                    <td>
                                        <span
                                            style={p.transferType == "Move"
                                                ? "color:crimson;font-weight:600"
                                                : "color:orangered;font-weight:600"}
                                            >{p.transferType}</span
                                        >
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <br />
                <br />
                <div class="">
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
    </div>
</main>

<style>
    .contentBar {
        overflow-x: auto;
        margin-bottom: 1em;
    }

    .title {
        font-size: 15px;
        font-weight: 600;
        color: var(--text-primary-light);
    }
</style>
