<template>
    <my-quick-table
            modelName="customer"
            modelNameZh="客户"
            :columns="columns"
            ref="table">
        <div slot="filter">
            <Input class="admin-search-input" v-model="keyword" :clearable="true" placeholder="姓名、电话" style="width: 160px"></Input>
            <Button @click="search">搜索</Button>
            <span>客户类型：{{ typeName }}</span>
            <my-customer-type-selector @select="onCustomerTypeChange" />
        </div>
    </my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                typeName: '',
                keyword: '',
                columns: [
                    {
                        title: '编号',
                        key: 'code',
                        width: 160
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        width: 160
                    },
                    {
                        title: '客户类型',
                        key: 'type_name',
                        width: 160
                    },
                    {
                        title: '手机号',
                        key: 'phone',
                        width: 160
                    },
                    {
                        title: "地址",
                        key: "address",
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
            search() {
                this.$refs.table.filter('keyword', this.keyword)
            },
            onCustomerTypeChange(type) {
                this.typeName = type.name
                this.$refs.table.filter('type_id', type.id)
            }
        },
    }
</script>

<style scoped>
    .admin-search-input {
        margin-right: 8px;
        width: 160px;
    }
</style>
