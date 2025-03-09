import { useEffect, useState } from "react";

interface Heart {
  id: number; // 고유 ID
  x: number; // x 좌표 (%)
  y: number; // y 좌표 (%)
  size: number; // 크기 (px)
  color: string; // 색상
  opacity: number; // 투명도
  speed: number; // 속도
  wobble: number; // 흔들림 정도
  rotation: number; // 회전 각도
}

const LastBackground = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // 초기 하트 생성
    const initialHearts = [];
    for (let i = 0; i < 20; i++) {
      initialHearts.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        color: getRandomPinkColor(),
        opacity: Math.random() * 0.6 + 0.3,
        speed: Math.random() * 2 + 0.5,
        wobble: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
      });
    }

    setHearts(initialHearts);

    // 하트 애니메이션 인터벌
    const interval = setInterval(() => {
      setHearts((prevHearts) =>
        prevHearts.map((heart) => {
          // 하트가 화면 위로 벗어나면 아래에서 다시 시작
          if (heart.y < -10) {
            return {
              ...heart,
              y: 110,
              x: Math.random() * 100,
            };
          }

          return {
            ...heart,
            y: heart.y - heart.speed * 0.3,
            x: heart.x + Math.sin((Date.now() / 1000) * heart.wobble) * 0.1,
            rotation: heart.rotation + heart.wobble,
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // 랜덤 핑크 계열 색상 생성
  function getRandomPinkColor() {
    const colors = [
      "#FF69B4", // 핫 핑크
      "#FFB6C1", // 라이트 핑크
      "#FF1493", // 딥 핑크
      "#DB7093", // 팔레 바이올렛 레드
      "#FFC0CB", // 핑크
      "#FF77FF", // 연한 핑크
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            transform: `rotate(${heart.rotation}deg)`,
            opacity: heart.opacity,
            zIndex: 0,
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
      ))}
    </div>
  );
};

export default LastBackground;
