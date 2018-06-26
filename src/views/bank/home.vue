<template>
    <div class="">
        <Row>
            <Col class="admin-col" span="18">
                <Card class="admin-card">
                    <p slot="title">现金银行</p>
                    <div class="admin-list">
                        <div class="item">
                            <router-link class="link" to="/bank_io/add">
                                <i class="icon icon-bill"></i>
                                <div class="title">银行存取款</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/balance_out/add">
                                <i class="icon icon-bill"></i>
                                <div class="title">费用开支</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/balance_in/add">
                                <i class="icon icon-bill"></i>
                                <div class="title">其他收入</div>
                            </router-link>
                        </div>
                    </div>
                </Card>
                <Card class="admin-card">
                    <p slot="title">基础资料</p>
                    <ul class="admin-list2">
                        <li class="item">
                            <router-link class="link" to="/balance_io_types">
                                <i class="icon icon-type"></i>
                                <div class="title">收支类型</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/pay_types">
                                <i class="icon icon-type"></i>
                                <div class="title">结算方式</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/banks">
                                <i class="icon icon-bank"></i>
                                <div class="title">银行资料</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/currencies">
                                <i class="icon icon-money"></i>
                                <div class="title">币种资料</div>
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
                            <router-link class="link" to="/bank/add">添加现金银行</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/balance_io_type/add">添加收支类型</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/pay_type/add">添加结算方式</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/currency/add">添加币种</router-link>
                        </li>
                    </ul>
                </Card>
                <Card class="admin-card">
                    <p slot="title">报表中心</p>
                    <ul class="admin-list3">
                        <li class="item">
                            <router-link class="link" to="/bank_ios">银行存取款汇总表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/bank_ios">银行存取款明细表？</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/balance_outs">费用支出汇总表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/balance_outs/type">费用支出汇总表-按类型</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/balance_outs/department">费用支出综合报表-按部门</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/balance_outs/department_total">费用支出汇总表-按部门</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/balance_outs/department_detail">费用支出明细表-按部门</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/balance_ins">收入汇总表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/balance_ins/type">收入汇总表-按类型</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/balance_ins/department">收入汇总表-按部门</router-link>
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
