import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

function DNAHelix() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const helixRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // ============================================================
      // THREE.JS SCENE SETUP
      // ============================================================
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera - orthographic, scaled for full viewport
      const aspectRatio = width / height;
      const viewHeight = 800;
      const viewWidth = viewHeight * aspectRatio;

      const camera = new THREE.OrthographicCamera(
        -viewWidth / 2,
        viewWidth / 2,
        viewHeight / 2,
        -viewHeight / 2,
        0.1,
        1000
      );
      camera.position.z = 300;

      // Renderer with transparent background
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rendererRef.current = renderer;
      container.appendChild(renderer.domElement);

      // ============================================================
      // DNA HELIX GEOMETRY - SCALED FOR 4K VIEWPORT
      // ============================================================
      const helix = new THREE.Group();
      helixRef.current = helix;
      scene.add(helix);

      const dnaConfig = {
        turns: 4.5,
        resolution: 200,
        radius: 120,
        height: 1200,
        scale: 1.5,
      };

      // Create strand paths
      const strandAPoints = [];
      const strandBPoints = [];
      const basePairLines = [];

      for (let i = 0; i <= dnaConfig.resolution; i++) {
        const progress = i / dnaConfig.resolution;
        const angle = progress * Math.PI * 2 * dnaConfig.turns;
        const y = -progress * dnaConfig.height + dnaConfig.height / 2;

        // Strand A (Cyan) - main phase
        const zA = Math.sin(angle);
        const xA = Math.cos(angle) * dnaConfig.radius;
        strandAPoints.push(new THREE.Vector3(xA, y, zA * 30));

        // Strand B (Violet) - opposite phase
        const angleB = angle + Math.PI;
        const zB = Math.sin(angleB);
        const xB = Math.cos(angleB) * dnaConfig.radius;
        strandBPoints.push(new THREE.Vector3(xB, y, zB * 30));

        // Base pairs at regular intervals
        if (i % 6 === 0 && i > 0) {
          basePairLines.push({
            start: new THREE.Vector3(xA, y, zA * 30),
            end: new THREE.Vector3(xB, y, zB * 30),
          });
        }
      }

      // ============================================================
      // STRANDS - LINE GEOMETRY
      // ============================================================
      const strandAGeometry = new THREE.BufferGeometry().setFromPoints(
        strandAPoints
      );
      const strandAMaterial = new THREE.LineBasicMaterial({
        color: 0xff00ff,
        linewidth: 8,
        transparent: true,
        opacity: 1,
      });
      const strandALine = new THREE.Line(strandAGeometry, strandAMaterial);
      helix.add(strandALine);

      const strandBGeometry = new THREE.BufferGeometry().setFromPoints(
        strandBPoints
      );
      const strandBMaterial = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        linewidth: 8,
        transparent: true,
        opacity: 1,
      });
      const strandBLine = new THREE.Line(strandBGeometry, strandBMaterial);
      helix.add(strandBLine);

      // ============================================================
      // BASE PAIRS - CONNECTING LINES
      // ============================================================
      const colorVariation = [0xff0088, 0x00ff88, 0xffff00, 0x00ffff, 0xff00ff];

      basePairLines.forEach((pair, idx) => {
        const pairGeometry = new THREE.BufferGeometry().setFromPoints([
          pair.start,
          pair.end,
        ]);
        const pairMaterial = new THREE.LineBasicMaterial({
          color: colorVariation[idx % colorVariation.length],
          linewidth: 4,
          transparent: true,
          opacity: 0.8,
        });
        const pairLine = new THREE.Line(pairGeometry, pairMaterial);
        helix.add(pairLine);
      });

      // ============================================================
      // NODES - SPHERE GEOMETRY
      // ============================================================
      const nodeGeometry = new THREE.SphereGeometry(6, 24, 24);
      const nodeAMaterial = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        transparent: true,
        opacity: 0.95,
        emissive: 0xff00ff,
        emissiveIntensity: 0.8,
      });
      const nodeBMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.95,
        emissive: 0x00ffff,
        emissiveIntensity: 0.8,
      });

      // Sample nodes from strands
      const nodeInterval = 6;
      strandAPoints.forEach((point, i) => {
        if (i % nodeInterval === 0) {
          const mesh = new THREE.Mesh(nodeGeometry, nodeAMaterial);
          mesh.position.copy(point);
          helix.add(mesh);
        }
      });

      strandBPoints.forEach((point, i) => {
        if (i % nodeInterval === 0) {
          const mesh = new THREE.Mesh(nodeGeometry, nodeBMaterial);
          mesh.position.copy(point);
          helix.add(mesh);
        }
      });

      // ============================================================
      // ANIMATION - Infinite Rotation via GSAP
      // ============================================================
      gsap.to(helix.rotation, {
        z: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // ============================================================
      // RENDER LOOP
      // ============================================================
      let animationId;

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      // ============================================================
      // WINDOW RESIZE HANDLER
      // ============================================================
      const onWindowResize = () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        renderer.setSize(newWidth, newHeight);
        
        const newAspectRatio = newWidth / newHeight;
        const newViewHeight = 800;
        const newViewWidth = newViewHeight * newAspectRatio;
        
        camera.left = -newViewWidth / 2;
        camera.right = newViewWidth / 2;
        camera.top = newViewHeight / 2;
        camera.bottom = -newViewHeight / 2;
        camera.updateProjectionMatrix();
      };

      window.addEventListener("resize", onWindowResize);

      // ============================================================
      // CLEANUP
      // ============================================================
      return () => {
        window.removeEventListener("resize", onWindowResize);
        cancelAnimationFrame(animationId);
        renderer.dispose();
        strandAGeometry.dispose();
        strandBGeometry.dispose();
        nodeGeometry.dispose();
        strandAMaterial.dispose();
        strandBMaterial.dispose();
        basePairMaterial.dispose();
        nodeAMaterial.dispose();
        nodeBMaterial.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      role="presentation"
      aria-hidden="true"
    />
  );
}

export default DNAHelix;
