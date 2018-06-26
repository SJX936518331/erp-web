<template>
    <div>
        <Button @click="getData">{{ text }}</Button>
        <Modal v-model="userModalVisible" :title="text" :width="800" okText="212"
               @on-ok="userModalOk"
               @on-cancel="userModalCancel">
            <div class="admin-tool-bar">
                <!--<div class="tool-left">-->
                    <!--<span class="admin-label">分支机构：</span>-->
                    <!--<Select class="admin-select" v-model="branch" @on-change="onBranchChange">-->
                        <!--<Option value="">无</Option>-->
                        <!--<Option v-for="item in branchs" :value="item.id" :key="item.id">{{ item.name }}</Option>-->
                    <!--</Select>-->
                    <!--<span class="admin-label">部门：</span>-->
                    <!--<Select class="admin-select" v-model="branch" @on-change="onBranchChange">-->
                        <!--<Option value="">无</Option>-->
                        <!--<Option v-for="item in departments" :value="item.id" :key="item.id">{{ item.name }}</Option>-->
                    <!--</Select>-->
                <!--</div>-->
                <div class="tool-right">
                    <!--<my-user-selector @select="onUserSelect" />-->
                </div>
            </div>
            <Table :columns="columns" :data="users"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                branch: null,
                users: [],
                departments: [],
                branchs: [],
                userModalVisible: false,
                columns: [
                    {
                        title: "分类名称",
                        key: 'name'
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 240,
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.selectUserItem(this.users[params.index])
                                            }
                                        }
                                    },
                                    "选择"
                                )
                            ]);
                        }
                    }
                ],
            }
        },
        props: {
            text: {
                type: String,
                default: '选择产品类别'
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.$http.get('/branch/all').then(
                    response => {
                        let data = response.data
                        this.branchs = data.data
                        console.log(this.branchs)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            getDepartment() {
                this.$http.get('/department/all').then(
                    response => {
                        let data = response.data
                        this.departments = data.data
                        console.log(this.departments)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            getData() {
                this.userModalVisible = true
                let url = '/product_category/all'
                if (this.branch) {
                    url += '?branch_id=' + this.branch
                }
                this.$http.get(url).then(
                    response => {
                        let data = response.data
                        this.users = data.data
                        console.log(this.users)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            selectUserItem(user) {
                console.log('选择了', user)
                this.userModalVisible = false
                this.$emit('select', user)
            },
            onBranchChange() {
                this.getData()
                this.getDepartment()
            },
            userModalOk() {
            },
            userModalCancel() {
            }
        }
    }
</script>

<style scoped>
</style>
