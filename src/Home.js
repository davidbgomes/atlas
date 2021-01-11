import React, { useState } from 'react'
import { Layout } from 'antd'
import MapComponent from './components/MapComponent'
import ReactTooltip from "react-tooltip"
import "./styles/Home.css"

const { Content } = Layout

function Home(props){

	const [content, setContent] = useState("")

	return(
		<Content className="homeContent">
			<MapComponent
				setTooltipContent={setContent}
				isGraticule={props.isGraticule}
				isSphere={props.isSphere}
				isEquator={props.isEquator}
				selectedMenuKey={props.selectedMenuKey}
			/>
			<ReactTooltip>{content}</ReactTooltip>
		</Content>
	)
	
}

export default Home