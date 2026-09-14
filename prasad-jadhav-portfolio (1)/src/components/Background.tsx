import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const Background: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Orbit Controls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.maxDistance = 10;
    controls.minDistance = 2;

    // Graph Data
    const nodesCount = 100;
    const nodes: THREE.Vector3[] = [];
    const velocities: THREE.Vector3[] = [];
    
    for (let i = 0; i < nodesCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      nodes.push(pos);
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005
      ));
    }

    // Nodes (Points)
    const nodeGeometry = new THREE.BufferGeometry().setFromPoints(nodes);
    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x007aff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodePoints);

    // Edges (Lines)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x007aff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(nodesCount * nodesCount * 3);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      // Update node positions
      const positions = nodeGeometry.attributes.position.array as Float32Array;
      const linePos = lineGeometry.attributes.position.array as Float32Array;
      let lineIndex = 0;

      for (let i = 0; i < nodesCount; i++) {
        nodes[i].add(velocities[i]);

        // Bounce off boundaries
        if (Math.abs(nodes[i].x) > 4) velocities[i].x *= -1;
        if (Math.abs(nodes[i].y) > 4) velocities[i].y *= -1;
        if (Math.abs(nodes[i].z) > 4) velocities[i].z *= -1;

        positions[i * 3] = nodes[i].x;
        positions[i * 3 + 1] = nodes[i].y;
        positions[i * 3 + 2] = nodes[i].z;
      }
      nodeGeometry.attributes.position.needsUpdate = true;

      // Update edges
      for (let i = 0; i < nodesCount; i++) {
        for (let j = i + 1; j < nodesCount; j++) {
          const dist = nodes[i].distanceTo(nodes[j]);
          if (dist < 2) {
            linePos[lineIndex++] = nodes[i].x;
            linePos[lineIndex++] = nodes[i].y;
            linePos[lineIndex++] = nodes[i].z;
            linePos[lineIndex++] = nodes[j].x;
            linePos[lineIndex++] = nodes[j].y;
            linePos[lineIndex++] = nodes[j].z;
          }
        }
      }
      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;

      controls.update();
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 bg-black"
      style={{ 
        maskImage: 'radial-gradient(circle at center, black, transparent 90%)',
        cursor: 'grab'
      }}
    />
  );
};
