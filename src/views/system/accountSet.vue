<template>
    <my-quick-table
            modelName="account_set"
            modelNameZh="帐套"
            :filters="filters"
            :addAble="true"
            :columns="columns" ref="table"></my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "编号",
                        key: "code",
                        width: 160
                    },
                    {
                        title: "名称",
                        key: "name",
                        width: 160,
                        editable: true
                    },
                    {
                        title: "分支机构",
                        key: "branch_name",
                        width: 160
                    },
                    {
                        title: "是否使用",
                        key: "is_use",
                        width: 160,
                        render: (h, params)=>{
                            return h('div', {}, params.row.is_use === '1' ? '是' : '否')
                        }
                    },
                    {
                        title: "备注",
                        key: "note",
                        width: 320
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 240,
                        buttons: [
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
                    branch_id: this.$util.getBranch().id
                }
            },
        },
        mounted() {
        },
        methods: {
        }
    };
</script>