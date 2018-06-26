<template>
    <my-quick-table
            modelName="asset_use_type"
            modelNameZh="固定资产使用方式"
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
                        title: '类型',
                        key: 'type',
                        width: 160,
                        render: (h, params)=>{
                            return h('div', {}, params.row.type === '1' ? '增型' : '减型')
                        }
                    },
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
