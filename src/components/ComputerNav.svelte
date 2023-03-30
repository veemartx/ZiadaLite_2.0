<script>
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";

    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="compNav">
                <Link to="/products/new">
                    <div class="nav">
                        <i class="ri-home-line" /> &nbsp; New &nbsp;
                    </div>
                </Link>

                <Link to="/dash">
                    <div class="nav">
                        <i class="ri-home-line" /> &nbsp; Home &nbsp;
                    </div>
                </Link>

                <Link to="/products">
                    <div class="nav">
                        <i class="ri-product-hunt-line" /> &nbsp; Products &nbsp;
                    </div>
                </Link>

                <Link to="/transfers">
                    <div class="nav">
                        <i class="ri-file-transfer-line" /> &nbsp; Transfers &nbsp;
                    </div>
                </Link>

                <Link to="/orders">
                    <div class="nav">
                        <i class="ri-file-transfer-line" /> &nbsp; Orders &nbsp;
                    </div>
                </Link>

                <Link to="/transfer-requests">
                    <div class="nav">
                        <i class="ri-file-transfer-line" /> &nbsp; T-Requests &nbsp;
                    </div>
                </Link>

                <Link to="/users">
                    <div class="nav">
                        <i class="ri-user-5-line" />
                        &nbsp; Users &nbsp;
                    </div>
                </Link>

                <Link to="/expired">
                    <div class="nav">
                        <i class="ri-calendar-todo-fill" />
                        &nbsp; Expired &nbsp;
                    </div>
                </Link>

                <Link to="/reports">
                    <div class="nav">
                        <i class="ri-file-chart-line" />
                        &nbsp; Reports &nbsp;
                    </div>
                </Link>

                <Link to="/settings">
                    <div class="nav">
                        <i class="ri-settings-6-line" /> &nbsp; Settings &nbsp;
                    </div>
                </Link>

                <Link to="/trash">
                    <div class="nav">
                        <i class="ri-delete-bin-line" /> &nbsp; Trash &nbsp;
                    </div>
                </Link>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        background: var(--background-secondary);
    }

    .content {
        text-align: left;
        line-height: 2em;
    }

    .compNav {
        display: flex;
        justify-content: space-between;
    }
    .nav {
        display: flex;
        padding-right: 1em;
        padding-top: 0.7em;
        padding-bottom: 0.7em;
        color: aliceblue;
        font-size: 13px;
        font-weight: 400;
    }
</style>
