import Header from '../component/header'
import { shallowMount } from '@vue/test-utils'

const wrapper = shallowMount(Header)

describe('测试header组件', function () {
    it('header', function (done) {
        expect(wrapper.vm.$data.title).toEqual('我是header')
        done() 
    })
})