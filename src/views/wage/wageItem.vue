<template>
    <my-quick-table
            modelName="wage_item"
            modelNameZh="工资单"
            :addAble="false"
            :columns="columns">
        <div slot="filter">
            <span class="admin-label">部门：</span>
            <my-department-selector @select="onDepartmentChange" />

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
                columns: [
                    {
                        title: '工号',
                        key: 'code'
                    },
                    {
                        title: '员工姓名',
                        key: 'user_name'
                    },
                    {
                        title: '部门',
                        key: 'department_name'
                    },
                    {
                        title: '基本工资',
                        key: 'basic_wage'
                    },
                    {
                        title: '奖金',
                        key: 'bonus'
                    },
                    {
                        title: '补贴',
                        key: 'subsidy'
                    },
                    {
                        title: '计件工资',
                        key: 'commission'
                    },
                    {
                        title: '应发合计',
                        key: 'basic_wage'
                    },
                    {
                        title: '个人所得税',
                        key: 'tax'
                    },
                    {
                        title: '罚金',
                        key: 'fine'
                    },
                    {
                        title: '应扣合计',
                        key: 'fine'
                    },
                    {
                        title: '实发合计',
                        key: 'total'
                    },
                    {
                        title: "操作",
                        key: "action",
                        width: 200,
                        buttons: [
                        ]
                    }
                ],
            };
        },
        mounted() {
        },
        methods: {
            onDepartmentChange(branch) {
                this.$refs.quickTable.filter('department_id', branch ? branch.id : '')
            },
        },
    };
</script>
