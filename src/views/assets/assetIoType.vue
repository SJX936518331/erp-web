<template>
    <my-quick-table
            modelName="asset_io_type"
            modelNameZh="固定资产增减方式"
            :filters="filters"
            :addUrl="addUrl"
            :columns="columns" ref="table">
        <div slot="filter">
            <Button-group>
                <i-button :type="type === 1 ? 'primary' : 'default'" @click="setType(1)">增加方式</i-button>
                <i-button :type="type === 2 ? 'primary' : 'default'" @click="setType(2)">减少方式</i-button>
            </Button-group>
        </div>
    </my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                type: 1,
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
                            return h('div', {}, params.row.type === '1' ? '资产增加' : '资产减少')
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
        computed: {
            filters() {
                return {
                    type: this.type,
                    account_set_id: this.$util.getAccountSet().id,
                }
            },
            addUrl() {
                return '/asset_io_type/add?type=' + this.type
            }
        },
        mounted() {
        },
        methods: {
            setType(type) {
                this.type = type
                this.$refs.table.filter('type', this.type)
            }
        },
    };
</script>
