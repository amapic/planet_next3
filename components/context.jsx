import React, {
    useState,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useLayoutEffect,
  } from "react";
  import gsap from "gsap";
  // import { Box } from "theme-ui";
  import { Canvas, useLoader, useFrame } from "@react-three/fiber";
  import { Float } from "@react-three/drei";
  
  const TransitionContext = createContext({});
  
  const TransitionProvider = ({ children }) => {
    const [timeline, setTimeline] = useState(() =>
      gsap.timeline({ paused: true })
    );
  
    return (
      <TransitionContext.Provider
        value={{
          timeline,
          setTimeline,
        }}
      >
        {children}
      </TransitionContext.Provider>
    );
  };
  
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;
  
  export function TransitionLayout({ children }) {
    const [displayChildren, setDisplayChildren] = useState(children);
    const { timeline, background } = useContext(TransitionContext);
    const el = useRef();
  
    useIsomorphicLayoutEffect(() => {
      if (children !== displayChildren) {
        if (timeline.duration() === 0) {
          // there are no outro animations, so immediately transition
          setDisplayChildren(children);
        } else {
          timeline.play().then(() => {
            // outro complete so reset to an empty paused timeline
            timeline.seek(0).pause().clear();
            setDisplayChildren(children);
          });
        }
      }
    }, [children]);
  
    useIsomorphicLayoutEffect(() => {
      gsap.to(el.current, {
        background,
        duration: 1,
      });
    }, [background]);
  
    return <div ref={el}>{displayChildren}</div>;
  }
  
  export const FadeInOut = ({ children }) => {
    const { timeline } = useContext(TransitionContext);
    const el = useRef();
  
    // useIsomorphicLayoutEffect to avoid console warnings
    useIsomorphicLayoutEffect(() => {
      // intro animation will play immediately
      let tween = gsap.to(el.current, {
        opacity: 1,
        duration: 1,
      });
  
      // add outro animation to top-level outro animation timeline
      // timeline.add(
      //   gsap.to(el.current, {
      //     opacity: 0,
      //     duration: 0.5,
      //   }),
      //   0
      // );
  
      // let tween = gsap.to(el.current, {
  
      //   opacity: 0,
      //   duration: 3,
      // });
  
      tween.pause();
  
      setTimeout(() => {
        tween.play();
      }, 5000);
    }, []);
  
    // set initial opacity to 0 to avoid FOUC for SSR
    return (
      <>
        {/* <Box ref={el} sx={{ opacity: 0 }}> */}
          {children}
        {/* </Box> */}
      </>
    );
  };
  
  export const AnimateInOut = ({
    children,
    as,
    from,
    to,
    durationIn,
    durationOut,
    delay,
    delayOut,
    set,
    skipOutro,
  }) => {
    const { timeline } = useContext(TransitionContext);
    const el = useRef();
  
    // useIsomorphicLayoutEffect(() => {
    //   // intro animation
    //   if (set) {
    //     gsap.set(el.current, { ...set });
    //   }
    //   gsap.to(el.current, {
    //     ...to,
    //     delay: delay || 0,
    //     duration: durationIn,
    //   });
  
    //   // outro animation
    //   if (!skipOutro) {
    //     timeline.add(
    //       gsap.to(el.current, {
    //         ...from,
    //         delay: delayOut || 0,
    //         duration: durationOut,
    //       }),
    //       0
    //     );
    //   }
    // }, []);
  
    useIsomorphicLayoutEffect(() => {
      // intro animation will play immediately
      gsap.to(el.current, {
        opacity: 0,
        duration: 1,
      });
  
      // add outro animation to top-level outro animation timeline
      timeline.add(
        gsap.to(el.current, {
          opacity: 1,
          duration: 0.5,
        }),
        0
      );
    }, []);
  
    return (
      <Box as={as} sx={from} ref={el}>
        {children}
      </Box>
    );
  };
  
  export default TransitionProvider;
  
  export function CuubeCanvas() {
    const el = useRef();
  
    useIsomorphicLayoutEffect(() => {
      // intro animation will play immediately
      let tween = gsap.to(el.current, {
        opacity: 0,
        duration: 1,
      });
  
      tween.pause();
  
      setTimeout(() => {
        tween.play();
      }, 5000);
  
      // add outro animation to top-level outro animation timeline
      // timeline.add(
      //   gsap.to(el.current, {
      //     opacity: 1,
      //     duration: 0.5,
      //   }),
      //   0
      // );
    }, []);
  
    return (
      <div
        ref={el}
        style={{
          background: "black",
          height: "100vh",
          width: "100vw",
          position: "fixed",
        }}
      >
        <Canvas
          gl={{ antialias: false }}
          camera={{
            near: 0.1,
            far: 50,
            zoom: 1,
            position: [4, 4, 4],
            maxPolarAngle: 0.85,
          }}
        >
          <ambientLight intensity={0.3} />
          <spotLight position={[10, 10, 10]} angle={45} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Cuube />
        </Canvas>
      </div>
    );
  }
  
  export function Cuube() {
    const cube = useRef();
    useFrame(({ clock }) => {
      cube.current.rotation.x +=0.01;
      cube.current.rotation.y += 0.01;
      cube.current.rotation.z += 0.01;
    });
  
    return (
      <Float
        speed={2} // Animation speed, defaults to 1
        rotationIntensity={1} // XYZ rotation intensity, defaults to 1
        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <mesh ref={cube}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </Float>
    );
  }
  