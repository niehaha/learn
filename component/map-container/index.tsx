import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import mapboxGl from 'mapbox-gl'
import './index.postcss'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
@Component({ name: "ssui-map-container" })
export default class MapContainer extends Vue {
  @Prop() minZoom?: number;
  @Prop() aaa?: string;
  static install(Vue: any) {
    Vue.component('ssui-map-container', MapContainer)
  }

  @Ref('map')
  readonly mapContainer!: HTMLDivElement

  map?: mapboxGl.Map
  
  mounted() {
    console.log(this.$props);
    
    console.log('this.minZoom',this.minZoom);
    // console.log(this.aaa);
    
    
    // console.log('this.$props.minZoom',this.$props.minZoom);

    mapboxGl.accessToken = 'pk.eyJ1IjoicGlucGFydGRldiIsImEiOiJjajBqOXh0anAwMDFkMzNwbW5qMzVuZGo0In0.ltvQzboVtprxfeFAVOw1GA'
    this.map = new mapboxGl.Map({
      container: this.mapContainer,
      center: [116.38, 39.90],
      minZoom: this.minZoom,
      zoom: 3,
      attributionControl: false,
      style: 'mapbox://styles/mapbox/streets-v9'
    })
    // 设置语言
    let language = new MapboxLanguage({ defaultLanguage: "zh" });
    this.map.addControl(language);
  }

  render() {
    return <div ref="map" class='map'></div>
  }
}
