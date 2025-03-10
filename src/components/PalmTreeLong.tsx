/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { useRef, JSX } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

type GLTFResult = GLTF & {
  nodes: {
    Group_152: THREE.Mesh;
    Group_154: THREE.Mesh;
  };
  materials: {
    ['wood.011']: THREE.MeshStandardMaterial;
    ['leaves.001']: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/palm-detailed-long/model.gltf'
  ) as unknown as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[3.92, 0, -7.17]}>
        <mesh
          geometry={nodes.Group_152.geometry}
          material={materials['wood.011']}
          position={[-0.65, 0, 0.59]}
          scale={0.77}
        />
        <mesh
          geometry={nodes.Group_154.geometry}
          material={materials['leaves.001']}
          position={[0, 1.72, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload(
  'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/palm-detailed-long/model.gltf'
);
