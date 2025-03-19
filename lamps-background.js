// lamps-background.js
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const lampsSection = document.querySelector('lamps .section');
    
    // Create logo grid container
    const logoGrid = document.createElement('div');
    Object.assign(logoGrid.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '25px',
      padding: '25px',
      pointerEvents: 'none',
      zIndex: '0',
      overflow: 'hidden',
      justifyContent: 'center',
      alignContent: 'center',
      justifyItems: 'center',
      alignItems: 'center',
      boxSizing: 'border-box'
    });

    // Prevent body overflow
    document.body.style.overflowX = 'hidden';
    document.body.style.width = '100vw';

    // Load SVG content
    const response = await fetch('./assets/logo.svg');
    const svgText = await response.text();
    
    // Size parameters
    const logoSize = 180;

    // Calculate grid dimensions
    const calculateGrid = () => {
      const containerWidth = lampsSection.offsetWidth - 50;
      const containerHeight = lampsSection.offsetHeight - 50;
      
      const columns = Math.max(2, Math.floor(containerWidth / 200));
      const rows = Math.max(2, Math.floor(containerHeight / 200));
      
      return { columns, rows };
    };

    // Animate opacity for a single logo
    const animateLogo = (logo) => {
      const minDuration = 300; // 3 seconds
      const maxDuration = 800; // 8 seconds
      const duration = Math.random() * (maxDuration - minDuration) + minDuration;
      
      // Set random target opacity
      const targetOpacity = Math.random() * 0.1;
      
      // Animate with random easing
      logo.style.transition = `opacity ${duration}ms cubic-bezier(${Math.random().toFixed(2)}, ${Math.random().toFixed(2)}, ${Math.random().toFixed(2)}, ${Math.random().toFixed(2)})`;
      logo.style.opacity = targetOpacity.toFixed(2);
      
      // Queue next animation
      setTimeout(() => animateLogo(logo), duration + Math.random() * 2000);
    };

    // Create logo grid with animations
    const createLogoGrid = () => {
      logoGrid.innerHTML = '';
      const { columns, rows } = calculateGrid();
      
      for(let i = 0; i < columns * rows; i++) {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const logo = svgDoc.documentElement.cloneNode(true);
        
        // Random initial properties
        if(Math.random() < 0.33) logo.style.transform = 'scaleY(-1)';
        logo.style.opacity = (Math.random() * 0.2).toFixed(2);

        Object.assign(logo.style, {
          width: `${logoSize}px`,
          height: `${logoSize}px`,
          pointerEvents: 'none',
          userSelect: 'none',
        });

        logoGrid.appendChild(logo);
        animateLogo(logo); // Start animation
      }
    };

    // Handle window resize
    const handleResize = () => {
      createLogoGrid();
      document.body.style.overflowX = 'hidden';
    };

    // Initial setup
    lampsSection.style.position = 'relative';
    lampsSection.style.overflow = 'hidden';
    lampsSection.insertBefore(logoGrid, lampsSection.firstChild);
    createLogoGrid();
    window.addEventListener('resize', handleResize);

  } catch (error) {
    console.error('Error creating logo grid:', error);
  }
});