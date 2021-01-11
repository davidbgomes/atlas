import React , { Suspense, lazy } from 'react'
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom"
import LoadIndicatorWithDelay from "./components/LoadIndicatorWithDelay"
import SideMenu from "./components/SideMenu"
import { Menu } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { BrowserView, MobileView, isMobile } from "react-device-detect"

import './styles/App.css'
import { Layout } from 'antd';

const Home = lazy(() => import('./Home'))

const { Sider, Header } = Layout

class App extends React.Component{

    constructor(){
        super()
        this.state = {
            isMenuOpen: false,
            isGraticule: false,
            isSphere: false,
            isEquator: false,
            selectedMenuKey: '1',
        }
    }

    toggleMenu = () => {
        this.setState(prevState =>{
            return{
                isMenuOpen: !prevState.isMenuOpen
            }
        })
    }

    toggleIsGraticule = () => {
        this.setState(prevState =>{
            return{
                isGraticule: !prevState.isGraticule
            }
        })
    }

    toggleIsSphere = () => {
        this.setState(prevState =>{
            return{
                isSphere: !prevState.isSphere
            }
        })
    }

    toggleIsEquator = () => {
        this.setState(prevState =>{
            return{
                isEquator: !prevState.isEquator
            }
        })
    }

    onChangeMenuKey = (event) =>{
        this.setState({
            selectedMenuKey: event.key
        })
    }

    render(){

        return(
            <div>
                <Layout style={{height:"100vh"}}>
                    <MobileView>
                        <Layout style={{zIndex:9}}>
                            <Header style={{display:"flex", height:"50px", padding:"0 20px"}}  className="header">
                                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']} style={{display:"flex"}}>
                                    <MenuOutlined className="hamburgerButton" onClick={this.toggleMenu}/>
                                </Menu>
                                <div className="headerTitleDiv">
                                    <h1 className="headerTitle">Atlas</h1>
                                </div>
                            </Header>
                        </Layout>
                    </MobileView>
                    <Layout>
                        <SideMenu
                            isMenuOpen={this.state.isMenuOpen}
                            isGraticule={this.state.isGraticule}
                            toggleIsGraticule={this.toggleIsGraticule}
                            isSphere={this.state.isSphere}
                            toggleIsSphere={this.toggleIsSphere}
                            isEquator={this.state.isEquator}
                            toggleIsEquator={this.toggleIsEquator}
                            selectedMenuKey={this.state.selectedMenuKey}
                            onChangeMenuKey={this.onChangeMenuKey}
                        />
                        <Suspense fallback={<LoadIndicatorWithDelay/>}>
                            <Switch>
                                <Route path="/">
                                    <Home
                                        isGraticule={this.state.isGraticule}
                                        isSphere={this.state.isSphere}
                                        isEquator={this.state.isEquator}
                                        selectedMenuKey={this.state.selectedMenuKey}
                                    />
                                </Route>      
                            </Switch>
                        </Suspense>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default withRouter(App)