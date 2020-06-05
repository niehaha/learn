import { Vue, Component, Ref, Prop } from 'vue-property-decorator'
import mapboxGl from 'mapbox-gl'
import './index.postcss'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
@Component({ name: "ssui-map-container" })
export default class MapContainer extends Vue {
  @Prop({ type: Number, default: 10 })
  readonly minZoom?: number;
  @Prop({ type: Array, default: [116.38, 39.90] })
  readonly center?: [number,number];
  @Prop({ type: String, default: 'mapbox://styles/mapbox/streets-v9' })
  readonly style?: string;
  @Prop({ type: Number, default: 3 })
  readonly zoom?: number;

  static install(Vue: any) {
    Vue.component('ssui-map-container', MapContainer)
  }

  @Ref('map')
  readonly mapContainer!: HTMLDivElement

  map?: mapboxGl.Map

  mounted() {
    mapboxGl.accessToken = 'pk.eyJ1IjoicGlucGFydGRldiIsImEiOiJjajBqOXh0anAwMDFkMzNwbW5qMzVuZGo0In0.ltvQzboVtprxfeFAVOw1GA'
    this.map = new mapboxGl.Map({
      container: this.mapContainer,
      center: this.center,
      minZoom: this.minZoom,
      zoom: this.zoom,
      attributionControl: false,
      style: this.style
    })
    // 设置语言
    let language = new MapboxLanguage({ defaultLanguage: "zh" });
    this.map.addControl(language);
  }

  render() {
    return <div ref="map" class='map'></div>
  }
}
