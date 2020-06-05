import {Vue, Component} from 'vue-property-decorator'

@Component({name:"app"})
export default class App extends Vue{
    render(){
        return (
            <div>
                {/* <ssui-header></ssui-header> */}
                <ssui-map-container minZoom={12}  ></ssui-map-container>
            </div>
        )
    }
}