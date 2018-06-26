<template>
    <thead class="admin-table-header">
        <tr v-if="columns.length">
            <th v-for="column in columns">
                {{ column.title }}
            </th>
        </tr>
        <slot></slot>
    </thead>
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
