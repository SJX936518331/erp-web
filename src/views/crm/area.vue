<template>
    <my-quick-table
            modelName="area"
            modelNameZh="地区"
            :addAble="false"
            :columns="columns" ref="table">
        <div slot="filter">
            <Button class="btn" @click="addCity" style="margin-right: 8px">添加市</Button>
            <Button class="btn" @click="exportData">导出数据</Button>
        </div>
    </my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        title: '编号',
                        key: 'code',
                        width: 160
                    },
                    {
                        title: '名称',
                        key: 'name',
                        width: 160
                    },
                    {
                        title: '市',
                        key: 'city_name',
                        width: 160
                    },
                    {
                        title: '省',
                        key: 'province_name',
                        width: 160
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
            addCity() {
                this.$router.push('/city/add')
            }
        },
    }
</script>
