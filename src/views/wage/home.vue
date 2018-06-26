<template>
    <div>
        <Row>
            <Col class="admin-col" span="18">
            <Card class="admin-card">
                <p slot="title">工资管理</p>
                <ul class="admin-list">
                    <li class="item">
                        <router-link class="link" to="/piecework_wage/add">
                            <i class="icon icon-bill"></i>
                            <div class="title">计件工资录入</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/wage/add">
                            <i class="icon icon-bill"></i>
                            <div class="title">工资数据录入</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/shop/products">
                            <i class="icon icon-bill"></i>
                            <div class="title">工资费用分配</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/finance/pay_types">
                            <i class="icon icon-bill"></i>
                            <div class="title">三费计提</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/finance/pay_types">
                            <i class="icon icon-bill"></i>
                            <div class="title">工资支付</div>
                        </router-link>
                    </li>
                </ul>
            </Card>
            <Card class="admin-card">
                <p slot="title">基础资料</p>
                <ul class="admin-list2">
                    <li class="item">
                        <router-link class="link" to="/users">
                            <i class="icon icon-customer"></i>
                            <div class="title">员工资料</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/work_types">
                            <i class="icon icon-type"></i>
                            <div class="title">计件工种</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/work_processes">
                            <i class="icon icon-bill"></i>
                            <div class="title">计件工序</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/wage_types">
                            <i class="icon icon-type"></i>
                            <div class="title">工资项目</div>
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/pay_types">
                            <i class="icon icon-type"></i>
                            <div class="title">项目类别</div>
                        </router-link>
                    </li>
                </ul>
            </Card>
            </Col>
            <Col class="admin-col" span="6">
            <Card class="admin-card">
                <p slot="title">新增资料</p>
                <ul class="admin-list3">
                    <li class="item">
                        <router-link class="link" to="/wage_type/add">添加工资项目</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/store/add">添加项目类别</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/work_type/add">添加计件工种</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/work_process/add">添加计件工序</router-link>
                    </li>
                </ul>
            </Card>
            <Card class="admin-card">
                <p slot="title">报表中心</p>
                <ul class="admin-list3">
                    <li class="item">
                        <router-link class="link" to="/piecework_wages">计件工资汇总表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/wages">计件工资明细表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/wages">工资汇总表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/wages">工资明细表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/wages">工资结构分析表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/wages">工资分期分析表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/wages">个人所得税明细表</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" to="/wages">工资扣零表</router-link>
                    </li>
                </ul>
            </Card>
            </Col>
        </Row>

        <my-footer/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
            },
        }
    };
</script>
