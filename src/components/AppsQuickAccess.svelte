<script>
    import CoreIcon from "../assets/icons/sellIcon.png";
    import ChatIcon from "../assets/icons/chat-bubble.png";
    import TasksIcon from "../assets/icons/tasks.png";
    import FolderIcon from "../assets/icons/folder.png";
    import ZConnectIcon from "../assets/icons/zconnect.png";
    import SupportIcon from "../assets/icons/support.png";

    import MarketingIcon from "../assets/icons/marketing.png";
    import DeliverIcon from "../assets/icons/deliver.png";

    import { Link } from "svelte-navigator";
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="titlebar">
                <div class="title">Ziada Apps</div>
            </div>
            <div class="appDrawer">
                <div class="appPanel">
                    <Link to="/apps/zconnect">
                        <div class="appIcon">
                            <img src={ZConnectIcon} alt="connect icon" />
                        </div>
                        <div class="appName">ZConnect <sup>&trade;</sup></div>
                    </Link>
                </div>

                <div class="appPanel">
                    <Link to="/apps/store">
                        <div class="appIcon">
                            <img src={CoreIcon} alt="sales icon" />
                        </div>
                        <div class="appName">Ecommerce</div>
                    </Link>
                </div>

                <div class="appPanel">
                    <Link to="/apps/tasks">
                        <div class="appIcon">
                            <img src={TasksIcon} alt="tasks icon" />
                        </div>
                        <div class="appName">ZTasks <sup>&trade;</sup></div>
                    </Link>
                </div>

                <div class="appPanel">
                    <Link to="/apps/file-manager">
                        <div class="appIcon">
                            <img src={FolderIcon} alt="files icon" />
                        </div>
                        <div class="appName">File Manager</div>
                    </Link>
                </div>

                <div class="appPanel">
                    <Link to="/apps/chat">
                        <div class="appIcon">
                            <img src={ChatIcon} alt="sales icon" />
                        </div>
                        <div class="appName">Ziada Chat</div>
                    </Link>
                </div>

                <div class="appPanel">
                    <Link to="/apps/support">
                        <div class="appIcon">
                            <img src={SupportIcon} alt="sales icon" />
                        </div>
                        <div class="appName">Tech Support</div>
                    </Link>
                </div>

                <div class="appPanel">
                    <Link to="/apps/zdeliver">
                        <div class="appIcon">
                            <img src={DeliverIcon} alt="deliver icon" />
                        </div>
                        <div class="appName">ZDeliver <sup>&trade;</sup></div>
                    </Link>
                </div>

                <div class="appPanel">
                    <Link to="/apps/znetwork">
                        <div class="appIcon">
                            <img src={MarketingIcon} alt="network icon" />
                        </div>
                        <div class="appName">ZNetwork <sup>&trade;</sup></div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        margin-top: 1em;
    }

    .content {
        border: 1px solid rgba(255, 166, 0, 0.345);
    }
    .title {
        color: green;
        font-size: 15px;
        padding: 0.8em;
        font-weight: 600;
    }

    .appDrawer {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .appPanel {
        border: 1px solid rgba(255, 0, 157, 0.063);
        padding-inline: 0.2em;
        border-radius: 4px;
        padding-top: 0.7em;
        padding-bottom: 0.4em;
        text-align: center;
        margin: 0.5em;
        width: 25%;
    }

    .appIcon img {
        width: 40px;
        height: 40px;
        padding-inline: 0.4em;
    }

    .appName {
        margin-top: -0.4em;
        padding-inline: 0.4em;
        font-size: smaller;
        font-weight: 600;
        color: var(--text-primary-light);
    }

    .titlebar {
        border-bottom: 1px solid rgba(255, 166, 0, 0.345);
    }
</style>
