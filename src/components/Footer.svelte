<script>
    const currentYear = new Date().getFullYear();
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="copyRight">
                &copy {currentYear} Pharmaplus Pharmacies
            </div>

            <div class="designBy">
                Designed & Developed By Ziadapharma Solutions
            </div>
        </div>
    </div>
</main>

<style>
    main {
        padding-top: 1em;
        padding-bottom: 1em;
        color: aliceblue;
    }

    .content {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        text-align: center;
    }

    @media only screen and (min-width: 640px) {
        .content {
            flex-direction: row;
        }
    }
</style>
