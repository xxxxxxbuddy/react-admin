import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import routes from '../routes'
import { menuToggleAction } from '../store/actionCreators'
import '../style/layout.scss'

import AppHeader from './AppHeader.jsx'
import AppAside from './AppAside.jsx'
import AppFooter from './AppFooter.jsx'

const { Content } = Layout

class DefaultLayout extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            avatar: '',
            menu: [
                {
                    key: '/index',
                    title: '首页',
                    icon: 'home'
                },
                {
                    title: '通用',
                    key: '/public',
                    icon: 'appstore',
                    subs: [
                        {title: '按钮', key: '/public/button', icon: ''},
                        {title: '图标', key: '/public/icon', icon: ''}
                    ]
                },
                {
                    title: '导航',
                    key: '/nav',
                    icon: 'bulb',
                    subs: [
                        {title: '下拉菜单', key: '/nav/dropdown', icon: ''},
                        {title: '导航菜单', key: '/nav/menu', icon: ''},
                        {title: '步骤条', key: '/nav/steps', icon: ''}
                    ]
                },
                {
                    title: '表单',
                    key: '/form',
                    icon: 'form',
                    subs: [
                        {title: '选择框', key: '/form/choice', icon: ''},
                        {title: '表单', key: '/form/formlist', icon: ''},
                        {title: '输入框', key: '/form/input', icon: '',},
                        {title: '评分', key: '/form/rate', icon: ''},
                        {title: 'switch', key: '/form/switch', icon: ''},
                        {title: '穿梭框', key: '/form/transfer', icon: ''},
                        {title: '时间选择框', key: '/form/timepicker', icon: ''},
                        {title: '上传', key: '/form/upload', icon: ''},
                    ]
                },
                {
                    title: '展示',
                    key: '/show',
                    icon: 'pie-chart',
                    subs: [
                        {title: '表格', key: '/show/table', icon: ''},
                        {title: '折叠面板', key: '/show/collapse', icon: ''},
                        {title: '走马灯', key: '/show/carousel', icon: ''},
                        {title: '日历', key: '/show/calendar', icon: ''},
                        {title: '列表', key: '/show/list', icon: ''},
                        {title: '树形控件', key: '/show/tree', icon: ''},
                        {title: '标签页', key: '/show/tabs', icon: ''},
                    ]
                },
                {
                    title: '反馈',
                    key: '/feedback',
                    icon: 'file-text',
                    subs: [
                        {title: '抽屉', key: '/feedback/drawer', icon: ''},
                        {title: '对话框', key: '/feedback/modal', icon: ''},
                        {title: '进度条', key: '/feedback/progress', icon: ''},
                        {title: '加载中', key: '/feedback/spin', icon: ''},
                    ]
                },
                {
                    title: '多级导航',
                    key: '/one',
                    icon: 'bars', 
                    subs: [
                        {
                            title: '二级',
                            key: '/one/two',
                            icon: '',
                            subs: [
                                {title: '三级', key: '/one/two/three', icon: ''}
                            ]
                        }
                    ]
                },
                {
                    title: '关于',
                    key: '/about',
                    icon: 'user'
                }
            ]
        }
    }
    render() { 
        let { menuClick, menuToggle } = this.props
        return ( 
            <Layout className='app'>
                <AppAside menuToggle={menuToggle} menu={this.state.menu} />
                <Layout style={{marginLeft: menuToggle ? '80px' : '200px', minHeight: '100vh'}}>
                    <AppHeader menuToggle={menuToggle} menuClick={menuClick} avatar={this.state.avatar} />
                    <Content className='content'>
                        <Switch>
                            {
                                routes.map(res => {
                                    return <Route key={res.path} path={res.path} exact={res.exact} component={res.component}></Route>
                                })
                            }
                            <Redirect to='/404' />
                        </Switch>
                    </Content>
                    <AppFooter />
                </Layout>
            </Layout>
         );
    }
}

const stateToProp = state => ({
    menuToggle: state.menuToggle
})

const dispatchToProp = dispatch => ({
    menuClick() {
        dispatch(menuToggleAction())
    }
})

export default connect(stateToProp, dispatchToProp)(DefaultLayout)