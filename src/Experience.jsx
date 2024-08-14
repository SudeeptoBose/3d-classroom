import { Box, OrbitControls, Text, useHelper } from '@react-three/drei'
import { Classroom } from './Classroom'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { DirectionalLightHelper, PointLightHelper } from 'three'
import { useControls } from 'leva'
import { easing } from 'maath'

const Experience = () => {

    const [deviceType, setDeviceType] = useState('desktop')
    const directionalLight = useRef()
    const pointLight = useRef()
    const context = useThree()

    // const gyroscope = new Gyroscope()

    // console.log(gyroscope)

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
        if(state.viewport.width> 2.5)
        {
          easing.dampE(state.camera.rotation, [state.pointer.y * rotationFactor, -state.pointer.x * rotationFactor, 0], 0.25, delta)
        } else if( state.viewport.width < 2.5)
        {
          easing.dampE(state.camera.rotation, [state.pointer.y * rotationFactor, -state.pointer.x * rotationFactor, 0], 0.25, delta)
        }
        
        // easing.damp3(pointLight.current.position, [Math.sin(state.clock.getElapsedTime()), 1, -1.5 +(Math.cos(state.clock.getElapsedTime()))], 0.25, delta) 
        pointLight.current.intensity = flicker()
    })

    // useHelper(directionalLight, DirectionalLightHelper, 1, 'red')
    // useHelper(pointLight, PointLightHelper, 1, 'red')

    const { positionX, positionY, positionZ, } = useControls({
        positionX: {value:1.3, min:-10, max:10, step:0.1},
        positionY: {value:1.0, min:-10, max:10, step:0.1},
        positionZ: {value:-0.9, min:-10, max:10, step:0.1},
    })

    const {positionCubeX, positionCubeY, positionCubeZ, } = useControls({  
        positionCubeX: {value:0.4, min:-10, max:10, step:0.1},
        positionCubeY: {value:1.3, min:-10, max:10, step:0.1},
        positionCubeZ: {value:-2.8, min:-10, max:10, step:0.1},
    })

    const randomAlert = () =>
    {
        alert('BOOOOO!')
    }

    const text = 'Red Room'

    return (
        <>
            {/* <OrbitControls/> */}
            {/* <ambientLight intensity={0.5}/> */}
            {/* <directionalLight ref={directionalLight} intensity={intensity} position={[positionX,positionY,positionZ]} color={'red'}/> */}
            <Text scale={0.5} color={'crimson'} position={[0, 1, -1]}>{text}</Text>
            <pointLight ref={pointLight} position={[positionX,positionY,positionZ]} color={'red'}/>
            <Box onClick={randomAlert} scale={[2,1,0.5]} position={[positionCubeX, positionCubeY, positionCubeZ]} visible={false}/>
            <Classroom scale={[50,50,50]} rotation={[0,-Math.PI/2,0]}/>
        </>
    )
}

export default Experience