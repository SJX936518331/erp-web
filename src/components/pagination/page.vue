<template>
    <div class="admin-page-box">
        <Page :total="40" size="small"></Page>
        <Page :total="40" size="small" show-elevator show-sizer></Page>
        <Page :total="40" size="small" show-total></Page>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
        },
        methods: {
        }
    }
</script>

<style scoped>
</style>
