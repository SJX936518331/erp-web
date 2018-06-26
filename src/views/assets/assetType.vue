<template>
    <my-quick-table
            modelName="asset_type"
            modelNameZh="固定资产类型"
            :filters="filters"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '名称',
                        key: 'name',
                        width: 160
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 200,
                        buttons:[
                            'BUTTON_EDIT',
                            'BUTTON_REMOVE'
                        ]
                    }
                ],
            };
        },
        computed: {
            filters() {
                return {
                    account_set_id: this.$util.getAccountSet().id,
                }
            },
        },
        mounted() {
        },
        methods: {
        },
    };
</script>
