<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { useLocation } from "svelte-navigator";
    import { apiBaseUrl } from "../../config/config";
    import Breadcrumbs from "../Breadcrumbs.svelte";

    const location = useLocation();

    let productId;

    $: {
        window.scrollTo(0, 0);

        if ($location) {
            getProductId($location);
        }
    }

    let crumbs = {
        title: "Product",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Product",
                url: "/product/pd/" + productId,
            },
        ],
    };

    const getProductId = async ($location) => {
        let pathnameArr = $location.pathname.split("/");

        let pid = pathnameArr[pathnameArr.length - 1];

        productId = pid;

        let dt = {
            p_id: productId,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}getProduct.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="breadcrumbs">
                <Breadcrumbs {crumbs} />
            </div>
        </div>
    </div>
</main>

<style>
</style>
