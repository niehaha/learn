import {Vue, Component} from 'vue-property-decorator'

@Component({name:"app"})
export default class App extends Vue{
    reload(){
        console.log('reload')
    }
    render(){
        return (
            <div>
                {/* <ssui-header></ssui-header> */}
                <ssui-map-container minZoom={12} reload={this.reload} center={[116.38, 39.90]}></ssui-map-container>
            </div>
        )
    }
}