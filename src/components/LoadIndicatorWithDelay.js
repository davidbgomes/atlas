import React , { useState, useRef, useEffect } from 'react'
import { Spin } from 'antd'
import "../styles/LoadIndicatorWithDelay.css"

function LoadIndicatorWithDelay(){

	const delay = 200 // 200ms
	const [showLoadingIndicator, setLoadingIndicatorVisibility] = useState(false)
	const timerRef = useRef(null)

	useEffect(() => {
		let isMounted = true

		timerRef.current = setTimeout(() => {
			if (isMounted){
				setLoadingIndicatorVisibility(true)
			}
		}, delay)

		// this will clear Timeout when component unmount like in willComponentUnmount
		return () => {
            clearTimeout(timerRef)
            isMounted = false
        }
	})

	
	if(showLoadingIndicator){
		return(
			<Spin />
		)
	}
	else{
		return null
	}
}

export default LoadIndicatorWithDelay