<template>
    <my-quick-table
            modelName="company"
            modelNameZh="公司"
            :addAble="false"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                columns: [
                    {
                        title: "名称",
                        key: "name",
                        width: 160
                    },
                    {
                        title: "介绍",
                        key: "description",
                        width: 320
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 200,
                        buttons: [
                            'BUTTON_EDIT',
//                            'BUTTON_REMOVE'
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
