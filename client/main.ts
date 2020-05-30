import Vue from 'vue'
import App from './app'
import SsUi from 'sts-signal-ui'

document.title = 'sts-signal-ui调试'
document.body.innerHTML = '<div id="app"></div>'
Vue.use(SsUi)

new Vue({
	render: h => h(App),
}).$mount('#app')