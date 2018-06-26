<template>
    <my-quick-selector
            modelName="customer"
            modelNameZh="客户"
            :columns="columns" ref="selector" @select="onItemSelect">
        <div slot="filter">
            <Input class="admin-search-input" v-model="keyword" :clearable="true" placeholder="姓名、电话" style="width: 160px"></Input>
            <Button @click="search">搜索</Button>
        </div>
    </my-quick-selector>
</template>

<script>
    export default {
        data() {
            return {
                keyword: '',
                columns: [
                    {
                        title: "编号",
                        key: "code"
                    },
                    {
                        title: "姓名",
                        key: 'name'
                    },
                ],
            }
        },
        props: {
        },
        methods: {
            onItemSelect(item) {
                this.$emit('select', item)
            },
            search() {
                this.$refs.selector.filter('keyword', this.keyword)
            },
        }
    }
</script>

<style scoped>
</style>
