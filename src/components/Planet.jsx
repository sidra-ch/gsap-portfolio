import React, { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";

// ─── Floating indigo particles ────────────────────────────────────────────
const FloatingParticles = () => {
  const ref = useRef();
  const { positions, count } = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.0 + Math.random() * 2.8;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions, count };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.055;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.018) * 0.12;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#818cf8" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
};

// ─── Glowing indigo base ring ─────────────────────────────────────────────
const GlowRing = () => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.material.emissiveIntensity =
      0.55 + Math.sin(state.clock.elapsedTime * 1.4) * 0.18;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
      <torusGeometry args={[1.25, 0.04, 16, 120]} />
      <meshStandardMaterial
        color="#6366f1"
        emissive="#7c3aed"
        emissiveIntensity={0.6}
        metalness={1}
        roughness={0.08}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

// ─── Outer glow halo ──────────────────────────────────────────────────────
const GlowHalo = () => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.material.opacity =
      0.06 + Math.sin(state.clock.elapsedTime * 0.9) * 0.02;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
      <torusGeometry args={[1.25, 0.35, 16, 120]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#818cf8"
        emissiveIntensity={1}
        transparent
        opacity={0.07}
        depthWrite={false}
      />
    </mesh>
  );
};

// ─── Main Planet component ─────────────────────────────────────────────────
export const Planet = React.memo(function Planet(props) {
  const groupRef      = useRef(null);   // slow rotation driver
  const entryRef      = useRef(null);   // GSAP entry (position y)
  const spheresRef    = useRef(null);
  const ringRef       = useRef(null);

  const { nodes, materials, scene } = useGLTF("/models/Planet.glb");
  const memoNodes     = useMemo(() => nodes,     [nodes]);
  const memoMaterials = useMemo(() => materials, [materials]);
  const memoScene = useMemo(() => {
    if (!scene) return null;

    const cloned = scene.clone(true);

    // Make fallback scene camera-friendly: centered at origin and uniformly scaled.
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    if (Number.isFinite(size.length()) && size.length() > 0) {
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetSize = 2.8;
      const s = targetSize / maxDim;
      cloned.scale.setScalar(s);
      cloned.position.sub(center.multiplyScalar(s));
    }

    cloned.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    return cloned;
  }, [scene]);
  const hasNamedMeshes = Boolean(memoNodes?.Sphere?.geometry || memoNodes?.Ring?.geometry);

  // Continuous rotation — only on the inner group so props position is not affected
  useFrame((state) => {
    if (spheresRef.current) {
      spheresRef.current.rotation.y = state.clock.elapsedTime * 0.13;
    }
    if (ringRef.current) {
      // Very slight precession
      ringRef.current.rotation.z = -0.778 + state.clock.elapsedTime * 0.04;
    }
  });

  // Entry drop animation — gsap.to with explicit start so StrictMode double-invoke is safe
  useGSAP(() => {
    if (!entryRef.current) return;
    entryRef.current.position.y = 5;   // always set start explicitly
    gsap.to(entryRef.current.position, {
      y: 0,
      duration: 2.4,
      ease: "circ.out",
      delay: 0.4,
    });
  }, []);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* decorative extras */}
      <GlowRing />
      <GlowHalo />
      <FloatingParticles />

      {/* animated planet body */}
      <group ref={entryRef}>
        {hasNamedMeshes ? (
          <>
            <group ref={spheresRef}>
              {memoNodes?.Sphere?.geometry && memoMaterials?.["Material.002"] ? (
                <mesh
                  castShadow
                  receiveShadow
                  geometry={memoNodes.Sphere.geometry}
                  material={memoMaterials["Material.002"]}
                  rotation={[0, 0, 0.741]}
                />
              ) : (
                <mesh castShadow receiveShadow rotation={[0, 0, 0.741]}>
                  <sphereGeometry args={[1, 64, 64]} />
                  <meshStandardMaterial
                    color="#e8e8e8"
                    roughness={0.05}
                    metalness={0.12}
                    envMapIntensity={1.5}
                  />
                </mesh>
              )}
              {memoNodes?.Sphere2?.geometry && memoMaterials?.["Material.001"] && (
                <mesh
                  castShadow
                  receiveShadow
                  geometry={memoNodes.Sphere2.geometry}
                  material={memoMaterials["Material.001"]}
                  position={[0.647, 1.03, -0.724]}
                  rotation={[0, 0, 0.741]}
                  scale={0.223}
                />
              )}
            </group>

            {memoNodes?.Ring?.geometry && memoMaterials?.["Material.001"] ? (
              <mesh
                ref={ringRef}
                castShadow
                receiveShadow
                geometry={memoNodes.Ring.geometry}
                material={memoMaterials["Material.001"]}
                rotation={[-0.124, 0.123, -0.778]}
                scale={2}
              />
            ) : (
              <mesh
                ref={ringRef}
                castShadow
                receiveShadow
                rotation={[-0.124, 0.123, -0.778]}
                scale={2}
              >
                <torusGeometry args={[1.6, 0.12, 16, 100]} />
                <meshStandardMaterial
                  color="#6366f1"
                  emissive="#7c3aed"
                  emissiveIntensity={0.65}
                  metalness={1}
                  roughness={0.05}
                />
              </mesh>
            )}
          </>
        ) : (
          // Fallback: render the full GLB scene when node names differ from expected ones.
          memoScene && <primitive object={memoScene} />
        )}
      </group>
    </group>
  );
});

Planet.displayName = "Planet";
useGLTF.preload("/models/Planet.glb");
