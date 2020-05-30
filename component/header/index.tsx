import {Vue, Component} from 'vue-property-decorator'
import './index.postcss'
@Component({name:"ssui-header"})
export default class Header extends Vue{
    title?: string = '我是header'
    render(){
        return <div class="header">{this.title}111</div>
    }
}