import { createContext, useContext, ReactNode } from 'react';
import { KeyboardControls as DreiKeyboardControls } from '@react-three/drei';

// Define the controls we'll use throughout the game
export enum Controls {
  forward = 'forward',
  backward = 'backward',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

// Map controls to keyboard keys
const keyboardMap = [
  { name: Controls.forward, keys: ['KeyW', 'ArrowUp'] },
  { name: Controls.backward, keys: ['KeyS', 'ArrowDown'] },
  { name: Controls.left, keys: ['KeyA', 'ArrowLeft'] },
  { name: Controls.right, keys: ['KeyD', 'ArrowRight'] },
  { name: Controls.jump, keys: ['Space'] },
];

// Create a context for keyboard controls
const KeyboardControlsContext = createContext<null>(null);

// Provider component
export function KeyboardControlsProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DreiKeyboardControls map={keyboardMap}>{children}</DreiKeyboardControls>
  );
}

// Custom hook to use keyboard controls
export function useKeyboardControlsContext() {
  const context = useContext(KeyboardControlsContext);
  if (context === null) {
    throw new Error(
      'useKeyboardControls must be used within a KeyboardControlsProvider'
    );
  }
  return context;
}
