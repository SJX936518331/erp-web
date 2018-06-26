<template>
    <div>
        <Card class="admin-card">
            <Form ref="form" :model="curObject" :label-width="100" label-position="right" :rules="validate">
                <FormItem label="产品编号" prop="code">
                    <Input class="form-common-width" v-model="curObject.code" placeholder=""></Input>
                </FormItem>
                <FormItem label="产品名称" prop="name">
                    <Input class="form-common-width" v-model="curObject.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="条码" prop="barcode">
                    <Input class="form-common-width" v-model="curObject.barcode" placeholder=""></Input>
                </FormItem>
                <FormItem label="单位" prop="unit">
                    <Input class="form-common-width" v-model="curObject.unit" placeholder=""></Input>
                    <my-unit-selector @select="onUnitSelect" />
                </FormItem>
                <FormItem label="价格" prop="price">
                    <Input class="form-common-width" v-model="curObject.price" placeholder=""></Input>
                </FormItem>
                <FormItem label="类型" prop="type">
                    <Select class="form-common-width" v-model="curObject.type" placeholder="">
                        <Option value="1">成品</Option>
                        <Option value="2">半成品/原材料</Option>
                    </Select>
                </FormItem>
                <FormItem label="产品分类" prop="category_id">
                    {{ curObject.category_name }}
                    <my-product-category-selector @select="onProductCategorySelect" />
                    <!--<Select v-model="curObject.category_id" placeholder="">-->
                        <!--<Option :value="category.id" v-for="category in categories" :key="category.id">{{ category.name }}</Option>-->
                    <!--</Select>-->
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="save">保存</Button>
                    <Button type="ghost" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Card>
        <Card class="admin-card" v-if="curObjectId">
            <div class="admin-card-title" slot="title">
                属性管理
                <!--温馨提示：请谨慎操作属性-->
            </div>
            <CheckboxGroup v-model="selectedAttributes">
                <table class="ivu-table ivu-table-stripe">
                    <tr>
                        <th width="100">属性名</th>
                        <th>属性值</th>
                    </tr>
                    <tr v-for="attribute in attributes">
                        <td>{{ attribute.name }}</td>
                        <td>
                            <ul class="value-list">
                                <li class="value-item" v-for="value in attribute.values">
                                    <Checkbox :label="value.id"
                                              @click.native="myChange(attribute.id, value.id)"
                                              on-change="handleChange">{{ value.value }}
                                        <!--{{ value.id }}-->
                                    </Checkbox>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </CheckboxGroup>
        </Card>
        <Card class="admin-card" v-if="curObjectId">
            <div class="admin-card-title" slot="title">
                SKU 管理
            </div>
            <div class="admin-tool-bar">
                <div class="tool-left">
                </div>
                <div class="tool-right">
                    <Button @click="saveSku">保存 SKU</Button>
                </div>
            </div>
            <my-table v-model="skus" :columns-list="skuColumns" :editIncell="true" ref="table"></my-table>
        </Card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                curObjectId: null,
                curObject: {
                    unit: '',
                    category_id: '',
                    category_name: ''
                },
                validate: {
                    code: [
                        {
                            required: true,
                            message: "商品编号不能为空",
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: "商品名称不能为空",
                        }
                    ],
                    number: [
                        {
                            required: true,
                            message: "商品数量不能为空",
                        }
                    ],
                    danwei: [
                        {
                            required: true,
                            message: "单位不能为空",
                            trigger: "blur"
                        }
                    ]
                },
                categories: [],
                attributes: [],
                selectedAttributes: [],
                skuColumns: [
                    {
                        title: '单价',
                        key: 'price',
                        editable: true
                    },
                    {
                        title: '预警下限',
                        key: 'down_number',
                        editable: true
                    },
                    {
                        title: '预警上限',
                        key: 'top_number',
                        editable: true
                    }
                ],
                skus: []
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
                // 查询产品详情
                this.$http.get('/product/detail?id=' + this.curObjectId).then(
                    response => {
                        let data = response.data
                        this.curObject = data.data
                        console.log(this.curObject)
                    },
                    response => {
                        console.log(response)
                    }
                )
                // 查询所有分类
                this.$http.get('/product_category/all').then(
                    response => {
                        let data = response.data
                        this.categories = data.data
                    },
                    response => {
                        console.log(response)
                    }
                )
                // 查询 SKU
                this.$http.get('/sku/all?product_id=' + this.curObjectId).then(
                    response => {
                        let data = response.data
                        this.skus2 = data.data
                        console.log('查到SKU啦', this.skus2)
                        this.getAttribute()
                    },
                    response => {
                        console.log(response)
                    }
                )

            },
            getAttribute() {
                // 获取分类属性
                this.$http.get('/attribute/all?category_id=' + this.curObject.category_id).then(
                    response => {
                        let data = response.data
                        this.attributes = data.data
                        console.log('属性啊啊啊', this.attributes)
//                        this.skuColumns = []
                        this.skuColumns = [this.skuColumns[0], this.skuColumns[1], this.skuColumns[2]]
                        this.skuColumns.push({
                            title: 'ID',
                            key: 'id'
                        })
                        for (let attr of this.attributes) {
                            console.log('添加属性', attr.name, attr.id)
                            this.skuColumns.push({
                                title: attr.name,
                                key: attr.id
                            })
                        }
                        this.skuColumns.push({
                            title: '属性',
                            key: 'attributes'
                        })
                        this.skuColumns.push({
                            title: '规格',
                            key: 'spec'
                        })
//                        this.skuColumns.push({
//                            title: '单价',
//                            key: 'price',
//                            editable: true
//                        })
                        this.skuColumns.push({
                            title: '图片',
                            key: 'image'
                        })
                    },
                    response => {
                        console.log(response)
                    }
                )
                // 获取产品属性
                this.$http.get('/product/attribute?product_id=' + this.curObjectId).then(
                    response => {
                        let data = response.data
                        this.productAttributeValue = data.data
                        this.selectedAttributes = []
                        for (let item of data.data) {
                            this.selectedAttributes.push(item.value_id)
                        }
                        console.log('属性222', data.data)
                        // 计算所有 SKU
//                        let groups =
                        function getById(attrs, id) {
                            for (let g of attrs) {
                                if (g.id === id) {
                                    return g
                                }
                            }
                            return null
                        }

                        function group(list) {
                            let attrs = []
                            for (let item of list) {
                                console.log(attrs)
                                let attr = getById(attrs, item.attribute_id)
                                console.log(attr)
                                if (attr) {
                                    console.log(attrs)
                                    attr.values.push({
                                        id: item.value_id,
                                        value: item.attribute_value
                                    })
                                } else {
                                    attrs.push({
                                        id: item.attribute_id,
                                        values: [
                                            {
                                                id: item.value_id,
                                                value: item.attribute_value
                                            }
                                        ]
                                    })
                                }
                            }

                            return attrs
                        }
                        let attrs = group(data.data)
                        console.log('分组')
                        console.log(attrs)
                        function getSkus(attrs) {
                            let counterIndex = attrs.length - 1
                            let counter = [0, 0, 0]

                            let total = 1
                            for (let item of attrs) {
                                total *= item.values.length
                            }

                            let count = 0
                            let result = []
                            for (let i = 0; i < total; i++) {
                                let obj = {
//                                    id: '' + new Date().getTime(),
                                    price: 0.00,
                                    number: 0.00
                                }
                                let attributes = []
                                let specs = []
                                for (let idx = 0; idx < attrs.length; idx++) {
                                    let attr = attrs[idx]
                                    console.log('呵呵', attr)
                                    obj[attr.id] = attr.values[[counter[idx]]].value
                                    console.log(attr.values[[counter[idx]]])
                                    console.log(' ')
                                    attributes.push(attr.values[[counter[idx]]].id)
                                    specs.push(attr.values[[counter[idx]]].value)
                                }
                                obj.attributes = attributes.sort().join(',')
                                obj.spec = specs.sort().join(',')
                                result.push(obj)
                                console.log('\n')
                                count++
                                handle();
                            }
                            console.log('数量' + count)

                            function handle() {
                                counter[counterIndex]++;
                                if (counter[counterIndex] >= attrs[counterIndex].values.length) {
                                    counter[counterIndex] = 0;
                                    counterIndex--;
                                    if (counterIndex >= 0) {
                                        handle();
                                    }
                                    counterIndex = attrs.length - 1;
                                }
                            }

                            return result
                        }
                        this.skus = getSkus(attrs)
                        console.log('计算结果')
                        console.log(this.skus)

                        console.log('合并结果')
                        let _this = this
                        function getByAttributes(attributes) {
                            for (let sku2 of _this.skus2) {
                                if (sku2.attributes === attributes) {
                                    return sku2
                                }
                            }
                            return null
                        }
                        for (let sku of this.skus) {
                            let sku2 = getByAttributes(sku.attributes)
                            if (sku2) {
                                sku.price = sku2.price
                                sku.down_number = sku2.down_number
                                sku.top_number = sku2.top_number
                                sku.id = sku2.id
                            }
                        }

                    },
                    response => {
                        console.log(response)
                    }
                )
            },
            handleChange(asd) {
                console.log(asd)
            },
            onProductCategorySelect(category) {
                this.curObject.category_id = category.id
                this.curObject.category_name = category.name
            },
            myChange(attributeId, id) {
                if (this.selectedAttributes.includes(id)) {
                    console.log('取消', id)
                    this.removeValue(id)
                } else {
                    console.log('添加', id)
                    this.addValue(attributeId, id)
                }
            },
            saveAttribute() {
            },
            save() {
                this.$refs['form'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('请完善表单')
                        return
                    }
                    let url = this.curObjectId ? '/product/update' : '/product/add'
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
            saveSku() {
                this.$refs['form'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('请完善表单')
                        return
                    }
                    this.$http.post('/sku/update_all', {
                        product_id: this.curObjectId,
                        skus: this.skus
                    }).then(
                        response => {
                            this.$Message.success('保存成功')
                            this.getData()
                        },
                        response => {
                            this.$Message.error('系统出错')
                        }
                    )
                })
            },
            addValue(attributeId, id) {
                this.$http.post('/product/attribute_add', {
                    product_id: this.curObjectId,
                    attribute_id: attributeId,
                    attribute_value_id: id
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
                let removeId
                console.log('查询', id, this.productAttributeValue)
                for (let item of this.productAttributeValue) {
                    if (item.value_id === id) {
                        removeId = item.id
                        break
                    }
                }
                this.$http.post('/product/attribute_remove?id=' + removeId).then(
                    response => {
                        this.$Message.success('取消成功')
                        this.getData()
                    },
                    response => {
                        this.$Message.error('系统出错')
                    }
                )
            },
            selectUser() {
                this.userModalVisible = true
                this.$http.get('/user/all').then(
                    response => {
                        let data = response.data
                        this.users = data.data
                        console.log(this.users)
                    },
                    response => {
                        console.log(response);
                    }
                )
            },
            selectUserItem(user) {
                console.log('选择了', user)
                this.store.manager_id = user.id
                this.store.manager_name = user.name
            },
            userModalOk() {
                if (
                    this.editForm.name == "" ||
                    this.editForm.beizhu == "" ||
                    this.editForm.id == "" ||
                    this.editForm.people == ""
                ) {
                    this.$Message.info("请把信息填完整");
                } else {
                    this.data1.push({
                        index: this.data1.length + 1,
                        name: this.editForm.name,
                        beizhu: this.editForm.beizhu,
                        id: this.editForm.id,
                        people: this.editForm.people
                    });
                    this.$Message.info("添加部门成功");
                    this.editForm.name = "";
                    this.editForm.beizhu = "";
                    this.editForm.id = "";
                    this.editForm.people = "";
                }
            },
            userModalCancel() {
            },
            onUnitSelect(unit) {
                this.curObject.unit = unit.name
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
        /*padding-left: 16px;*/
        .value-item {
            float: left;
            min-width: 80px;
            margin-right: 16px;
        }
    }
</style>