import Vue from 'vue'
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Avatar,
    Menu,
    MenuItem,
    Submenu,
    Button,
    Table,
    TableColumn,
    Form,
    FormItem,
    Dialog,
    Pagination,
    Input,
    Popconfirm,
    Row,
    Col,
    Aside,
    Container,
    Icon,
    Main,
    MessageBox,
    Loading
} from 'element-ui'
import './theme/index.css'

Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Avatar);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Input);
Vue.use(Popconfirm);
Vue.use(Row);
Vue.use(Col);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Container);
Vue.use(Icon);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
