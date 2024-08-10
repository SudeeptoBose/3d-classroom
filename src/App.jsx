import { Canvas } from "@react-three/fiber"
import Experience from "./Experience"
import { MathUtils } from "three"


function App() {

	return (
		<>
			<Canvas 
				camera={{
					position:[0.1,1,1],
					rotation:[MathUtils.degToRad(5), 0,0]
				}}
			>
				<color args={['black']} attach={'background'}/>
				<Experience/>
			</Canvas>
		</>
	)
}

export default App
