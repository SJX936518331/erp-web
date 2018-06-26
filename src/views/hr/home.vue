<template>
    <div class="">
        <Row>
            <Col class="admin-col" span="18">
                <Card class="admin-card">
                    <p slot="title">企业管理</p>
                    <div class="admin-list">
                        <div class="item">
                            <router-link class="link" to="/companies">
                                <i class="icon icon-bill"></i>
                                <div class="title">入职申请</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/branchs">
                                <i class="icon icon-bill"></i>
                                <div class="title">用工合同</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/departments">
                                <i class="icon icon-bill"></i>
                                <div class="title">薪金调整</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/users">
                                <i class="icon icon-bill"></i>
                                <div class="title">离职申请</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/users">
                                <i class="icon icon-bill"></i>
                                <div class="title">工作调动</div>
                            </router-link>
                        </div>
                    </div>
                </Card>
                <Card class="admin-card">
                    <p slot="title">基础资料</p>
                    <ul class="admin-list2">
                        <div class="item">
                            <router-link class="link" to="/users">
                                <i class="icon icon-customer"></i>
                                <div class="title">员工</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/departments">
                                <i class="icon icon-department"></i>
                                <div class="title">部门</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/positions">
                                <i class="icon icon-type"></i>
                                <div class="title">员工类型</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/branchs">
                                <i class="icon icon-company"></i>
                                <div class="title">分支机构</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/positions">
                                <i class="icon icon-wage"></i>
                                <div class="title">固定工资</div>
                            </router-link>
                        </div>
                    </ul>
                </Card>
            </Col>
            <Col class="admin-col" span="6">
                <Card class="admin-card">
                    <p slot="title">新增资料</p>
                    <ul class="admin-list3">
                        <li class="item">
                            <router-link class="link" to="/customer_type/add">XXX</router-link>
                        </li>
                    </ul>
                </Card>
                <Card class="admin-card">
                    <p slot="title">报表中心</p>
                    <ul class="admin-list3">
                        <li class="item">
                            <router-link class="link" to="/stocks">入职申请汇总表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">离职申请汇总表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">工作调动汇总表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">薪资调整汇总表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">用工合同管理表</router-link>
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
