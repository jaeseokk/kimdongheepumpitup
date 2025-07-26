"use client";

import { createContext } from "@/app/react/create-context";
import { Slot } from "@/app/react/slot";
import { cn } from "@/app/utils/ui";
import {
  AnimatePresence,
  InertiaOptions,
  motion,
  useAnimationFrame,
  useMotionValue,
} from "motion/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import img7 from "../assets/7.png";
import img8 from "../assets/8.png";
import img9 from "../assets/9.png";

const images = [
  {
    image: img1,
    position: {
      top: "12%",
      left: "15%",
    },
  },
  {
    image: img2,
    position: {
      top: "8%",
      left: "60%",
    },
  },
  {
    image: img3,
    position: {
      top: "32%",
      left: "38%",
    },
  },
  {
    image: img4,
    position: {
      top: "58%",
      left: "50%",
    },
  },
  {
    image: img5,
    position: {
      top: "76%",
      left: "60%",
    },
  },
  {
    image: img6,
    position: {
      top: "74%",
      left: "16%",
    },
  },
  {
    image: img7,
    position: {
      top: "22%",
      left: "80%",
    },
  },
  {
    image: img8,
    position: {
      top: "48%",
      left: "75%",
    },
  },
  {
    image: img9,
    position: {
      top: "42%",
      left: "8%",
    },
  },
];

const Photos = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="relative w-full h-full flex-1 flex flex-col">
      <DragElementsRoot dragMomentum={false} className="flex-1">
        {images.map((item, i) => (
          <DragElementsItem
            index={i}
            key={i}
            initialPosition={item.position}
            onClick={() => setSelectedImage(i)}
          >
            <motion.div
            // layoutId={`photo-${i}`}
            >
              <Image
                src={item.image.src}
                alt={`Photo ${i + 1}`}
                width={100}
                height={100}
                className="object-cover rounded-lg"
                draggable={false}
              />
            </motion.div>
          </DragElementsItem>
        ))}
      </DragElementsRoot>

      <AnimatePresence>
        {selectedImage !== null && (
          <FullScreenImageViewer
            image={images[selectedImage].image}
            onClose={() => setSelectedImage(null)}
            index={selectedImage}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

interface FloatProps {
  children: React.ReactNode;
  speed?: number;
  amplitude?: [number, number, number]; // [x, y, z]
  rotationRange?: [number, number, number]; // [x, y, z]
  timeOffset?: number;
}

const Float = ({
  children,
  speed = 0.5,
  amplitude = [10, 30, 30], // Default [x, y, z] amplitudes
  rotationRange = [15, 15, 7.5], // Default [x, y, z] rotation ranges
  timeOffset = 0,
}: FloatProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const z = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateZ = useMotionValue(0);

  // Use refs for animation values to avoid recreating the animation frame callback
  const time = useRef(0);

  useAnimationFrame(() => {
    time.current += speed * 0.02;

    // Smooth floating motion on all axes
    const newX = Math.sin(time.current * 0.7 + timeOffset) * amplitude[0];
    const newY = Math.sin(time.current * 0.6 + timeOffset) * amplitude[1];
    const newZ = Math.sin(time.current * 0.5 + timeOffset) * amplitude[2];

    // 3D rotations with different frequencies for more organic movement
    const newRotateX =
      Math.sin(time.current * 0.5 + timeOffset) * rotationRange[0];
    const newRotateY =
      Math.sin(time.current * 0.4 + timeOffset) * rotationRange[1];
    const newRotateZ =
      Math.sin(time.current * 0.3 + timeOffset) * rotationRange[2];

    x.set(newX);
    y.set(newY);
    z.set(newZ);
    rotateX.set(newRotateX);
    rotateY.set(newRotateY);
    rotateZ.set(newRotateZ);
  });

  return (
    <motion.div
      style={{
        x,
        y,
        z,
        rotateX,
        rotateY,
        rotateZ,
        transformStyle: "preserve-3d",
      }}
      className={cn("will-change-transform")}
    >
      {children}
    </motion.div>
  );
};

const [DragElementsContextProvider, useDragElementsContext] = createContext<{
  dragElastic?:
    | number
    | { top?: number; left?: number; right?: number; bottom?: number }
    | boolean;
  dragConstraints?:
    | { top?: number; left?: number; right?: number; bottom?: number }
    | React.RefObject<Element>;
  dragMomentum?: boolean;
  dragTransition?: InertiaOptions;
  dragPropagation?: boolean;
  constraintsRef?: React.RefObject<HTMLDivElement | null>;
  zIndices: number[];
  isDragging: boolean;
  onDragStart: (index: number) => void;
  onDragEnd: (index: number) => void;
}>();

interface DragElementsRootProps {
  children: React.ReactNode;
  dragElastic?:
    | number
    | { top?: number; left?: number; right?: number; bottom?: number }
    | boolean;
  dragConstraints?:
    | { top?: number; left?: number; right?: number; bottom?: number }
    | React.RefObject<Element>;
  dragMomentum?: boolean;
  dragTransition?: InertiaOptions;
  dragPropagation?: boolean;
  selectedOnTop?: boolean;
  className?: string;
}

const DragElementsRoot: React.FC<DragElementsRootProps> = ({
  children,
  dragElastic = 0.5,
  dragConstraints,
  dragMomentum = true,
  dragTransition = { bounceStiffness: 200, bounceDamping: 300 },
  dragPropagation = true,
  selectedOnTop = true,
  className,
}) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [zIndices, setZIndices] = useState<number[]>([]);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setZIndices(
      Array.from({ length: React.Children.count(children) }, (_, i) => i)
    );
  }, [children]);

  const bringToFront = (index: number) => {
    if (selectedOnTop) {
      setZIndices((prevIndices) => {
        const newIndices = [...prevIndices];
        const currentIndex = newIndices.indexOf(index);
        newIndices.splice(currentIndex, 1);
        newIndices.push(index);
        return newIndices;
      });
    }
  };

  return (
    <DragElementsContextProvider
      value={{
        dragElastic,
        dragConstraints,
        dragMomentum,
        dragTransition,
        dragPropagation,
        constraintsRef,
        zIndices,
        isDragging,
        onDragStart: (index) => {
          bringToFront(index);
          setIsDragging(true);
        },
        onDragEnd: () => setIsDragging(false),
      }}
    >
      <div
        ref={constraintsRef}
        className={cn(`relative w-full h-full`, className)}
      >
        {React.Children.map(children, (child, index) => (
          <Slot key={index}>{child}</Slot>
        ))}
      </div>
    </DragElementsContextProvider>
  );
};

interface DragElementsItemProps {
  index: number;
  initialPosition?: { top?: string; left?: string };
  children: React.ReactNode;
  onClick?: () => void;
}

const DragElementsItem = ({
  index,
  children,
  initialPosition,
  onClick,
}: DragElementsItemProps) => {
  const {
    dragElastic,
    dragConstraints,
    dragMomentum,
    dragTransition,
    dragPropagation,
    constraintsRef,
    zIndices,
    isDragging,
    onDragStart,
    onDragEnd,
  } = useDragElementsContext();

  // 드래그 상태 추적
  const [isDragStarted, setIsDragStarted] = useState(false);

  return (
    <motion.div
      drag
      dragElastic={dragElastic}
      dragConstraints={dragConstraints || constraintsRef}
      dragMomentum={dragMomentum}
      dragTransition={dragTransition}
      dragPropagation={dragPropagation}
      style={{
        zIndex: zIndices.indexOf(index),
        cursor: isDragging ? "grabbing" : "grab",
        ...initialPosition,
      }}
      onDragStart={() => {
        onDragStart(index);
        setIsDragStarted(true);
      }}
      onDragEnd={() => {
        onDragEnd(index);
        setTimeout(() => {
          setIsDragStarted(false);
        }, 100);
      }}
      onClick={() => {
        if (!isDragStarted && onClick) {
          onClick();
        }
      }}
      whileDrag={{ cursor: "grabbing" }}
      className={"absolute"}
    >
      {children}
    </motion.div>
  );
};

interface FullScreenImageViewerProps {
  image: any;
  onClose: () => void;
  index: number;
}

const FullScreenImageViewer = ({
  image,
  onClose,
  index,
}: FullScreenImageViewerProps) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-[90vw] h-[90vh] flex items-center justify-center"
        // layoutId={`photo-${index}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.src}
          alt={`Full Screen Photo`}
          width={800}
          height={800}
          className="object-contain rounded-lg h-full"
          priority
        />
        <button
          className="absolute top-4 right-4 bg-white/20 text-white p-2 rounded-full"
          onClick={onClose}
        >
          X
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Photos;
