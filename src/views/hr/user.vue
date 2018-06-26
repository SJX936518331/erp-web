<template>
    <my-quick-table
            modelName="user"
            modelNameZh="员工"
            :columns="columns"
            ref="quickTable">
        <div slot="filter">
            <Input class="admin-search-input" v-model="keyword" :clearable="true" placeholder="姓名" style="width: 160px"></Input>
            <Button @click="search">搜索</Button>
            <div></div>
            <span class="admin-label">分支机构：</span>
            <my-branch-select @select="onBranchChange" />

            <!--<span style="color:black;margin-left:20px;">部门：</span>-->
            <!--<Input style="width:200px;" v-model="searchDepartment" @on-change="init" placeholder="请输入你要查找的部门"></Input>-->
            <!--<Button style="margin:10px 20px;" type="primary" icon="search" @click="find">查找</Button>-->
        </div>
    </my-quick-table>
</template>

<script>
    export default {
        data() {
            return {
                keyword: '',
                columns: [
                    {
                        title: "员工编号",
                        key: "code",
                        width: 160
                    },
                    {
                        title: "姓名",
                        key: "name",
                        width: 160
                    },
                    {
                        title: "性别",
                        key: "sex",
                        width: 80,
                        render:(h, params)=>{
                            console.log('渲染', params)
                            return h('div', {style: {
                                height: '23px'
                            }}, params.row.sex === '1' ? '男' : '女')
                        }
                    },
                    {
                        title: "分支机构",
                        key: "branch_name",
                        width: 160
                    },
                    {
                        title: "部门",
                        key: "department_name",
                        width: 160
                    },
                    {
                        title: "职位",
                        key: "position_name",
                        width: 160
                    },
                    {
                        title: "手机号",
                        key: "phone",
                        width: 160
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 150,
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
                this.$refs.quickTable.filter('keyword', this.keyword)
            },
            onBranchChange(branch) {
                console.log('过滤', branch)
                this.$refs.quickTable.filter('branch_id', branch ? branch.id : '')
            },
//            search(data, argumentObj) {
//                let res = data;
//                let dataClone = data;
//                for (let argu in argumentObj) {
//                    if (argumentObj[argu].length > 0) {
//                        res = dataClone.filter(d => {
//                            return d[argu].indexOf(argumentObj[argu]) > -1;
//                        });
//                        dataClone = res;
//                    }
//                }
//                return res;
//            },
//            handleSearch1() {
//                this.initTable1 = this.data;
//                this.initTable1 = this.search(this.initTable1, {
//                    department: this.searchDepartment
//                });
//
//                this.searchArray = this.initTable1;
//            },
//            find() {
//                if (this.searchDepartment == "") {
//                    alert("请输入你要搜索的部门");
//                } else {
//                    this.handleSearch1();
//                }
//            }
        }
    };
</script>
