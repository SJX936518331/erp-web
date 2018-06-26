<template>
    <my-quick-table
            modelName="product"
            modelNameZh="产品"
            :columns="columns"></my-quick-table>

    <!--<div class="admin-page-container">-->
        <!--<div class="admin-tool-bar">-->
            <!--<div class="tool-left">-->
            <!--</div>-->
            <!--<div class="tool-right">-->
                <!--<Button class="btn" @click="add">添加产品</Button>-->
            <!--</div>-->
        <!--</div>-->

        <!--<Table :columns="columns" :data="data" ref="table"></Table>-->

        <!--<my-pagination page="pagination" />-->

        <!--<my-footer />-->
    <!--</div>-->

</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: "产品编号",
                        key: "code",
                        width: 160
                    },
                    {
                        title: "产品名称",
                        key: "name",
                        width: 160
                    },
                    {
                        title: "单位",
                        key: "unit",
                        width: 80
                    },
                    {
                        title: "价格",
                        key: "price",
                        width: 160
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
        mounted() {
            this.getData()
        },
        methods: {
        }
    }
</script>
