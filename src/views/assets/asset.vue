<template>
    <my-quick-table
            modelName="asset"
            modelNameZh="固定资产"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '编号',
                        key: 'code',
                        width: 240
                    },
                    {
                        title: '名称',
                        key: 'name',
                        width: 160
                    },
//                    {
//                        title: '类型',
//                        key: 'type',
//                        render: (h, params)=>{
//                            return h('div', {}, params.row.type === '1' ? '资产增加' : '资产减少')
//                        }
//                    },
                    {
                        title: '备注',
                        key: 'note',
                        width: 320
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
