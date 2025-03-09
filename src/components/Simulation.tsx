import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Environment } from '@react-three/drei';
import Spaceship from './Spaceship';
import LimeTree from './LimeTree';
import BeechTree from './BeechTree';
import PalmTreeLong from './PalmTreeLong';
import SpruceTree from './SpruceTree';
import House1 from './House1';
import House2 from './House2';
import House3 from './House3';
import House4 from './House4';
import House5 from './House5';
import Barn from './Barn';
import Library from './Library';
import FerrisWheel from './FerrisWheel';
import WindTurbine from './WindTurbine';
import Tower from './Tower';
import LargeRock from './LargeRock';
import LampPost from './LampPost';
import Rock from './Rock';
import Ruins from './Ruins';
import * as THREE from 'three';
import { fixedPositions } from '@/lib/utils';
import { MoveRight, MoveLeft, MoveDown, MoveUp } from 'lucide-react';

// Sky colors for different times of day
const skyColors = {
  morning: '#87CEEB', // Light blue
  evening: '#FFA07A', // Light salmon (orange-yellow)
  night: '#000000', // Black
};

// Hybrid camera that follows the spaceship but allows looking around
interface HybridCameraProps {
  target: React.RefObject<THREE.Group | null>;
}

const HybridCamera = ({ target }: HybridCameraProps) => {
  const { camera } = useThree();
  // Adjusted camera offset - moved further back from the spaceship
  const offsetRef = useRef({ x: 0, y: 2, z: 15 });

  useFrame(() => {
    if (target.current) {
      // Get the spaceship's position and quaternion
      const position = target.current.position;
      const quaternion = target.current.quaternion;

      // Create a direction vector pointing backward (negative Z)
      const direction = new THREE.Vector3(0, 0, 1);

      // Apply the spaceship's rotation to the direction vector
      direction.applyQuaternion(quaternion);

      // Scale the direction vector by the desired distance
      direction.multiplyScalar(offsetRef.current.z);

      // Position camera behind the spaceship based on the rotated direction
      camera.position.x = position.x + direction.x;
      camera.position.y = position.y + offsetRef.current.y; // Add height offset
      camera.position.z = position.z + direction.z;

      // Look at the spaceship
      camera.lookAt(position);
    }
  });

  return null;
};

// Spaceship controller component for handling movement
interface SpaceshipControllerProps {
  spaceshipRef: React.RefObject<THREE.Group | null>;
}

const SpaceshipController = ({ spaceshipRef }: SpaceshipControllerProps) => {
  const [keys, setKeys] = useState<Set<string>>(new Set());
  const maxSpeed = 200; // Maximum speed
  const acceleration = 30; // Acceleration rate
  const deceleration = 25; // Deceleration rate
  const turnRate = 1; // How fast the spaceship turns (in radians per second)
  const currentSpeed = useRef(0); // Current speed - using ref to avoid re-renders
  const currentDirection = useRef(0); // Current direction (yaw) - persists between frames
  const maxBankAngle = 0.5; // Maximum banking angle in radians (about 17 degrees)
  const currentBankAngle = useRef(0); // Current banking angle (roll) - for tilting during turns
  const bankingSmoothness = 3; // How quickly the banking angle changes (higher = smoother)

  // Vertical movement parameters
  const minHeight = 2; // Minimum height above ground
  const maxHeight = 500; // Maximum height (increased from 20)
  const verticalSpeed = 15; // Speed of vertical movement (increased from 5)
  const maxPitchAngle = 0.6; // Maximum pitch angle (increased from 0.2)
  const currentHeight = useRef(minHeight); // Current height - start at minimum
  const currentPitchAngle = useRef(0); // Current pitch angle
  const pitchSmoothness = 3; // How quickly the pitch angle changes
  const minSpeedForVertical = 25; // Minimum speed required for vertical movement

  // Set up keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Track W, S, A, D, and arrow keys
      const key = e.key.toLowerCase();
      if (
        key === 'w' ||
        key === 's' ||
        key === 'a' ||
        key === 'd' ||
        key === 'arrowleft' ||
        key === 'arrowright' ||
        key === 'arrowup' ||
        key === 'arrowdown'
      ) {
        setKeys((prev) => {
          const newKeys = new Set(prev);
          newKeys.add(key);
          return newKeys;
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Track W, S, A, D, and arrow keys
      const key = e.key.toLowerCase();
      if (
        key === 'w' ||
        key === 's' ||
        key === 'a' ||
        key === 'd' ||
        key === 'arrowleft' ||
        key === 'arrowright' ||
        key === 'arrowup' ||
        key === 'arrowdown'
      ) {
        setKeys((prev) => {
          const newKeys = new Set(prev);
          newKeys.delete(key);
          return newKeys;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Update spaceship position based on keys pressed with gradual acceleration/deceleration
  useFrame((_, delta) => {
    if (!spaceshipRef.current) return;

    // Calculate target speed based on keys pressed
    let targetSpeed = 0;

    // Forward movement with W
    if (keys.has('w')) {
      targetSpeed = maxSpeed; // Positive for forward movement
    }

    // Backward movement with S
    if (keys.has('s')) {
      targetSpeed = -maxSpeed; // Negative for backward movement
    }

    // If both W and S are pressed, don't move
    if (keys.has('w') && keys.has('s')) {
      targetSpeed = 0;
    }

    // Gradually adjust current speed towards target speed
    if (currentSpeed.current < targetSpeed) {
      // Accelerate
      currentSpeed.current = Math.min(
        targetSpeed,
        currentSpeed.current + acceleration * delta
      );
    } else if (currentSpeed.current > targetSpeed) {
      // Decelerate
      currentSpeed.current = Math.max(
        targetSpeed,
        currentSpeed.current - deceleration * delta
      );
    }

    // Handle turning - but only change direction, don't auto-center
    let targetBankAngle = 0; // Default bank angle (no tilt)

    if (keys.has('a') || keys.has('arrowleft')) {
      // Turn left (increase angle)
      currentDirection.current += turnRate * delta;
      targetBankAngle = maxBankAngle; // Bank right when turning left
    }

    if (keys.has('d') || keys.has('arrowright')) {
      // Turn right (decrease angle)
      currentDirection.current -= turnRate * delta;
      targetBankAngle = -maxBankAngle; // Bank left when turning right
    }

    // Keep direction between 0 and 2π
    currentDirection.current = currentDirection.current % (Math.PI * 2);
    if (currentDirection.current < 0) {
      currentDirection.current += Math.PI * 2;
    }

    // Handle vertical movement
    let targetPitchAngle = 0; // Default pitch angle (level)
    let heightChange = 0;

    // Check if we can ascend (need minimum speed)
    const canAscend = Math.abs(currentSpeed.current) > minSpeedForVertical;

    // For descending, we only need to be above minimum height (no speed requirement)
    const canDescend = currentHeight.current > minHeight;

    // Determine if we're turning
    const isTurning =
      keys.has('a') ||
      keys.has('arrowleft') ||
      keys.has('d') ||
      keys.has('arrowright');

    // Reduce pitch angle when turning to prevent awkward orientations
    const pitchMultiplier = isTurning ? 0.5 : 1.0;

    if (keys.has('arrowdown') && canAscend) {
      // Move up and tilt nose up (requires speed)
      heightChange = verticalSpeed * delta;
      targetPitchAngle = maxPitchAngle * pitchMultiplier;
    }

    if (keys.has('arrowup') && canDescend) {
      // Move down and tilt nose down (no speed requirement)
      heightChange = -verticalSpeed * delta;
      targetPitchAngle = -maxPitchAngle * pitchMultiplier;
    }

    // Update height with constraints
    currentHeight.current += heightChange;

    // Enforce minimum and maximum height
    if (currentHeight.current < minHeight) {
      currentHeight.current = minHeight;
      targetPitchAngle = 0; // Level out when at minimum height
    } else if (currentHeight.current > maxHeight) {
      currentHeight.current = maxHeight;
    }

    // Smoothly adjust banking angle
    const bankingDelta =
      (targetBankAngle - currentBankAngle.current) * bankingSmoothness * delta;
    currentBankAngle.current += bankingDelta;

    // Smoothly adjust pitch angle
    const pitchDelta =
      (targetPitchAngle - currentPitchAngle.current) * pitchSmoothness * delta;
    currentPitchAngle.current += pitchDelta;

    // Use quaternions for proper 3D rotation that respects the ship's current orientation
    // Reset rotation first
    spaceshipRef.current.rotation.set(0, 0, 0);

    // Create quaternions for each rotation
    const yawQ = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      currentDirection.current
    );

    // Create pitch quaternion (rotate around local X axis)
    const pitchQ = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(1, 0, 0),
      currentPitchAngle.current
    );

    // Create roll quaternion (rotate around local Z axis)
    const rollQ = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      currentBankAngle.current
    );

    // Combine rotations in the correct order: yaw -> pitch -> roll
    const combinedQ = new THREE.Quaternion();
    combinedQ.multiplyQuaternions(yawQ, pitchQ);
    combinedQ.multiplyQuaternions(combinedQ, rollQ);

    // Apply the combined rotation to the spaceship
    spaceshipRef.current.quaternion.copy(combinedQ);

    // Apply movement based on current speed and direction
    if (Math.abs(currentSpeed.current) > 0.1) {
      // Calculate movement vector based on direction
      const moveX =
        Math.sin(currentDirection.current) * -currentSpeed.current * delta;
      const moveZ =
        Math.cos(currentDirection.current) * -currentSpeed.current * delta;

      // Apply movement
      spaceshipRef.current.position.x += moveX;
      spaceshipRef.current.position.z += moveZ;
    }

    // Apply height to Y position with hovering effect when speed is near zero
    const isHovering = Math.abs(currentSpeed.current) < 5; // Consider hovering when speed is less than 5

    if (isHovering) {
      // Add hovering effect when the ship is stationary or moving very slowly
      // Use a safe way to get the current time that works in both browser and server environments
      const time =
        typeof window !== 'undefined' ? (performance?.now() || 0) * 0.001 : 0;
      const hoverSpeed = 1.5;
      const hoverHeight = 0.2;

      // Primary hover motion
      const primaryHover = Math.sin(time * hoverSpeed) * hoverHeight;

      // Secondary subtle motion for more realism
      const secondaryHover =
        Math.sin(time * hoverSpeed * 2.5) * (hoverHeight * 0.2);

      // Apply hovering to the height
      spaceshipRef.current.position.y =
        currentHeight.current + primaryHover + secondaryHover;

      // Add slight tilting for more dynamic hovering effect
      const hoverTiltX = Math.sin(time * hoverSpeed * 0.3) * 0.01;
      const hoverTiltZ = Math.sin(time * hoverSpeed * 0.5) * 0.03;

      // Apply hover tilt by modifying the quaternion slightly
      const hoverTiltQ = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(hoverTiltX, 0, hoverTiltZ)
      );

      // Combine with existing rotation
      spaceshipRef.current.quaternion.multiply(hoverTiltQ);
    } else {
      // Just apply the height without hovering
      spaceshipRef.current.position.y = currentHeight.current;
    }
  });

  return null;
};

const Simulation = () => {
  const [timeOfDay, setTimeOfDay] = useState('evening');
  const spaceshipRef = useRef<THREE.Group>(null);

  // Use refs to store the positions so they don't change on re-renders
  const positions = fixedPositions;

  // Initialize positions only once

  return (
    <div className='h-screen w-full relative'>
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: false,
          stencil: false,
          depth: true,
          shadowMapEnabled: true,
          shadowMapType: THREE.PCFSoftShadowMap,
        }}
        camera={{ position: [0, 0, 0], fov: 50 }}
      >
        {/* Sky - based on time of day */}
        <color
          attach='background'
          args={[skyColors[timeOfDay as keyof typeof skyColors]]}
        />

        {/* Environment lighting */}
        <Environment
          preset={
            timeOfDay === 'night'
              ? 'night'
              : timeOfDay === 'evening'
              ? 'sunset'
              : 'park'
          }
        />

        {/* Stars - only visible at night */}
        {timeOfDay === 'night' && (
          <Stars
            radius={300}
            depth={100}
            count={7000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
        )}

        {/* Lighting - adjusted based on time of day */}
        <ambientLight intensity={timeOfDay === 'night' ? 0.2 : 0.5} />
        <directionalLight
          position={[50, 100, 50]}
          intensity={timeOfDay === 'night' ? 0.8 : 1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={500}
          shadow-camera-left={-250}
          shadow-camera-right={250}
          shadow-camera-top={250}
          shadow-camera-bottom={-250}
          shadow-bias={-0.0001}
        />

        {/* Single large ground */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.5, 0]}
          receiveShadow
        >
          <planeGeometry args={[1000, 1000]} />
          <meshStandardMaterial
            color={
              timeOfDay === 'night'
                ? '#1a3300'
                : timeOfDay === 'evening'
                ? '#556B2F'
                : '#8FBC8F'
            }
          />
        </mesh>

        {/* Runway */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.49, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 500]} />
          <meshStandardMaterial color='#333333' />
        </mesh>

        {/* Runway markings */}
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh
            key={i}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.48, -200 + i * 20]}
            receiveShadow
          >
            <planeGeometry args={[4, 2]} />
            <meshStandardMaterial color='#ffffff' />
          </mesh>
        ))}

        {/* Trees */}
        {positions.trees.map((tree, index) => {
          if (tree.type === 'lime') {
            return (
              <LimeTree
                key={`lime-${index}`}
                position={tree.position}
                scale={tree.scale}
                castShadow
                receiveShadow
              />
            );
          } else if (tree.type === 'beech') {
            return (
              <BeechTree
                key={`beech-${index}`}
                position={tree.position}
                scale={tree.scale}
                castShadow
                receiveShadow
              />
            );
          } else if (tree.type === 'palm') {
            return (
              <PalmTreeLong
                key={`palm-${index}`}
                position={tree.position}
                scale={tree.scale}
                castShadow
                receiveShadow
              />
            );
          } else {
            return (
              <SpruceTree
                key={`spruce-${index}`}
                position={tree.position}
                scale={tree.scale}
                castShadow
                receiveShadow
              />
            );
          }
        })}

        {/* Houses and buildings */}
        {positions.houses.map((house, index) => {
          if (house.type === 'house1') {
            return (
              <House1
                key={`house1-${index}`}
                position={house.position}
                rotation={[0, house.rotation, 0]}
                scale={house.scale}
                castShadow
                receiveShadow
              />
            );
          } else if (house.type === 'house2') {
            return (
              <House2
                key={`house2-${index}`}
                position={house.position}
                rotation={[0, house.rotation, 0]}
                scale={house.scale}
                castShadow
                receiveShadow
              />
            );
          } else if (house.type === 'house3') {
            return (
              <House3
                key={`house3-${index}`}
                position={house.position}
                rotation={[0, house.rotation, 0]}
                scale={house.scale}
                castShadow
                receiveShadow
              />
            );
          } else if (house.type === 'house4') {
            return (
              <House4
                key={`house4-${index}`}
                position={house.position}
                rotation={[0, house.rotation, 0]}
                scale={house.scale}
                castShadow
                receiveShadow
              />
            );
          } else if (house.type === 'house5') {
            return (
              <House5
                key={`house5-${index}`}
                position={house.position}
                rotation={[0, house.rotation, 0]}
                scale={house.scale}
                castShadow
                receiveShadow
              />
            );
          } else if (house.type === 'barn') {
            return (
              <Barn
                key={`barn-${index}`}
                position={house.position}
                rotation={[0, house.rotation, 0]}
                scale={house.scale}
                castShadow
                receiveShadow
              />
            );
          } else {
            return (
              <Library
                key={`library-${index}`}
                position={house.position}
                rotation={[0, house.rotation, 0]}
                scale={house.scale}
                castShadow
                receiveShadow
              />
            );
          }
        })}

        {/* Landmarks - new models */}
        {positions.landmarks.map((landmark, index) => {
          if (landmark.type === 'ferrisWheel') {
            return (
              <FerrisWheel
                key={`ferrisWheel-${index}`}
                position={landmark.position}
                rotation={[0, landmark.rotation, 0]}
                scale={landmark.scale}
                castShadow
                receiveShadow
              />
            );
          } else if (landmark.type === 'windTurbine') {
            return (
              <WindTurbine
                key={`windTurbine-${index}`}
                position={landmark.position}
                rotation={[0, landmark.rotation, 0]}
                scale={landmark.scale}
                castShadow
                receiveShadow
              />
            );
          } else if (landmark.type === 'tower') {
            return (
              <Tower
                key={`tower-${index}`}
                position={landmark.position}
                rotation={[0, landmark.rotation, 0]}
                scale={landmark.scale}
                castShadow
                receiveShadow
              />
            );
          } else if (landmark.type === 'largeRock') {
            return (
              <LargeRock
                key={`largeRock-${index}`}
                position={landmark.position}
                rotation={[0, landmark.rotation, 0]}
                scale={landmark.scale}
                castShadow
                receiveShadow
              />
            );
          } else if (landmark.type === 'lampPost') {
            return (
              <LampPost
                key={`lampPost-${index}`}
                position={landmark.position}
                rotation={[0, landmark.rotation, 0]}
                scale={landmark.scale}
                castShadow
                receiveShadow
              />
            );
          } else if (landmark.type === 'rock') {
            return (
              <Rock
                key={`rock-${index}`}
                position={landmark.position}
                rotation={[0, landmark.rotation, 0]}
                scale={landmark.scale}
                castShadow
                receiveShadow
              />
            );
          } else if (landmark.type === 'ruins') {
            return (
              <Ruins
                key={`ruins-${index}`}
                position={landmark.position}
                rotation={[0, landmark.rotation, 0]}
                scale={landmark.scale}
                castShadow
                receiveShadow
              />
            );
          }
          return null;
        })}

        {/* Spaceship - positioned at the start of the runway, facing down the runway */}
        <Spaceship
          ref={spaceshipRef}
          position={[0, 0.5, 200]}
          rotation={[0, 0, 0]}
          castShadow
          hoverSpeed={1.2}
          hoverHeight={0.2}
        />

        {/* Spaceship controller for movement */}
        <SpaceshipController spaceshipRef={spaceshipRef} />

        {/* Hybrid camera that follows the ship but allows looking around */}
        <HybridCamera target={spaceshipRef} />
      </Canvas>

      {/* Time of day controls */}
      <div className='absolute bottom-4 left-4 p-4 bg-black/50 text-white rounded-lg'>
        <p className='mb-2 font-bold'>Time of Day:</p>
        <div className='flex gap-2'>
          <button
            className={`px-3 py-1 rounded ${
              timeOfDay === 'morning' ? 'bg-blue-500' : 'bg-gray-700'
            }`}
            onClick={() => setTimeOfDay('morning')}
          >
            Morning
          </button>
          <button
            className={`px-3 py-1 rounded ${
              timeOfDay === 'evening' ? 'bg-orange-500' : 'bg-gray-700'
            }`}
            onClick={() => setTimeOfDay('evening')}
          >
            Evening
          </button>
          <button
            className={`px-3 py-1 rounded ${
              timeOfDay === 'night' ? 'bg-purple-800' : 'bg-gray-700'
            }`}
            onClick={() => setTimeOfDay('night')}
          >
            Night
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className='absolute top-4 right-4 p-4 bg-black/50 text-white rounded-lg'>
        <p className='mb-2 font-bold'>Controls:</p>
        <p>W: Accelerate forward</p>
        <p>S: Accelerate backward</p>
        <p>
          A/
          <MoveLeft className='inline-block' />: Turn left
        </p>
        <p>
          D/
          <MoveRight className='inline-block' />: Turn right
        </p>
        <p>
          Arrow Down/
          <MoveDown className='inline-block' />: Move up (requires speed {'>'}
          25)
        </p>
        <p>
          Arrow Up/
          <MoveUp className='inline-block' />: Move down
        </p>
      </div>
    </div>
  );
};

export default Simulation;
