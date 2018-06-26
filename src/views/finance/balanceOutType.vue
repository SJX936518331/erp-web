<template>
    <my-quick-table
            :addAble="false"
            :filters="filters"
            url="/balance_out_item/type"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "支出类型编号",
                        key: "type_code",
                        width: 160
                    },
                    {
                        title: "支出类型名称",
                        key: "type_name",
                        width: 160
                    },
                    {
                        title: "总金额",
                        key: "total_money",
                        width: 160
                    },
                ],
                pagination: {},
            }
        },
        computed: {
            filters() {
                return {
                    branch_id: this.$util.getBranch().id
                }
            },
        },
        methods: {
        }
    }
</script>
