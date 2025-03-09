"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { lazy, useEffect, useMemo, useRef, useState } from "react";
import animationData from "./assets/click-guide-lottie.json";
import HeartBurst, { HeartBurstRef } from "./components/HeartBurst";
import IntroText from "./components/IntroText";
import LastBackground from "./components/LastBackground";
import { assets, LAST_IMAGE_URL } from "./constants";
import { useIsClient } from "./hooks/use-is-client";

const LazyLottieComponent = lazy(() => import("lottie-react"));

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(
    new Set()
  );

  // 이미지 프리로드 함수
  const preloadImage = (src: string) => {
    // 이미 프리로드된 이미지는 건너뜀
    if (preloadedImages.has(src)) {
      return;
    }

    // 프리로드된 이미지 목록에 추가
    setPreloadedImages((prev) => new Set(prev).add(src));
  };

  // 미래에 표시될 이미지 프리로드
  useEffect(() => {
    // 현재 인덱스 + 10까지 미리 로드 (최대 배열 길이까지)
    const preloadCount = 10;
    for (
      let i = currentIndex + 1;
      i <= Math.min(currentIndex + preloadCount, assets.length - 1);
      i++
    ) {
      if (assets[i]) {
        preloadImage(assets[i]);
      }
    }
  }, [currentIndex]);

  const isClient = useIsClient();

  const heartBurstRef = useRef<HeartBurstRef>(null);
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [showClickGuideState, setShowClickGuide] = useState(true);
  const showClickGuide = useMemo(() => {
    return isIntroFinished && showClickGuideState;
  }, [isIntroFinished, showClickGuideState]);

  // Long press state and timer refs
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isPressingRef = useRef(false);
  const [showLastItem, setShowLastItem] = useState(false);

  console.log(showLastItem);
  // Function to handle burst effect and index increment
  const handleBurstEffect = (x: number, y: number) => {
    if (currentIndex >= assets.length - 1) {
      setShowLastItem(true);
      return;
    }

    heartBurstRef.current?.burst(x, y);

    if (showClickGuide) {
      setShowClickGuide(false);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  // 표시할 이미지 준비
  const visibleImages = assets.slice(0, currentIndex + 1);
  const startDisplayIndex = Math.max(0, currentIndex - 5);
  const displayImages = visibleImages.slice(startDisplayIndex);

  return (
    <div className="min-h-dvh">
      <main className="bg-[#0b0b0b] h-full">
        <div className="relative w-full">
          <div
            className="sticky top-0 h-dvh flex items-center justify-center overflow-hidden"
            onClick={(e) => {
              if (!isIntroFinished) {
                return;
              }

              // Regular click handling (for non-long press clicks)
              if (!isPressingRef.current) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                handleBurstEffect(x, y);
              }
            }}
            onMouseDown={() => {
              if (!isIntroFinished) return;

              isPressingRef.current = false;

              // Start long press timer
              longPressTimerRef.current = setTimeout(() => {
                isPressingRef.current = true;

                const x = Math.random() * 100;
                const y = Math.random() * 100;
                // Initial burst when long press is activated
                handleBurstEffect(x, y);

                // Start interval for continuous bursts
                intervalTimerRef.current = setInterval(() => {
                  const x = Math.random() * 100;
                  const y = Math.random() * 100;
                  handleBurstEffect(x, y);
                }, 500);
              }, 300); // Wait 300ms to consider it a long press
            }}
            onMouseUp={() => {
              // Clear all timers when mouse is released
              if (longPressTimerRef.current) {
                clearTimeout(longPressTimerRef.current);
                longPressTimerRef.current = null;
              }
              if (intervalTimerRef.current) {
                clearInterval(intervalTimerRef.current);
                intervalTimerRef.current = null;
              }
              isPressingRef.current = false;
            }}
            onMouseLeave={() => {
              // Also clear timers when mouse leaves the area
              if (longPressTimerRef.current) {
                clearTimeout(longPressTimerRef.current);
                longPressTimerRef.current = null;
              }
              if (intervalTimerRef.current) {
                clearInterval(intervalTimerRef.current);
                intervalTimerRef.current = null;
              }
              isPressingRef.current = false;
            }}
            onTouchStart={() => {
              if (!isIntroFinished) return;

              isPressingRef.current = false;

              // Start long press timer for touch
              longPressTimerRef.current = setTimeout(() => {
                isPressingRef.current = true;

                const x = Math.random() * 100;
                const y = Math.random() * 100;
                handleBurstEffect(x, y);

                // Start interval for continuous bursts
                intervalTimerRef.current = setInterval(() => {
                  const x = Math.random() * 100;
                  const y = Math.random() * 100;
                  handleBurstEffect(x, y);
                }, 500);
              }, 300);
            }}
            onTouchEnd={() => {
              // Clear timers on touch end
              if (longPressTimerRef.current) {
                clearTimeout(longPressTimerRef.current);
                longPressTimerRef.current = null;
              }
              if (intervalTimerRef.current) {
                clearInterval(intervalTimerRef.current);
                intervalTimerRef.current = null;
              }
              isPressingRef.current = false;
            }}
            onTouchCancel={() => {
              // Clear timers on touch cancel
              if (longPressTimerRef.current) {
                clearTimeout(longPressTimerRef.current);
                longPressTimerRef.current = null;
              }
              if (intervalTimerRef.current) {
                clearInterval(intervalTimerRef.current);
                intervalTimerRef.current = null;
              }
              isPressingRef.current = false;
            }}
          >
            <AnimatePresence>
              {showClickGuide && (
                <motion.div
                  className="flex items-center justify-center absolute top-0 left-0 bottom-0 right-0 pointer-events-none"
                  exit={{
                    opacity: 0,
                  }}
                >
                  <div className="h-[100px] w-[100px]">
                    <LazyLottieComponent
                      animationData={animationData}
                      color="white"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {isClient &&
              !showClickGuide &&
              isIntroFinished &&
              !showLastItem && (
                <div className="relative flex items-center justify-center h-full w-full">
                  <AnimatePresence>
                    {displayImages.map((img, index) => {
                      const actualIndex = startDisplayIndex + index;
                      const isLatestImage = actualIndex === currentIndex;

                      // Framer Motion에서 사용할 랜덤 값 계산
                      const randomX = (Math.random() - 0.5) * 150;
                      const randomY = (Math.random() - 0.5) * 30;
                      const randomRotation = (Math.random() - 0.5) * 20;

                      return (
                        <motion.div
                          key={img}
                          className="absolute max-h-[80%] origin-center"
                          style={{ zIndex: actualIndex }}
                          // 최신 이미지에만 애니메이션 적용
                          initial={
                            isLatestImage
                              ? {
                                  x: `${randomX}%`,
                                  y: `${randomY}%`,
                                  rotate: randomRotation,
                                  scaleX: 1.05,
                                  scaleY: 1.2,
                                }
                              : {}
                          }
                          animate={{
                            scaleX: 1,
                            scaleY: 1,
                          }}
                          transition={{
                            duration: 0.15,
                            ease: [0.25, 0.1, 0.25, 1], // power4.out와 비슷한 이징
                          }}
                        >
                          <Image
                            src={`${img}?version=0`}
                            alt={`Stack image ${actualIndex + 1}`}
                            className="w-[50vw] md:w-[20vw] h-auto object-contain rounded-lg shadow-xl select-none"
                            draggable={false}
                            width={200}
                            height={200}
                            unoptimized
                          />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            {showLastItem && (
              <>
                <LastBackground />
                <motion.div
                  className="absolute max-h-[80%] origin-center"
                  // 최신 이미지에만 애니메이션 적용
                  initial={{
                    x: 0,
                    y: 0,
                    scaleX: 1.05,
                    scaleY: 1.2,
                    opacity: 0,
                  }}
                  animate={{
                    scaleX: 2,
                    scaleY: 2,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 3,
                  }}
                >
                  <Image
                    src={LAST_IMAGE_URL}
                    alt={`Last image`}
                    className="w-[50vw] md:w-[20vw] h-auto object-contain rounded-lg shadow-xl select-none"
                    draggable={false}
                    width={200}
                    height={200}
                    unoptimized
                  />
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* 미리 로드할 이미지를 위한 숨겨진 컨테이너 */}
        <div className="hidden pointer-events-none">
          {Array.from(preloadedImages).map((src, idx) => (
            <img key={idx} src={`${src}?version=0`} alt="" />
          ))}
        </div>
        <HeartBurst ref={heartBurstRef} />
        <AnimatePresence>
          {!isIntroFinished && (
            <IntroText
              onFinish={() => {
                setIsIntroFinished(true);
              }}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
