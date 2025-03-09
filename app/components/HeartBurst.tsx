import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

interface Heart {
  id: string;
  x: number; // x 좌표 (%)
  y: number; // y 좌표 (%)
  size: number; // 크기 (px)
  color: string; // 색상
  opacity: number; // 투명도
  velocityX: number; // x 방향 속도
  velocityY: number; // y 방향 속도
  rotation: number; // 회전 각도
  rotationSpeed: number; // 회전 속도
}

interface Burst {
  id: number; // 폭발 ID
  hearts: Heart[]; // 하트 배열
  createdAt: number; // 생성 시간
}

export interface HeartBurstRef {
  burst: (x: number, y: number) => void;
}

const HeartBurst = forwardRef<HeartBurstRef>(({}, ref) => {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useImperativeHandle(ref, () => {
    return {
      burst: (x: number, y: number) => {
        handleBurst(x, y);
      },
    };
  });

  const handleBurst = (x: number, y: number) => {
    // 고유 ID 생성
    const burstId = Date.now();

    // 하트 8-12개 생성
    const newHearts: Heart[] = [];
    const heartCount = Math.floor(Math.random() * 5) + 8;

    for (let i = 0; i < heartCount; i++) {
      newHearts.push({
        id: `${burstId}-${i}`,
        x,
        y,
        size: Math.random() * 15 + 5, // 5-20px
        color: getRandomPinkColor(),
        opacity: 1,
        // 랜덤 방향으로 퍼지는 속도와 각도
        velocityX: (Math.random() - 0.5) * 10,
        velocityY: (Math.random() - 0.5) * 10,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }

    // 새 하트 추가
    setBursts((prev) => [
      ...prev,
      {
        id: burstId,
        hearts: newHearts,
        createdAt: Date.now(),
      },
    ]);
  };

  // 랜덤 핑크 계열 색상 생성
  function getRandomPinkColor() {
    const colors = [
      "#FF69B4", // 핫 핑크
      "#FFB6C1", // 라이트 핑크
      "#FF1493", // 딥 핑크
      "#DB7093", // 팔레 바이올렛 레드
      "#FFC0CB", // 핑크
      "#FF77FF", // 연한 핑크
      "#FF5E8A", // 진한 분홍
      "#FF9999", // 연한 산호색
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // 애니메이션 효과
  useEffect(() => {
    if (bursts.length === 0) return;

    const interval = setInterval(() => {
      setBursts((prevBursts) => {
        // 업데이트된 폭발들
        const updatedBursts = prevBursts.map((burst) => {
          // 각 하트 위치 업데이트
          const updatedHearts = burst.hearts.map((heart) => ({
            ...heart,
            x: heart.x + heart.velocityX * 0.2,
            y: heart.y + heart.velocityY * 0.2,
            // 속도 감소 (마찰)
            velocityX: heart.velocityX * 0.97,
            velocityY: heart.velocityY * 0.97 + 0.1, // 중력 효과 추가
            rotation: heart.rotation + heart.rotationSpeed,
            opacity: heart.opacity - 0.01, // 서서히 사라짐
            size: Math.max(0, heart.size - 0.05), // 서서히 작아짐
          }));

          return {
            ...burst,
            hearts: updatedHearts,
          };
        });

        // 2.5초가 지난 폭발이나 완전히 투명해진 하트는 제거
        return updatedBursts.filter((burst) => {
          const age = Date.now() - burst.createdAt;
          const hasVisibleHearts = burst.hearts.some(
            (heart) => heart.opacity > 0.1
          );
          return age < 2500 && hasVisibleHearts;
        });
      });
    }, 16); // 약 60fps

    return () => clearInterval(interval);
  }, [bursts]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
      {bursts.map((burst) =>
        burst.hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              transform: `rotate(${heart.rotation}deg) translate(${heart.x}%, ${heart.y}%)`,
              opacity: heart.opacity,
              pointerEvents: "none", // 하트가 클릭을 방해하지 않도록
            }}
          >
            <svg
              width={heart.size}
              height={heart.size}
              viewBox="0 0 24 24"
              fill={heart.color}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ))
      )}
    </div>
  );
});

HeartBurst.displayName = "HeartBurst";

export default HeartBurst;
