<template>
    <div class="">
        <Row>
            <Col class="admin-col" span="18">
                <Card class="admin-card">
                    <p slot="title">办公管理</p>
                    <div class="admin-list">
                        <div class="item">
                            <router-link class="link" to="/notices">
                                <i class="icon icon-notice"></i>
                                <div class="title">公告</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/work_logs">
                                <i class="icon icon-work_log"></i>
                                <div class="title">日志</div>
                            </router-link>
                        </div>
                        <div class="item">
                            <router-link class="link" to="/applies">
                                <i class="icon icon-apply"></i>
                                <div class="title">申请</div>
                            </router-link>
                        </div>
                    </div>
                </Card>
                <Card class="admin-card">
                    <p slot="title">基础资料</p>
                    <ul class="admin-list2">
                        <div class="item">
                            <router-link class="link" to="/apply_types">
                                <i class="icon icon-type"></i>
                                <div class="title">申请类型</div>
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
                            <router-link class="link" to="/apply_type/add">添加申请类型</router-link>
                        </li>
                    </ul>
                </Card>
                <Card class="admin-card">
                    <p slot="title">报表中心</p>
                    <ul class="admin-list3">
                        <li class="item">
                            <router-link class="link" to="/stocks">XXX</router-link>
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
