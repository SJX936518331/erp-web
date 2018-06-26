<template>
    <div>
        <Card class="admin-card" v-if="curObject">
            <Form ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="分类名称" prop="name">
                    <Input class="form-common-width" v-model="curObject.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="描述" prop="description">
                    <Input class="form-common-width" v-model="curObject.description" placeholder=""></Input>
                </FormItem>
                <FormItem label="备注" prop="note">
                    <Input class="form-common-width" v-model="curObject.note" type="textarea" placeholder=""></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="save">保存</Button>
                    <Button type="ghost" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Card>
        <Card class="admin-card" v-if="curObjectId">
            <div class="admin-card-title" slot="title">
                产品分类属性
            </div>
            <ul class="attribute-list">
                <li class="attribute-item" v-for="attribute in attributes">
                    {{ attribute.name }}
                    <a href="#" @click="removeAttribute(attribute.id)">删除</a>
                    <ul class="value-list">
                        <li class="value-item" v-for="value in attribute.values">
                            {{ value.value }}
                            <a href="#" @click="removeValue(value.id)">删除</a>
                        </li>
                        <input v-model="values[attribute.id]">
                        <button @click="addAttributeValue(attribute.id)">添加属性值</button>
                    </ul>
                </li>
            </ul>
            <!--<Table :columns="attributeColumn" :data="attributes" ref="table" :height="500"></Table>-->

            <input v-model="attributeName">
            <button @click="addAttribute">添加属性</button>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                curObjectId: null,
                modelName: 'product_category',
                curObject: {},
                validate: {
                    code: [
                        {
                            required: true,
                            message: "套餐编号不能为空",
                            trigger: "code"
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: "套餐名称不能为空",
                            trigger: "name"
                        }
                    ]
                },
                attributeColumn: [
                    {
                        title: '属性名称',
                        key: 'branch_name'
                    },
                    {
                        title: '属性值',
                        key: 'posititon'
                    },
                ],
                attributes: [],
                //
                attributeName: '',
                values: {}
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                this.curObjectId = this.$route.params.id
                if (!this.curObjectId) {
                    return
                }
                this.$http.get(`/${this.modelName}/detail?id=` + this.curObjectId).then(
                    response => {
                        let data = response.data
                        this.curObject = data.data
                        console.log(this.curObject)
                    },
                    response => {
                        console.log(response)
                    }
                )
                // 获取分类属性
                this.$http.get('/attribute/all?category_id=' + this.curObjectId).then(
                    response => {
                        let data = response.data
                        this.attributes = data.data
                        console.log('属性啊啊啊', this.attributes)
                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            save() {
                this.$refs['form'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('请完善表单')
                        return
                    }
                    let url = this.curObjectId ? `/${this.modelName}/update` : `/${this.modelName}/add`
                    this.$http.post(url, this.curObject).then(
                        response => {
                            this.$Message.success('保存成功')
                        },
                        response => {
                            this.$Message.error('系统出错')
                        }
                    )
                })
            },
            addAttribute() {
                if (!this.attributeName) {
                    // TODO
                    return
                }
                this.$http.post('/attribute/add', {
                    name: this.attributeName,
                    product_category_id: this.curObjectId
                }).then(
                    response => {
                        this.$Message.success('添加成功')
                        this.getData()
                    },
                    response => {
                        this.$Message.error('系统出错')
                    }
                )
            },
            removeAttribute(id) {
                this.$http.post('/attribute/remove?id=' + id).then(
                    response => {
                        this.$Message.success('删除成功')
                        this.getData()
                    },
                    response => {
                        this.$Message.error('系统出错')
                    }
                )
            },
            addAttributeValue(attributeId) {
                this.$http.post('/attribute_value/add', {
                    attribute_id: attributeId,
                    value: this.values[attributeId]
                }).then(
                    response => {
                        this.$Message.success('添加成功')
                        this.getData()
                    },
                    response => {
                        this.$Message.error('系统出错')
                    }
                )
            },
            removeValue(id) {
                this.$http.post('/attribute_value/remove?id=' + id).then(
                    response => {
                        this.$Message.success('删除成功')
                        this.getData()
                    },
                    response => {
                        this.$Message.error('系统出错')
                    }
                )
            }
        }
    }
</script>

<style lang="less">
    .attribute-list {
        .attribute-item {

        }
    }
    .value-list {
        padding-left: 32px;
        .value-item {

        }
    }
</style>