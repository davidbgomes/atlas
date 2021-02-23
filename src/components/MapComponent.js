import React, { memo } from "react"
import { ZoomableGroup , ComposableMap , Geographies , Geography , Graticule , Sphere , Line} from "react-simple-maps"
import { isMobile } from "react-device-detect"
import "../styles/MapComponent.css"

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

const rounded = num => {
    if (num > 1000000000) {
        return Math.round(num / 100000000) / 10 + "Bn"
    } else if (num > 1000000) {
        return Math.round(num / 100000) / 10 + "M"
    } else {
        return Math.round(num / 100) / 10 + "K"
    }
}

const translateRange = (isMobile) =>{
    if (isMobile){
        return [[-2350, -430], [2700, 1030]]
    }
    else{
        return [[-550, -230], [1500, 830]]
    }
}
 

function MapComponent(props){
    return (
        <div className="mapDiv">
            <ComposableMap data-tip="" projectionConfig={{ scale: `${isMobile ? 900 : 400}`}} style={{height:"100vh", width:"100%"}}>
                <ZoomableGroup
                    translateExtent={translateRange(isMobile)}
                >
                    { props.isGraticule &&
                        <Graticule stroke="#EAEAEC" />
                    }
                    { props.isSphere &&
                        <Sphere stroke="#FF5533" strokeWidth={2} />
                    }
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        console.log(geo)
                                        const { NAME, POP_EST, GDP_MD_EST } = geo.properties;
                                        props.setTooltipContent(`${NAME} — ${props.selectedMenuKey === '1' ? rounded(POP_EST) : GDP_MD_EST/1000 + " Bn €"}`);
                                    }}
                                    onMouseLeave={() => {
                                        props.setTooltipContent("");
                                    }}
                                    style={{
                                        default: {
                                            fill: "#D6D6DA",
                                            outline: "none",
                                            stroke:"black",
                                            strokeWidth:"0.1"
                                        },
                                        hover: {
                                            fill: "#F53",
                                            outline: "none"
                                        },
                                        pressed: {
                                            fill: "#E42",
                                            outline: "none"
                                        }
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                    { props.isEquator &&
                        <Line
                            coordinates={[[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]]}
                            stroke="#F53"
                            strokeWidth={2}
                        />
                    }
                </ZoomableGroup>
            </ComposableMap>
        </div>
    )
}

export default memo(MapComponent)