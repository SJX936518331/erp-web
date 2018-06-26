<template>
    <div class="">
        <Row>
            <Col class="admin-col" span="18">
                <Card class="admin-card">
                    <p slot="title">售后管理</p>
                    <div class="admin-list">
                        <div class="item">
                            <router-link class="link" to="/service_feedbacks">
                                <i class="icon icon-bill"></i>
                                <div class="title">服务反馈单</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/repairs">
                                <i class="icon icon-bill"></i>
                                <div class="title">维修派工单</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/repair_checks">
                                <i class="icon icon-bill"></i>
                                <div class="title">维修验收</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/repair_deliveries">
                                <i class="icon icon-bill"></i>
                                <div class="title">维修发货单</div>
                            </router-link>
                        </div>
                    </div>
                </Card>
                <Card class="admin-card">
                    <p slot="title">基础资料</p>
                    <ul class="admin-list2">
                        <li class="item">
                            <router-link class="link" to="/customers">
                                <i class="icon icon-customer"></i>
                                <div class="title">客户资料</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/products">
                                <i class="icon icon-product"></i>
                                <div class="title">产品资料</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/service_types">
                                <i class="icon icon-type"></i>
                                <div class="title">服务类型</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/repair_types">
                                <i class="icon icon-type"></i>
                                <div class="title">维修类型</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/finance/pay_types">
                                <i class="icon icon-bill_search"></i>
                                <div class="title">业务查找</div>
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
                            <router-link class="link" to="/customer/add">XXX</router-link>
                        </li>
                    </ul>
                </Card>
                <Card class="admin-card">
                    <p slot="title">报表中心</p>
                    <ul class="admin-list3">
                        <li class="item">
                            <router-link class="link" to="/stocks">服务反馈汇总表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">服务反馈明细表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">维修派工汇总表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">维修派工单明细表</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">维修派工用料分析</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">维修领料汇总表</router-link>
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
