/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { JSX, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

type GLTFResult = GLTF & {
  nodes: {
    formation_rock_1: THREE.Mesh;
    formation_rock_2: THREE.Mesh;
  };
  materials: {
    ['wood.008']: THREE.MeshStandardMaterial;
    sand: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/formation-rock/model.gltf'
  ) as unknown as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[5.7, 0, -10.67]}>
        <mesh
          geometry={nodes.formation_rock_1.geometry}
          material={materials['wood.008']}
        />
        <mesh
          geometry={nodes.formation_rock_2.geometry}
          material={materials.sand}
        />
      </group>
    </group>
  );
}

useGLTF.preload(
  'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/formation-rock/model.gltf'
);
