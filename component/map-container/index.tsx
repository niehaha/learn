import { Vue, Component, Ref, Prop, Emit } from 'vue-property-decorator'
import mapboxGl from 'mapbox-gl'
mapboxGl.accessToken = 'pk.eyJ1IjoicGlucGFydGRldiIsImEiOiJjajBqOXh0anAwMDFkMzNwbW5qMzVuZGo0In0.ltvQzboVtprxfeFAVOw1GA'
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
    return this.map
  }


  mounted() {
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
      this.map?.addSource('AAA', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [166.38, 39.90]
              }
            }
          ]
        }
      })
      this.reload()


    })

    // 设置语言
    const language = new MapboxLanguage({ defaultLanguage: "zh" })
    this.map.addControl(language)
  }
  destroyed() {
    // 销毁
    if (this.map) { this.map.remove() }
  }

  render() {
    return <div ref="map" class='map'></div>
  }
}
