<template>
    <my-quick-table
            modelName="bank"
            modelNameZh="现金银行"
            :filters="filters"
            :addUrl="addUrl"
            :columns="columns"
            ref="table">
        <div slot="filter">
            <Button-group>
                <i-button :type="type === 1 ? 'primary' : 'default'" @click="setType(1)">现金</i-button>
                <i-button :type="type === 2 ? 'primary' : 'default'" @click="setType(2)">银行存款</i-button>
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
                        title: '类型',
                        key: 'type',
                        width: 160,
                        render: (h, params) => {
                            return h('div', params.row.type === '1' ? '现金' : '银行')
                        },
                        editable: true
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
                    account_set_id: this.$util.getAccountSet().id,
                    type: this.type
                }
            },
            addUrl() {
                return '/bank/add?type=' + this.type
            }
        },
        mounted() {
            console.log('奇怪了' + this.$util.getAccountSet().id)
        },
        methods: {
            setType(type) {
                this.type = type
                this.$refs.table.filter('type', this.type)
            }
        },
    };
</script>
