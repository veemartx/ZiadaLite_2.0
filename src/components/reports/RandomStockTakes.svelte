<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { apiBaseUrl } from "../../config/config";
    import { formatDate, updateCrumbs } from "../../scripts/js/methods";
    import TitleActions from "../../widgets/TitleActions.svelte";

    let crumbs = {
        title: "Random Stock Takes",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Reports",
                url: "/reports/",
            },
            {
                name: "Random Stock Takes",
                url: "/reports/random-stock-takes",
            },
        ],
    };

    let titleActions = [
        {
            title: "Admin Gen Reports",
            url: "/reports/admin-gen-reports",
            icon: "bar chart icon",
            color: "dodgerblue",
        },
        {
            title: "Random Stock Take (RST)",
            url: "/reports/random-stock-takes",
            icon: "bar chart icon",
            color: "teal",
        },
    ];

    let actionsTitle = "Actions";

    onMount(() => {
        updateCrumbs(crumbs);
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="productsMainContainer">
                <div class="titleBar">
                    <div class="title">Random Stock Take</div>
                    <div class="actions">
                        <div class="bt">
                            <Link to="/reports/random-stock-take/create">
                                <button class="ui mini purple icon button">
                                    <i class="plus icon" /> Create
                                </button>
                            </Link>
                        </div>
                        <div class="bt">
                            <TitleActions
                                title={actionsTitle}
                                actions={titleActions}
                            />
                        </div>
                    </div>
                </div>

                <div class="productsTableCol" />

                <div class="pagesCol" />
            </div>
        </div>
    </div>
</main>

<style>
    main {
        margin-top: 1em;
        margin-bottom: 2em;
    }
    .productsTableCol {
        overflow-x: auto;
        margin-top: 0.5em;
    }

    .productsMainContainer {
        padding: 1em;
        background: #fff;
    }

    .pagesCol {
        margin-top: 2em;
        margin-bottom: 2em;
    }

    .title {
        font-weight: 600;
    }

    .actions {
        padding-top: 0.5em;
        display: flex;
    }

    .bt {
        margin-inline: 0.5em;
    }
</style>
