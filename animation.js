document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('three-header');
  if (header) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, header.offsetWidth / header.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(header.offsetWidth, header.offsetHeight);
    header.insertBefore(renderer.domElement, header.firstChild);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const particleCount = 150;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40;
      positions[i + 1] = (Math.random() - 0.5) * 40;
      positions[i + 2] = (Math.random() - 0.5) * 40;
      
    // Cores brancas iluminadas e partículas redondas
    colors[i] = 1.0; // R
    colors[i + 1] = 1.0; // G
    colors[i + 2] = 1.0; // B
    positions[i] = Math.cos(Math.random() * Math.PI * 2) * 20; // X
    positions[i + 1] = Math.sin(Math.random() * Math.PI * 2) * 20; // Y
    positions[i + 2] = (Math.random() - 0.5) * 10; // Z
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particles);
    camera.position.z = 20;

    function animate() {
      requestAnimationFrame(animate);
      
      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] += (Math.random() - 0.5) * 0.1;
        positions[i + 1] += (Math.random() - 0.5) * 0.1;
        positions[i + 2] += (Math.random() - 0.5) * 0.1;
        
        // Manter partículas dentro de um limite
        if (Math.abs(positions[i]) > 20) positions[i] *= -0.5;
        if (Math.abs(positions[i + 1]) > 20) positions[i + 1] *= -0.5;
        if (Math.abs(positions[i + 2]) > 20) positions[i + 2] *= -0.5;
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    }
    
    animate();

    window.addEventListener('resize', function() {
      camera.aspect = header.offsetWidth / header.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(header.offsetWidth, header.offsetHeight);
    });
  }
});