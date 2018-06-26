<template>
    <my-quick-table
            modelName="logistics"
            modelNameZh="物流"
            :columns="columns"
            ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                columns: [
                    {
                        title: "物流名称",
                        key: "name",
                        width: 160
                    },
                    {
                        title: "快递公司",
                        key: "company",
                        width: 160
                    },
                    {
                        title: "备注",
                        key: "note",
                        width: 320
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 200,
                        buttons: [
                            'BUTTON_EDIT',
                            'BUTTON_REMOVE'
                        ]
                    }
                ],
            }
        },
        mounted() {
        },
        methods: {
        },
    }
</script>
