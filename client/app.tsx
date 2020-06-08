import {Vue, Component} from 'vue-property-decorator'

@Component({name:"app"})
export default class App extends Vue{
    render(){
        return (
            <div>
                <ssui-header aaa={'ssui-header'}></ssui-header>
                <ssui-map-container  min-zoom={20} aaa={'aaa'}></ssui-map-container>
            </div>
        )
    }
}