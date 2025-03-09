/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { useRef, JSX } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

type GLTFResult = GLTF & {
  nodes: {
    Barn_001: THREE.Mesh;
  };
  materials: {
    None: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/barn/model.gltf'
  ) as unknown as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Barn_001.geometry} material={materials.None} />
    </group>
  );
}

useGLTF.preload(
  'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/barn/model.gltf'
);
