<template>
    <div>
        <Button @click="getData">{{ text }}</Button>
        <Modal v-model="userModalVisible" :title="text" :width="800" okText="212"
               @on-ok="userModalOk"
               @on-cancel="userModalCancel">
            <div class="admin-tool-bar">
                <div class="tool-left">
                    <Input class="admin-search-input" v-model="keyword" :clearable="true" placeholder="姓名" style="width: 160px"></Input>
                    <Button @click="search">搜索</Button>
                    <span class="admin-label">分支机构：</span>
                    <Select class="admin-select" v-model="branch" @on-change="onBranchChange">
                        <Option value="">无</Option>
                        <Option v-for="item in branchs" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <span class="admin-label">部门：</span>
                    <Select class="admin-select" v-model="department" @on-change="onBranchChange">
                        <Option value="">无</Option>
                        <Option v-for="item in departments" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </div>
                <div class="tool-right">
                    <!--<my-user-selector @select="onUserSelect" />-->
                </div>
            </div>
            <Table :columns="userColumn" :data="users"></Table>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                keyword: '',
                branch: null,
                department: '',
                users: [],
                departments: [],
                branchs: [],
                userModalVisible: false,
                userColumn: [
                    {
                        title: "员工编号",
                        key: "code"
                    },
                    {
                        title: "姓名",
                        key: 'name'
                    },
                    {
                        title: '分支机构',
                        key: 'branch_name',
                        width: 120
                    },
                    {
                        title: "部门",
                        key: "department_name",
                        width: 120,
                    },
                    {
                        title: '职位',
                        key: 'position_name',
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
                default: '选择员工'
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
                let url = '/user/all?asd=asd'
                if (this.branch) {
                    url += '&branch_id=' + this.branch
                }
                if (this.department) {
                    url += '&department_id=' + this.department
                }
                if (this.keyword) {
                    url += '&keyword=' + this.keyword
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
            search() {
                this.getData()
//                this.$refs.selector.filter('keyword', this.keyword)
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
