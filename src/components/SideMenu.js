import React from "react"
import 'antd/dist/antd.css'
import { Layout , Switch , Menu } from 'antd'
import { GlobalOutlined , UserOutlined , EuroCircleOutlined , SettingOutlined} from '@ant-design/icons'
import "../styles/SideMenu.css"
import { isMobile } from "react-device-detect"
const { SubMenu } = Menu
const { Sider, Header } = Layout


class SideMenu extends React.Component{

	render(){

		return(
			<Sider width={180}  className={`${!isMobile || isMobile && this.props.isMenuOpen ? "showSideMenu" : "hideSideMenu"}`}>
				<Menu
					style={{ minHeight: '100vh' }}
			        selectedKeys={[this.props.selectedMenuKey]}
			        onClick={this.props.onChangeMenuKey}
			        defaultOpenKeys={['sub1']}
			        mode="inline"
			        theme="dark"
			    >
			        <SubMenu key="sub1" icon={<GlobalOutlined />} title="Maps">
			            <Menu.Item key="1" icon={<UserOutlined />}>Population</Menu.Item>
			            <Menu.Item key="2" icon={<EuroCircleOutlined />}>GDP</Menu.Item>
			        </SubMenu>
			        <SubMenu key="sub2" icon={<SettingOutlined />} title="Config">
			        	<div style={{marginLeft:"auto", marginRight:"30px", marginTop:"10px", display:"table"}}>
				        	<label htmlFor="graticule">Graticule</label>
				        	<Switch id="graticule" checked={this.props.isGraticule} onChange={this.props.toggleIsGraticule} style={{marginLeft:"10px"}}/>
			        	</div>
			        	<div style={{marginLeft:"auto", marginRight:"30px", marginTop:"20px", display:"table"}}>
				        	<label htmlFor="sphere">Sphere</label>
				        	<Switch id="sphere" checked={this.props.isSphere} onChange={this.props.toggleIsSphere} style={{marginLeft:"10px"}}/>
			        	</div>
			        	<div style={{marginLeft:"auto", marginRight:"30px", marginTop:"20px", marginBottom:"20px", display:"table"}}>
				        	<label htmlFor="equator">Equator</label>
				        	<Switch id="equator" checked={this.props.isEquator} onChange={this.props.toggleIsEquator} style={{marginLeft:"10px"}}/>
			        	</div>
			        </SubMenu>
			    </Menu>
			</Sider>
		)
	}
}

export default SideMenu