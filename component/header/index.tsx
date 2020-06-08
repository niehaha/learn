import { Vue, Component, Prop } from 'vue-property-decorator'
import './index.postcss'
@Component({ name: "ssui-header" })
export default class Header extends Vue {
    @Prop() aaa?: string;

    static install(Vue: any) {   // 定义静态方法 install  可以使用vue.use()
        Vue.component('ssui-header', Header)
    }
    title?: string = '我是header'
    render() {
        console.log(this)

        console.log(this.aaa)

        return <div class="header">{this.title}111</div>
    }
}
