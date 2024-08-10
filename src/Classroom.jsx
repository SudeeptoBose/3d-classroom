
import { useGLTF } from '@react-three/drei'
import { SRGBColorSpace } from 'three'

export function Classroom(props) {
  const { nodes, materials } = useGLTF('/classroom.glb')
  // materials.colorSpace = SRGBColorSpace
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh castShadow receiveShadow geometry={nodes.Mesh.geometry} material={materials.metal} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_1.geometry} material={materials.tex} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_2.geometry}
          material={materials.lambert1}
          // visible={false}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_3.geometry}
          material={materials.glass}
          // visible={false}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_4.geometry}
          material={materials.white}
          
        />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_5.geometry} material={materials.wood} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_6.geometry}
          material={materials.book1}
          
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_7.geometry}
          material={materials.book2}
          
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_8.geometry}
          material={materials.blinn8}
          
        />
      </group>
    </group>
  )
}

useGLTF.preload('/classroom.glb')