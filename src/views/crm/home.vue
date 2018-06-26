<template>
    <div class="">
        <Row>
            <Col class="admin-col" span="18">
                <Card class="admin-card">
                    <p slot="title">客户管理</p>
                    <div class="admin-list">
                        <div class="item">
                            <router-link class="link" to="/customers">
                                <i class="icon icon-bill"></i>
                                <div class="title">客户管理</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/customer_types">
                                <i class="icon icon-bill"></i>
                                <div class="title">联系人管理</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/customer_visits">
                                <i class="icon icon-bill"></i>
                                <div class="title">机会管理</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/visit_types">
                                <i class="icon icon-bill"></i>
                                <div class="title">行动管理</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/visit_types">
                                <i class="icon icon-bill"></i>
                                <div class="title">服务反馈</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/visit_types">
                                <i class="icon icon-bill"></i>
                                <div class="title">费用管理</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/products">
                                <i class="icon icon-bill"></i>
                                <div class="title">产品管理</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/products">
                                <i class="icon icon-bill"></i>
                                <div class="title">销售管理</div>
                            </router-link>
                        </div>
                    </div>
                </Card>
                <Card class="admin-card">
                    <p slot="title">基础资料</p>
                    <ul class="admin-list2">
                        <li class="item">
                            <router-link class="link" to="/customer_types">
                                <i class="icon icon-type"></i>
                                <div class="title">客户类型</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/industries">
                                <i class="icon icon-type"></i>
                                <div class="title">行业类型</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/products">
                                <i class="icon icon-type"></i>
                                <div class="title">服务类型</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/visit_types">
                                <i class="icon icon-type"></i>
                                <div class="title">回访类型</div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/storage_io_types">
                                <i class="icon icon-bill"></i>
                                <div class="title">我的工作</div>
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
                            <router-link class="link" to="/customer_type/add">添加客户类型</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/industry/add">添加行业</router-link>
                        </li>
                    </ul>
                </Card>
                <Card class="admin-card">
                    <p slot="title">报表中心</p>
                    <ul class="admin-list3">
                        <li class="item">
                            <router-link class="link" to="/stocks">客户结构分析</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">机会状态分析</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">机会费用分析</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">机会状态分析</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">服务反馈分析</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">客户销售分析</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">滞销产品分析</router-link>
                        </li>
                        <li class="item">
                            <router-link class="link" to="/stocks">畅销产品分析</router-link>
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
