import {Vue, Component} from 'vue-property-decorator'

@Component({name:"app"})
export default class App extends Vue{
    reload(){
        console.log('reload');
    }
    render(){
        return (
            <div>
<<<<<<< HEAD
                <ssui-header aaa={'ssui-header'}></ssui-header>
                <ssui-map-container  min-zoom={20} aaa={'aaa'}></ssui-map-container>
=======
                {/* <ssui-header></ssui-header> */}
                <ssui-map-container minZoom={12} reload={this.reload} center={[116.38, 39.90]}></ssui-map-container>
>>>>>>> 5e857a9c5d157d037f92120108773cee51c24777
            </div>
        )
    }
}