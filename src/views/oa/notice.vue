<template>
    <my-quick-table
            modelName="notice"
            modelNameZh="公告"
            :columns="columns"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '发布时间',
                        key: 'create_time',
                        width: 160
                    },
                    {
                        title: '发布人',
                        key: 'user_name',
                        width: 160
                    },
                    {
                        title: '标题',
                        key: 'title',
                        width: 160
                    },
                    {
                        title: '内容',
                        key: 'content',
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
            };
        },
        mounted() {
        },
        methods: {
        },
    };
</script>
