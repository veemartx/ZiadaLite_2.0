<script>
    import transferIcon from "../assets/icons/transferIcon.png";
    import adjustIcon from "../assets/icons/adjustIcon.png";
    import sellIcon from "../assets/icons/sellIcon.png";
    import requestIcon from "../assets/icons/requestIcon.png";
    import { Link } from "svelte-navigator";
</script>

<main>
    <div class="wrapper">
        <div class="quickAppsContainer">
            <Link to="/products/sell">
                <div class="appPanel">
                    <div class="appIcon">
                        <img src={sellIcon} alt="sell app icon" />
                    </div>
                    <div class="appName">Sale Edit</div>
                </div>
            </Link>

            <Link to="/products/adjust">
                <div class="appPanel">
                    <div class="appIcon">
                        <img src={adjustIcon} alt="adjust app icon" />
                    </div>
                    <div class="appName">Adjust</div>
                </div>
            </Link>

            <Link to="/products/transfer">
                <div class="appPanel">
                    <div class="appIcon">
                        <img src={transferIcon} alt="transfer app icon" />
                    </div>
                    <div class="appName">Transfer</div>
                </div>
            </Link>

            <Link to="/products/request">
                <div class="appPanel">
                    <div class="appIcon">
                        <img src={requestIcon} alt="request app icon" />
                    </div>
                    <div class="appName">Request</div>
                </div>
            </Link>
        </div>
    </div>
</main>

<style>
    .quickAppsContainer {
        display: flex;
        justify-content: space-between;
    }

    .appPanel {
        text-align: center;
        padding-inline: 0.8em;
        padding-top: 0.5em;
        padding-bottom: 0.2em;
        border-radius: 4px;
        flex: 1;
        margin: 0.7em;
        border: 1px solid rgba(217, 217, 217, 0.119);
        color: rgba(240, 248, 255, 0.708);
    }

    .appPanel:hover {
        background: rgba(255, 255, 255, 0.019);
    }

    .appIcon {
        padding-inline: 0.3em;
    }
    .appIcon img {
        width: 30px;
        height: 30px;
    }

    .appName {
        font-size: 12px;
    }
</style>
