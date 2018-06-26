<template>
    <my-quick-table
            modelName="workload"
            modelNameZh="固定资产工作量"
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
                        title: '年月份',
                        key: 'year_month',
                        width: 160
                    },
                    {
                        title: '工作量',
                        key: 'workload',
                        width: 160
                    },
                    {
                        title: '月折旧率',
                        key: 'rate',
                        width: 160
                    },
                    {
                        title: '月折旧额',
                        key: 'number',
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
        mounted() {
        },
        methods: {
        },
    };
</script>
