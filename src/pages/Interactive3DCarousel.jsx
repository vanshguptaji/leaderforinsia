// import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

// const Interactive3DCarousel = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [slideDirection, setSlideDirection] = useState('right');
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [pendingSlide, setPendingSlide] = useState(null); // hold the target slide during animation
//   const [suppressTransition, setSuppressTransition] = useState(false); // when true, disable transform transition to snap
//   const ANIMATION_DURATION = 1400; // keep in sync with the timeout/duration used below

//   const slides = [
//     {
//       id: 0,
//       subtitle: "~ What guides us",
//       title: "We play the long game with urgency",
//       description: "Patience, discipline, and vision to bring new transformational medicines to life.",
//     image: "/img1.png"
//     },
//     {
//       id: 1,
//       subtitle: "~ What guides us", 
//       title: "We are relentless truth-seekers",
//       description: "Our seed-led investment model uncovers the most promising opportunities.",
//   image: "/img2.png"
//     },
//     {
//       id: 2,
//       subtitle: "~ What guides us",
//       title: "We understand the power of community",
//       description: "We prioritize a collaborative, science-first, patient-centric culture.",
//   image: "/img3.png"
//     },
//     {
//       id: 3,
//       subtitle: "~ What guides us",
//       title: "We keep people at the center",
//       description: "Every company, experiment, decision is guided by a singular goal - improving the lives of patients.",
//   image: "/mainPic.png"
//     }
//   ];

//   // Hexagon geometry — show 3 faces (left, center, right)
//   const FACES = 6; // fixed hexagon
//   const FACE_ANGLE = 360 / FACES; // 60deg
//   const STEP = 1; // rotate one face per click for predictable motion
//   const sceneRef = useRef(null);
//   const [panelWidthPx, setPanelWidthPx] = useState(560);
//   const [panelHeightPx, setPanelHeightPx] = useState(420);
//   const [rotationIndex, setRotationIndex] = useState(0); // counts faces moved
 

//   // Auto-play functionality
//   useEffect(() => {
//     if (!isAutoPlaying || isAnimating) return;
    
//     const interval = setInterval(() => {
//       handleNextSlide();
//     }, 5500); // Longer pause to accommodate slower animation

//     return () => clearInterval(interval);
//   }, [isAutoPlaying, isAnimating, currentSlide]);

//   const handlePrevSlide = () => {
//     if (isAnimating) return;
//     // ensure transition is enabled for the outgoing animation
//     setSuppressTransition(false);
//     setIsAutoPlaying(false);
//     setSlideDirection('left');
//     setIsAnimating(true);
//   const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
//   setPendingSlide(prevIndex);
//   // rotate wheel backward by one face
//   setRotationIndex((r) => r - 1);
//     // wait for animation to finish, then commit
//     setTimeout(() => {
//       // disable transition briefly so we can snap the 3-panel container back to center
//       setSuppressTransition(true);
//       setCurrentSlide(prevIndex);
//       setPendingSlide(null);
//       setIsAnimating(false);
//       // restore transitions shortly after snapping
//       setTimeout(() => setSuppressTransition(false), 40);
//     }, ANIMATION_DURATION);
//   };

//   const handleNextSlide = () => {
//     if (isAnimating) return;
//     // ensure transition is enabled for the outgoing animation
//     setSuppressTransition(false);
//     setIsAutoPlaying(false);
//     setSlideDirection('right');
//     setIsAnimating(true);
//     const nextIndex = (currentSlide + 1) % slides.length;
//     setPendingSlide(nextIndex);
//   // rotate wheel forward by one face
//   setRotationIndex((r) => r + 1);
//     // wait for animation to finish, then commit
//     setTimeout(() => {
//       // disable transition briefly so we can snap the 3-panel container back to center
//       setSuppressTransition(true);
//       setCurrentSlide(nextIndex);
//       setPendingSlide(null);
//       setIsAnimating(false);
//       // restore transitions shortly after snapping
//       setTimeout(() => setSuppressTransition(false), 40);
//     }, ANIMATION_DURATION);
//   };

//   const getPrevSlideIndex = (base = currentSlide) => (base - 1 + slides.length) % slides.length;
//   const getNextSlideIndex = (base = currentSlide) => (base + 1) % slides.length;

//   // Image translate/zIndex for enter/leave visual
//   // Scaling removed for smoother, non-zooming transitions — keep scale at 1
//   const SCALE_SIDE = 1;       // neutral scale
//   const SCALE_OUTGOING = 1;   // neutral
//   const SCALE_INCOMING = 1;   // neutral

//   let prevImgTranslate = '-12vw';
//   let currImgTranslate = '0vw';
//   let nextImgTranslate = '12vw';

//   let prevImgScale = SCALE_SIDE;
//   let currImgScale = 1;
//   let nextImgScale = SCALE_SIDE;

//   let prevZ = 10, currZ = 20, nextZ = 10;

//   if (isAnimating) {
//     if (slideDirection === 'right') {
//       // moving to next: current moves left/outgoing (shrinks), next grows into center
//       prevImgTranslate = '-20vw'; prevImgScale = SCALE_SIDE; prevZ = 5;
//       currImgTranslate = '-12vw'; currImgScale = SCALE_OUTGOING; currZ = 12;
//       nextImgTranslate = '0vw'; nextImgScale = SCALE_INCOMING; nextZ = 50;
//     } else {
//       // moving to prev: prev grows into center, current moves right/outgoing (shrinks)
//       prevImgTranslate = '0vw'; prevImgScale = SCALE_INCOMING; prevZ = 50;
//       currImgTranslate = '12vw'; currImgScale = SCALE_OUTGOING; currZ = 12;
//       nextImgTranslate = '20vw'; nextImgScale = SCALE_SIDE; nextZ = 5;
//     }
//   } else {
//     // resting: center is front
//     prevImgTranslate = '-8vw'; currImgTranslate = '0vw'; nextImgTranslate = '8vw';
//     prevImgScale = SCALE_SIDE; currImgScale = 1; nextImgScale = SCALE_SIDE;
//     prevZ = 10; currZ = 30; nextZ = 10;
//   }

//   const imageWrapperStyle = (translate, _scale, z) => ({
//     // only translate (no scale) for smooth pan-like transitions
//     transform: `translateX(${translate})`,
//     zIndex: z,
//     willChange: 'transform, opacity',
//     opacity: z >= 30 ? 1 : 0.72,
//     transition: suppressTransition ? 'none' : `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${ANIMATION_DURATION}ms ease-out`
//   });

//   // Measure scene/container to compute a good radius and panel size for the 3D octagon
//   useLayoutEffect(() => {
//     const measure = () => {
//       const node = sceneRef.current;
//       if (!node) return;
//       const w = node.clientWidth || window.innerWidth;
//       // panel should be a fraction of scene width and responsive
//       const panelW = Math.min(Math.round(w * 0.56), 880);
//       const panelH = Math.round(panelW * 0.66);
//       setPanelWidthPx(panelW);
//       setPanelHeightPx(panelH);
//     };
//     measure();
//     window.addEventListener('resize', measure);
//     return () => window.removeEventListener('resize', measure);
//   }, []);

//   // Preview card styles for left/right thumbnails
//   const PREVIEW_REST_SCALE = 0.9;
//   const PREVIEW_ACTIVE_SCALE = 1.04;
//   const PREVIEW_REST_OPACITY = 0.32;
//   const PREVIEW_ACTIVE_OPACITY = 1;

//   let previewLeftStyle = {
//     transform: `scale(${PREVIEW_REST_SCALE})`,
//     opacity: PREVIEW_REST_OPACITY,
//     transition: suppressTransition ? 'none' : `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${ANIMATION_DURATION}ms ease-out`,
//     willChange: 'transform, opacity'
//   };

//   let previewRightStyle = { ...previewLeftStyle };

//   if (isAnimating) {
//     if (slideDirection === 'right') {
//       // incoming is right preview
//       previewRightStyle = {
//         transform: `scale(${PREVIEW_ACTIVE_SCALE}) translateX(-6px)`,
//         opacity: PREVIEW_ACTIVE_OPACITY,
//         transition: suppressTransition ? 'none' : `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${ANIMATION_DURATION}ms ease-out`,
//         willChange: 'transform, opacity'
//       };
//       previewLeftStyle = {
//         transform: `scale(${PREVIEW_REST_SCALE * 0.92}) translateX(0px)`,
//         opacity: 0.18,
//         transition: suppressTransition ? 'none' : `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${ANIMATION_DURATION}ms ease-out`,
//         willChange: 'transform, opacity'
//       };
//     } else {
//       // incoming is left preview
//       previewLeftStyle = {
//         transform: `scale(${PREVIEW_ACTIVE_SCALE}) translateX(6px)`,
//         opacity: PREVIEW_ACTIVE_OPACITY,
//         transition: suppressTransition ? 'none' : `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${ANIMATION_DURATION}ms ease-out`,
//         willChange: 'transform, opacity'
//       };
//       previewRightStyle = {
//         transform: `scale(${PREVIEW_REST_SCALE * 0.92}) translateX(0px)`,
//         opacity: 0.18,
//         transition: suppressTransition ? 'none' : `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${ANIMATION_DURATION}ms ease-out`,
//         willChange: 'transform, opacity'
//       };
//     }
//   }

//   return (
//     <section className="min-h-screen bg-slate-900 flex items-center overflow-hidden relative">
//       {/* Sliding Container */}
//       <div className="w-full relative">
//         <div className="relative h-screen flex items-center">
          
//           {/* 3D Octagon Carousel Scene */}
//           <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8 lg:px-16">
//             <div ref={sceneRef} className="w-full h-full flex items-center justify-center relative" style={{ perspective: '1400px' }}>
//               {/* subtle backdrop ring to ground the octagon */}
//               <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: panelWidthPx * 1.25, height: panelHeightPx * 0.6, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(16,24,39,0.6), transparent)', filter: 'blur(28px)', pointerEvents: 'none' }} />
//               {/* octagon "wheel" - we translate it back by radius so faces sit at outer shell */}
//               {(() => {
//                 const radius = Math.max(120, Math.round(panelWidthPx / (2 * Math.tan(Math.PI / FACES))));
//                 const rotationDeg = -(rotationIndex * FACE_ANGLE); // negative to rotate forward on next
//                 const octagonStyle = {
//                   width: panelWidthPx,
//                   height: panelHeightPx,
//                   transformStyle: 'preserve-3d',
//                   transform: `translateZ(-${radius}px) rotateY(${rotationDeg}deg)`,
//                   transition: suppressTransition ? 'none' : `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`
//                 };

//                 // compute center face index from rotationIndex
//                 const centerFace = ((rotationIndex % FACES) + FACES) % FACES;
//                 const visibleFaces = [centerFace - 1, centerFace, centerFace + 1].map(i => ((i % FACES) + FACES) % FACES);

//                 return (
//                   <div
//                     style={{
//                       position: 'absolute',
//                       left: '50%',
//                       top: '50%',
//                       width: panelWidthPx,
//                       height: panelHeightPx,
//                       transformStyle: 'preserve-3d',
//                       transform: `translate(-50%,-50%) translateZ(-${radius}px) rotateY(${rotationDeg}deg)`,
//                       transition: suppressTransition ? 'none' : `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`
//                     }}
//                   >
//                     {visibleFaces.map((faceIdx, idx) => {
//                       const angle = faceIdx * FACE_ANGLE;

//                       // determine which logical slide should appear on this face using offsets [-1,0,1]
//                       const logicalCenterSlide = pendingSlide ?? currentSlide;
//                       const relOffset = idx - 1; // idx 0 => -1 (left), 1 => 0 (center), 2 => +1 (right)
//                       const slideIndex = ((logicalCenterSlide + relOffset) % slides.length + slides.length) % slides.length;
//                       const slide = slides[slideIndex];

//                       // compute if this face is the very front (center)
//                       const raw = ((angle + rotationIndex * FACE_ANGLE) % 360 + 360) % 360;
//                       const offset = Math.min(Math.abs(raw), 360 - Math.abs(raw));
//                       const isFront = offset < (FACE_ANGLE / 2 + 6);

//                       const faceStyle = {
//                         position: 'absolute',
//                         left: '50%',
//                         top: '50%',
//                         width: panelWidthPx,
//                         height: panelHeightPx,
//                         transform: `rotateY(${angle}deg) translateZ(${radius}px) translateX(-50%) translateY(-50%) scale(${isFront ? 1.04 : 0.98})`,
//                         transformOrigin: 'center center',
//                         borderRadius: '1rem',
//                         overflow: 'hidden',
//                         backfaceVisibility: 'hidden',
//                         boxShadow: isFront ? '0 44px 90px rgba(2,6,23,0.78)' : '0 18px 40px rgba(2,6,23,0.5)',
//                         background: isFront ? 'linear-gradient(180deg,#0b1220,#07101a)' : 'linear-gradient(180deg,#0f1724,#0b1220)',
//                         opacity: isFront ? 1 : 0.7,
//                         transition: suppressTransition ? 'none' : `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${ANIMATION_DURATION}ms ease-out, box-shadow ${ANIMATION_DURATION}ms ease-out`
//                       };

//                       const gridClass = isFront
//                         ? 'grid grid-cols-1 lg:grid-cols-2 gap-6 items-center w-full h-full p-6 justify-center'
//                         : 'grid grid-cols-1 lg:grid-cols-2 gap-6 items-center w-full h-full p-6';
//                       const textClass = isFront
//                         ? 'text-white max-w-2xl mx-auto text-center'
//                         : 'text-white max-w-md mx-auto lg:mx-0';

//                       return (
//                         <div key={`face-${faceIdx}`} style={faceStyle} className="flex items-center justify-center">
//                           <div className={gridClass}>
//                             <div className={textClass}>
//                               <div className="text-base text-emerald-400 mb-3 font-normal tracking-wide">{slide.subtitle}</div>
//                               <h3 className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight mb-4">{slide.title}</h3>
//                               <p className="text-sm md:text-base text-white/80 font-light">{slide.description}</p>
//                             </div>
//                             <div className="w-full flex items-center justify-center">
//                               <img src={slide.image} alt={slide.title} className="w-full max-w-sm md:max-w-md h-44 md:h-56 lg:h-64 object-cover rounded-xl" onError={(e)=>{e.target.style.display='none'}} />
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 );
//               })()}
//             </div>
//           </div>

//                         {/* Side Preview Cards - keep visible so left/right are constant */}
//           <>
//               {/* Previous Slide Preview - Left Side */}
//               <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 opacity-30 transition-all duration-500 hover:opacity-60">
//                 <div style={previewLeftStyle} className="w-48 md:w-64 lg:w-80 h-32 md:h-40 lg:h-48 rounded-r-2xl overflow-hidden shadow-xl cursor-pointer transform transition-transform duration-500 hover:scale-105" onClick={handlePrevSlide}>
//                   <img 
//                     src={slides[getPrevSlideIndex()].image} 
//                     alt={slides[getPrevSlideIndex()].title}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.src = '/logo.png';
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center backdrop-blur-sm">
//                     <div className="text-white text-center px-4">
//                       <div className="text-xs md:text-sm text-emerald-400 mb-1 opacity-90">{slides[getPrevSlideIndex()].subtitle}</div>
//                       <h3 className="text-sm md:text-base lg:text-lg font-light leading-tight opacity-95">{slides[getPrevSlideIndex()].title}</h3>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Next Slide Preview - Right Side */}
//               <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 opacity-30 transition-all duration-500 hover:opacity-60">
//                 <div style={previewRightStyle} className="w-48 md:w-64 lg:w-80 h-32 md:h-40 lg:h-48 rounded-l-2xl overflow-hidden shadow-xl cursor-pointer transform transition-transform duration-500 hover:scale-105" onClick={handleNextSlide}>
//                   <img 
//                     src={slides[getNextSlideIndex()].image} 
//                     alt={slides[getNextSlideIndex()].title}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.src = '/logo.png';
//                     }}
//                   />
//                   <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center backdrop-blur-sm">
//                     <div className="text-white text-center px-4">
//                       <div className="text-xs md:text-sm text-emerald-400 mb-1 opacity-90">{slides[getNextSlideIndex()].subtitle}</div>
//                       <h3 className="text-sm md:text-base lg:text-lg font-light leading-tight opacity-95">{slides[getNextSlideIndex()].title}</h3>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>

//           {/* Background Gradient Overlays */}
//           <div className="absolute inset-0 pointer-events-none z-5">
//             <div className="absolute left-0 top-0 w-1/12 h-full bg-gradient-to-r from-slate-900 via-slate-900/30 to-transparent"></div>
//             <div className="absolute right-0 top-0 w-1/12 h-full bg-gradient-to-l from-slate-900 via-slate-900/30 to-transparent"></div>
//           </div>
//         </div>

//         {/* Navigation Controls */}
//         <div className="absolute bottom-8 md:bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-8 md:gap-12 z-20">
//           {/* Previous Button */}
//           <button 
//             className="group bg-white/10 border border-white/20 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center cursor-pointer transition-all duration-500 text-white/70 backdrop-blur-xl relative overflow-hidden transform hover:scale-110 hover:bg-white/20 hover:border-white/40 hover:text-white active:scale-105"
//             onClick={handlePrevSlide}
//             aria-label="Previous slide"
//             disabled={isAnimating}
//           >
//             <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-all duration-500 group-hover:scale-110 relative z-10">
//               <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </button>

//           {/* Progress Bar */}
//           <div className="w-48 md:w-80 lg:w-96 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
//             <div 
//               className="h-full bg-gradient-to-r from-emerald-400 to-white rounded-full origin-left transition-all duration-300"
//               style={{ 
//                 transform: `scaleX(${(currentSlide + 1) / slides.length})`,
//                 transition: isAutoPlaying ? 'transform 4s linear' : 'transform 0.3s ease-out'
//               }}
//             ></div>
//           </div>

//           {/* Next Button */}
//           <button 
//             className="group bg-white/10 border border-white/20 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center cursor-pointer transition-all duration-300 text-white/70 backdrop-blur-xl relative overflow-hidden transform hover:scale-110 hover:bg-white/20 hover:border-white/40 hover:text-white active:scale-105"
//             onClick={handleNextSlide}
//             aria-label="Next slide"
//             disabled={isAnimating}
//           >
//             <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-all duration-300 group-hover:scale-110 relative z-10">
//               <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Interactive3DCarousel;



import React, { useState, useEffect } from 'react';

const Interactive3DCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState('next');
  const ANIMATION_DURATION = 800;

  const slides = [
    {
      id: 0,
      subtitle: "~ What guides us",
      title: "We play the long game with urgency",
      description: "Patience, discipline, and vision to bring new transformational medicines to life.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 1,
      subtitle: "~ What guides us", 
      title: "We are relentless truth-seekers",
      description: "Our seed-led investment model uncovers the most promising opportunities.",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2125&q=80"
    },
    {
      id: 2,
      subtitle: "~ What guides us",
      title: "We understand the power of community",
      description: "We prioritize a collaborative, science-first, patient-centric culture.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80"
    },
    {
      id: 3,
      subtitle: "~ What guides us",
      title: "We keep people at the center",
      description: "Every company, experiment, decision is guided by a singular goal - improving the lives of patients.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isAnimating) return;
    
    const interval = setInterval(() => {
      handleNextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isAnimating, currentSlide]);

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAutoPlaying(false);
    setSlideDirection('next');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, ANIMATION_DURATION);
  };

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAutoPlaying(false);
    setSlideDirection('prev');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsAnimating(false);
    }, ANIMATION_DURATION);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAutoPlaying(false);
    
    const direction = index > currentSlide ? 'next' : 'prev';
    setSlideDirection(direction);
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, ANIMATION_DURATION);
  };

  // Get slide indices
  const getPrevSlideIndex = () => (currentSlide - 1 + slides.length) % slides.length;
  const getNextSlideIndex = () => (currentSlide + 1) % slides.length;

  // Calculate slide positions for continuous effect with previews
  const getSlideStyle = (slideIndex) => {
    const isCurrentSlide = slideIndex === currentSlide;
    const isPrevSlide = slideIndex === getPrevSlideIndex();
    const isNextSlide = slideIndex === getNextSlideIndex();
    
    let translateX = '120%'; // Default: far off-screen
    let opacity = 0;
    let scale = 0.7;
    let zIndex = 1;

    if (isCurrentSlide) {
      if (isAnimating) {
        if (slideDirection === 'next') {
          translateX = '-120%'; // Exit left
          opacity = 0;
          scale = 0.7;
        } else {
          translateX = '120%'; // Exit right
          opacity = 0;
          scale = 0.7;
        }
      } else {
        translateX = '0%'; // Center
        opacity = 1;
        scale = 1;
        zIndex = 10;
      }
    } else if (isPrevSlide) {
      if (isAnimating && slideDirection === 'prev') {
        translateX = '0%'; // Enter from left to center
        opacity = 1;
        scale = 1;
        zIndex = 10;
      } else {
        translateX = '-70%'; // Preview position on left
        opacity = 0.6;
        scale = 0.75;
        zIndex = 5;
      }
    } else if (isNextSlide) {
      if (isAnimating && slideDirection === 'next') {
        translateX = '0%'; // Enter from right to center
        opacity = 1;
        scale = 1;
        zIndex = 10;
      } else {
        translateX = '70%'; // Preview position on right
        opacity = 0.6;
        scale = 0.75;
        zIndex = 5;
      }
    }

    return {
      transform: `translateX(${translateX}) scale(${scale})`,
      opacity,
      zIndex,
      transition: `all ${ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    };
  };

  const SlideContent = ({ slide, isPreview = false }) => (
    <div 
      className={`relative w-full h-full rounded-3xl overflow-hidden ${
        isPreview 
          ? 'bg-slate-800/40 backdrop-blur-md border border-white/10' 
          : 'bg-slate-900/95 backdrop-blur-xl border border-white/20'
      }`}
      style={{
        boxShadow: isPreview 
          ? '0 20px 50px rgba(0, 0, 0, 0.4)' 
          : '0 30px 80px rgba(0, 0, 0, 0.6), 0 0 120px rgba(59, 130, 246, 0.03)',
      }}
    >
      {/* Main slide content */}
      {!isPreview ? (
        <div className="grid lg:grid-cols-2 gap-8 items-center h-full p-8 md:p-16">
          
          {/* Text Content - Left Side */}
          <div className="text-white space-y-8 order-2 lg:order-1">
            <div className="text-cyan-400 font-medium tracking-wider text-lg">
              {slide.subtitle}
            </div>
            
            <h2 className="font-light leading-tight text-4xl md:text-5xl lg:text-6xl">
              {slide.title}
            </h2>
            
            <p className="text-xl text-white/70 leading-relaxed font-light max-w-lg">
              {slide.description}
            </p>
          </div>

          {/* Image Content - Right Side */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-full max-w-2xl h-96 md:h-[500px]">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover rounded-2xl"
              />
              {/* Image overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-900/20 via-transparent to-slate-900/30"></div>
            </div>
          </div>
        </div>
      ) : (
        // Preview slide content
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <div className="relative w-full max-w-sm h-48 mb-4">
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover rounded-xl opacity-80"
            />
          </div>
          
          <div className="text-cyan-400 font-medium text-sm mb-2">
            {slide.subtitle}
          </div>
          
          <h3 className="font-light text-white text-lg leading-tight">
            {slide.title}
          </h3>
        </div>
      )}

      {/* Inner glow border */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none"></div>
    </div>
  );

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden relative">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-slate-700/20 rounded-full blur-[80px] transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* Atlas Venture branding */}
      <div className="absolute top-8 left-8 z-20">
        <div className="text-cyan-400 text-lg font-medium tracking-wide">
          novel medicines.
        </div>
      </div>

      {/* Enhanced edge gradients for smoother transitions */}
      <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent z-[15] pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-slate-950 via-slate-950/90 to-transparent z-[15] pointer-events-none"></div>

      {/* Slider Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 h-[700px]">
          
          {/* Slides Stack */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => {
              const isCurrentSlide = index === currentSlide;
              const isPrevSlide = index === getPrevSlideIndex();
              const isNextSlide = index === getNextSlideIndex();
              const shouldRender = isCurrentSlide || isPrevSlide || isNextSlide;
              
              if (!shouldRender) return null;

              const isPreview = isPrevSlide || isNextSlide;

              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full ${isPreview ? 'cursor-pointer hover:scale-105' : ''} transition-transform duration-300`}
                  style={getSlideStyle(index)}
                  onClick={isPreview ? (isPrevSlide ? handlePrevSlide : handleNextSlide) : undefined}
                >
                  <SlideContent slide={slide} isPreview={isPreview} />
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Enhanced Navigation Controls */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-10">
          
          {/* Previous Button */}
          <button 
            className="group bg-white/5 hover:bg-white/15 border border-white/20 hover:border-white/40 rounded-full w-16 h-16 flex items-center justify-center backdrop-blur-xl transition-all duration-500 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handlePrevSlide}
            disabled={isAnimating}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/70 group-hover:text-white transition-colors duration-300">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="flex items-center gap-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  transition-all duration-500 transform rounded-full
                  ${index === currentSlide 
                    ? 'w-12 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 scale-110 shadow-lg shadow-cyan-400/50' 
                    : 'w-3 h-3 bg-white/25 hover:bg-white/50 hover:scale-125'
                  }
                `}
                disabled={isAnimating}
              />
            ))}
          </div>

          {/* Next Button */}
          <button 
            className="group bg-white/5 hover:bg-white/15 border border-white/20 hover:border-white/40 rounded-full w-16 h-16 flex items-center justify-center backdrop-blur-xl transition-all duration-500 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handleNextSlide}
            disabled={isAnimating}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/70 group-hover:text-white transition-colors duration-300">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Minimalist Progress Bar */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-96 h-0.5 bg-white/10 rounded-full overflow-hidden z-20">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-700 ease-out"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>
    </section>
  );
};

export default Interactive3DCarousel;