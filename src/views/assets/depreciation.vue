<template>
    <my-quick-table
            modelName="depreciation"
            modelNameZh="折旧"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '名称',
                        key: 'name'
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
