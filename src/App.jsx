import { Canvas } from "@react-three/fiber"
import Experience from "./Experience"
import { MathUtils } from "three"
import { Leva } from "leva"
import Chatbot from "./chat/Chatbot"
// import GyroscopeComponent from "./test/GyroscopeComponent"


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
			<Leva collapsed/>
			<Chatbot/>
			{/* <Chat/> */}
		</>
	)
}

export default App
