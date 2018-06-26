<template>
    <tbody class="admin-table-body">
        <slot></slot>
    </tbody>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            columns: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        computed: {
        },
        mounted() {
        },
        methods: {
        },
    }
</script>

<style scoped>
</style>
