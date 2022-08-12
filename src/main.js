import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
    Button,
    Form,
    Field,
    Toast,
    Tabbar,
    TabbarItem,
    Icon,
    Cell,
    CellGroup,
    Image as VanImage,
    Tag,
    Search,
    Swipe,
    SwipeItem,
    Notify,
    Sidebar,
    SidebarItem,
    PullRefresh,
    List,
    Tab,
    Tabs,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    SwipeCell,
    CheckboxGroup,
    Checkbox,
    SubmitBar,
    Stepper,
    Popup,
    Card,
    AddressList,
    AddressEdit,
    Steps, Step, NoticeBar, CountDown
} from "vant"
import md5 from 'js-md5'
import 'lib-flexible/flexible'

Vue.use(Button).use(Field).use(Toast).use(Form).
use(Tabbar).use(TabbarItem).use(Icon).use(Cell).use(CellGroup).
use(VanImage).use(Tag).use(Search).use(Swipe).use(SwipeItem).use(Notify).
use(Sidebar).use(SidebarItem).use(PullRefresh).use(List).use(Tab).use(Tabs).
use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(SwipeCell).
use(CheckboxGroup).use(Checkbox).use(SubmitBar).use(Stepper).use(Popup).use(Card).
use(AddressList).use(AddressEdit).use(Steps).use(Step).use(NoticeBar).use(CountDown)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$md5 = md5;
