import { Box, Float, OrbitControls, Text, useHelper } from '@react-three/drei'
import { Classroom } from './Classroom'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { DirectionalLightHelper, MathUtils, PointLightHelper } from 'three'
import { useControls } from 'leva'
import { easing } from 'maath'

const Experience = () => {

    const [deviceType, setDeviceType] = useState('desktop')
    const directionalLight = useRef()
    const pointLight = useRef()
    const {context, viewport} = useThree()

    // const gyroscope = new Gyroscope()

    // console.log(viewport)
    const scalingFactor = viewport.width<2? 0.5 : 1
    const flicker = () =>{
        if(Math.random()>0.1)
        {
            return 5
        }
        else return 1
    }


    useFrame(( state, delta)=>
    {
        // console.log(state.viewport)
        const rotationFactor = 0.2
        easing.dampE(state.camera.rotation, [state.pointer.y * rotationFactor, -state.pointer.x * rotationFactor, 0], 0.25, delta)
        // easing.damp3(pointLight.current.position, [Math.sin(state.clock.getElapsedTime()), 1, -1.5 +(Math.cos(state.clock.getElapsedTime()))], 0.25, delta) 
        pointLight.current.intensity = flicker()
    })

    // useHelper(directionalLight, DirectionalLightHelper, 1, 'red')
    // useHelper(pointLight, PointLightHelper, 1, 'red')

    // const { positionX, positionY, positionZ, } = useControls({
    //     positionX: {value: scalingFactor * 1.3, min:-10, max:10, step:0.1},
    //     positionY: {value: scalingFactor * 1.0, min:-10, max:10, step:0.1},
    //     positionZ: {value: scalingFactor * -0.9, min:-10, max:10, step:0.1},
    // })

    // const {positionCubeX, positionCubeY, positionCubeZ, } = useControls({  
    //     positionCubeX: {value: scalingFactor * 0.4, min:-10, max:10, step:0.1},
    //     positionCubeY: {value: scalingFactor * 1.3, min:-10, max:10, step:0.1},
    //     positionCubeZ: {value: scalingFactor * -2.8, min:-10, max:10, step:0.1},
    // })

    const randomAlert = () =>
    {
        alert('BOOOOO!')
    }

    const text = 'Error 404'

    return (
        <>
            <Float speed={2} floatIntensity={0.8}>
                <Text scale={0.5 * scalingFactor} font='/who asks satan.ttf' fontSize={0.85} color={'#780606'} rotation={[0,MathUtils.degToRad(-45),0]} position={ scalingFactor<1?[0, 1.3,0]: [0.5 , 1 , 0]}>{text}</Text>
            </Float>
            <pointLight ref={pointLight} position={[1.3,1.0,-0.9]} color={'red'}/>
            <Box onClick={randomAlert} scale={[2 * scalingFactor,1 * scalingFactor,0.5 * scalingFactor]} position={scalingFactor<1?[0.2,1.3,-1.4 ]: [0.4, 1.3, -2.8]} visible={false}/>
            <Classroom scale={[50 * scalingFactor,50 * scalingFactor,50 * scalingFactor]} rotation={[0,-Math.PI/2,0]} position={scalingFactor<1? [0,0.7,0 ]: [0,0,0]}/>
        </>
    )
}

export default Experience