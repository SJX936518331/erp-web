<style lang="less">
    @import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="工号">
                            <span slot="prepend">
                                <Icon :size="16" type="person"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="密码">
                            <span slot="prepend">
                                <Icon :size="14" type="locked"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <!--<FormItem label="权限" prop="access">-->
                        <!--<Select v-model="form.access" placeholder="请选择你的用户类型">-->
                        <!--<Option value="普通用户">普通用户</Option>-->
                        <!--<Option value="超级管理员">超级管理员</Option>-->
                        <!--</Select>-->
                        <!--</FormItem>-->
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>

                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import Cookies from "js-cookie";
    export default {
        data() {
            return {
                form: {
                    userName: "001",
                    password: "123456",
                    access: "普通用户"
                },
                rules: {
                    userName: [
                        {required: true, message: "账号不能为空", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: "blur"}
                    ],
                    access: [
                        {
                            required: true,
                            message: "请选择你的用户类型",
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        methods: {
            handleSubmit() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        let url = `/login/login`
                        this.$http.post(url, {
                            account: this.form.userName,
                            password: this.form.password
                        }).then(
                            response => {
                                this.$Message.success('登录成功')
                                console.log('登录成功', response.data.data)
                                this.$storage.set('accessToken', response.data.data.access_token)
                                console.log('token', this.$storage.get('accessToken'))
                                // 获取用户信息
                                this.$http.get(`/login/user_info`).then(
                                    response => {
                                        let data = response.data.data
                                        this.$store.commit('user', data.user)
                                        this.$store.commit('department', data.department)
                                        this.$store.commit('branch', data.branch)
                                        this.$store.commit('accountSet', data.account_set)

                                        this.$storage.set('user', data.user)
                                        this.$storage.set('department', data.department)
                                        this.$storage.set('branch', data.branch)
                                        this.$storage.set('accountSet', data.account_set)

                                        console.log(data)
                                        Cookies.set("user", this.form.userName);
                                        Cookies.set("password", this.form.password);
                                        Cookies.set("type", this.form.access);

                                        this.$store.commit(
                                            "setAvator",
                                            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
                                        );
                                        if (this.form.access === "超级管理员") {
                                            Cookies.set("access", 0);
                                        } else {
                                            Cookies.set("access", 1);
                                        }
                                        this.$router.push({
                                            name: "home_index"
                                        });
                                        //                                this.$router.push('/packages/' + response.data.data + '/edit')
                                    },
                                    response => {
                                        console.log(response)
                                    }
                                )
                            },
                            response => {
                                this.$Message.error('系统出错')
                            }
                        )
                    }
                });
            }
        }
    };
</script>

<style>

</style>
