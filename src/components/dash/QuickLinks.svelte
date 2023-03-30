<script>
    import { Link } from "svelte-navigator";
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="qlinksColumn">
                <Link to="/products/new">
                    <div class="qlink">
                        <div class="qli"><i class="ri-add-circle-line" /></div>
                        <div class="qlt">New</div>
                    </div>
                </Link>

                <a
                    href="https://cpd.pharmaplusziadalite.co.ke/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <div class="qlink">
                        <div class="qli"><i class="ri-stethoscope-line" /></div>
                        <div class="qlt">Training</div>
                    </div>
                </a>

                <Link to="/issues">
                    <div class="qlink">
                        <div class="qli">
                            <i class="ri-customer-service-line" />
                        </div>
                        <div class="qlt">Support</div>
                    </div>
                </Link>

                <Link to="/services">
                    <div class="qlink">
                        <div class="qli"><i class="ri-apps-line" /></div>
                        <div class="qlt">Services</div>
                    </div>
                </Link>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        background: #fff;
        margin-top: 1em;
    }

    .qlinksColumn {
        display: flex;
        justify-content: right;
    }

    .qlinksColumn {
        padding: 0.5em;
    }

    .qlink {
        display: flex;
        margin-inline: 0.4em;
        font-size: small;
    }

    .qli {
        /* display: inline-block; */
        padding: 0.1em;
        color: var(--text-primary-light);
    }

    .qlt {
        /* display: inline-block; */
        padding-inline-start: 0.2em;
        color: var(--text-primary-light);
    }

    @media only screen and (min-width: 640px) {
        main {
            background: #fff;
            margin-top: 0.5em;
        }
    }
</style>
