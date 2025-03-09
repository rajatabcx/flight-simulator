import React, { useRef, useEffect, forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Preload the model
useGLTF.preload(
  'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf'
);

interface SpaceshipProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  castShadow?: boolean;
  hoverSpeed?: number;
  hoverHeight?: number;
  [key: string]: any;
}

const Spaceship = forwardRef<THREE.Group, SpaceshipProps>(
  (
    {
      position = [0, 1, 0],
      rotation = [0, 0, 0],
      castShadow = true,
      hoverSpeed = 1,
      hoverHeight = 0.2,
      ...props
    },
    ref
  ) => {
    // Ref for the spaceship group
    const groupRef = useRef<THREE.Group>(null);

    // Set up ref forwarding
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(groupRef.current);
        } else {
          ref.current = groupRef.current;
        }
      }
    }, [ref]);

    // Load the model
    const { scene } = useGLTF(
      'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf'
    );

    // Clone the scene to avoid modifying the cached original
    const model = scene.clone();

    // Adjust model orientation to face forward (down the runway)
    model.rotation.set(0, 0, 0);

    // Enable shadows on all meshes in the model
    useEffect(() => {
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = castShadow;
          child.receiveShadow = true;
        }
      });
    }, [model, castShadow]);

    // Add hovering animation
    useFrame((state) => {
      if (groupRef.current) {
        // More convincing hovering effect with multiple sine waves
        const time = state.clock.getElapsedTime();

        // Primary hover motion
        const primaryHover = Math.sin(time * hoverSpeed) * hoverHeight;

        // Secondary subtle motion for more realism
        const secondaryHover =
          Math.sin(time * hoverSpeed * 2.5) * (hoverHeight * 0.2);

        // Combine the hover motions - only affect Y position
        groupRef.current.position.y =
          position[1] + primaryHover + secondaryHover;

        // Add slight tilting for more dynamic effect
        groupRef.current.rotation.z =
          rotation[2] + Math.sin(time * hoverSpeed * 0.5) * 0.03;
        groupRef.current.rotation.x =
          rotation[0] + Math.sin(time * hoverSpeed * 0.3) * 0.01;
      }
    });

    if (typeof window !== 'undefined') {
      // Browser-only code here
    }

    return (
      <group
        ref={groupRef}
        position={position}
        rotation={[rotation[0], rotation[1], rotation[2]]}
      >
        <primitive
          object={model}
          scale={0.5}
          rotation={[0, Math.PI, 0]} // Adjust model to face forward
          {...props}
        />
      </group>
    );
  }
);

Spaceship.displayName = 'Spaceship';

export default Spaceship;
