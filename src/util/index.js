import {format} from './time'
import storage from './storage'

export default {
    // TODO
    getUser() {
        return storage.get('user')
    },
    getBranch() {
        return storage.get('branch')
        // return {
        //     id: '1',
        //     name: '广州总部'
        // }
    },
    getAccountSet() {
        return storage.get('accountSet')
        // return {
        //     id: '1',
        //     name: '广州总部'
        // }
    },
    getDepartment() {
        return storage.get('department')
        // return {
        //     id: '1',
        //     name: '技术部'
        // }
    },
    getCheckStateRender() {
        return (h, params)=>{
            let color = params.row.check_state === '0' ? 'yellow' : 'green'
            return h('div', {}, [
                h('Tag', {attrs: {type: 'dot', color: color}}, params.row.check_state === '0' ? '待审核' : '已审核')
            ])
        }
    },
    getDateRender(key) {
        return (h, params)=>{
            let date = new Date(params.row[key])
            date = format(date, 'yyyy-MM-dd')
            return h('div', {}, [
                h('div', {}, date)
            ])
        }
    },
    getBoolRender(key) {
        return (h, params)=>{
            return h('div', {}, [
                h('div', {}, params.row[key] === '1' ? '是' : '否')
            ])
        }
    }
}