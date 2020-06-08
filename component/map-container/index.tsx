import { Vue, Component, Ref, Prop, Emit } from 'vue-property-decorator'
import mapboxGl from 'mapbox-gl'
import './index.postcss'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
@Component({ name: "ssui-map-container" })
export default class MapContainer extends Vue {
  @Prop({ type: Number, default: 10 })
  readonly minZoom?: number;

  @Prop({ type: Array, default: () => [116.38, 39.90] })
  readonly center?: [number, number];

  @Prop({ type: String, default: 'mapbox://styles/mapbox/streets-v9' })
  readonly mapStyle?: string;

  @Prop({ type: Number, default: 3 })
  readonly zoom?: number;

  static install(Vue: any) {
    Vue.component('ssui-map-container', MapContainer)
  }
  @Ref('map')
  readonly mapContainer!: HTMLDivElement
  map?: mapboxGl.Map

  @Emit()
  reload() {
    console.log('reload in map component')
  }
  mounted() {
    mapboxGl.accessToken = 'pk.eyJ1IjoicGlucGFydGRldiIsImEiOiJjajBqOXh0anAwMDFkMzNwbW5qMzVuZGo0In0.ltvQzboVtprxfeFAVOw1GA'
    const { mapContainer, center, minZoom, zoom, mapStyle } = this

    this.map = new mapboxGl.Map({
      container: mapContainer,
      center: center,
      minZoom: minZoom,
      zoom: zoom,
      attributionControl: false,
      style: mapStyle
    })
    this.map.on('load', () => {
      console.log('load')
      this.reload()
    })

    // 设置语言
    const language = new MapboxLanguage({ defaultLanguage: "zh" })
    this.map.addControl(language)
  }

  render() {
    console.log(this)

    return <div ref="map" class='map'></div>
  }
}
