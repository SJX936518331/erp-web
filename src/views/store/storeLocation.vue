<template>
    <my-quick-table
            modelName="store_location"
            modelNameZh="货位"
            :columns="columns" ref="table">
        <div slot="filter">
            <span class="admin-label">仓库：</span>
            <my-store-selector @select="onBranchSelect" type="select" />
        </div>
    </my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                data: [],
                columns: [
                    {
                        title: "编号",
                        key: "code",
                        width: 160
                    },
                    {
                        title: "名称",
                        key: "name",
                        width: 160
                    },
                    {
                        title: "仓库",
                        key: "store_name",
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
                store: ''
            }
        },
        mounted() {
        },
        methods: {
            onBranchSelect(store) {
                this.store = store
                this.$refs.table.filter('store_id', this.store ? store.id : '')
            },
        },
    }
</script>
