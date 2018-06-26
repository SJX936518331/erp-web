<template>
    <my-quick-table
            :addAble="false"
            :filters="filters"
            url="/balance_in_item/department_total"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "部门编号",
                        key: "department_code",
                        width: 160
                    },
                    {
                        title: "部门名称",
                        key: "department_name",
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
