<script>
    export let title = "Title";
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="title">{title}</div>
            <div class="actions">
                <slot />
            </div>
        </div>
    </div>
</main>
