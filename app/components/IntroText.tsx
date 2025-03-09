import { motion } from "framer-motion";
import AnimatedPathText from "./AnimatedPathText";

const path =
  "M 2 362.171875 L 12 362.171875 L 26 364.171875 L 53 366.171875 L 85 368.171875 L 112 367.171875 L 138 367.171875 L 163 363.171875 L 192 358.171875 L 221 358.171875 L 244 365.171875 L 263 375.171875 L 278 395.171875 L 264 401.171875 L 246 390.171875 L 227 367.171875 L 211 333.171875 L 200 295.171875 L 199 272.171875 L 206 252.171875 L 217 242.171875 L 232 236.171875 L 248 236.171875 L 263 245.171875 L 276 263.171875 L 287 284.171875 L 297 300.171875 L 305 268.171875 L 311 252.171875 L 326 239.171875 L 340 235.171875 L 359 242.171875 L 373 257.171875 L 379 282.171875 L 372 308.171875 L 364 327.171875 L 351 347.171875 L 335 364.171875 L 317 378.171875 L 303 388.171875 L 291 400.171875 L 312 398.171875 L 335 394.171875 L 368 386.171875 L 393 383.171875 L 422 385.171875 L 452 388.171875 L 481 393.171875 L 510 398.171875 L 535 401.171875 L 564 404.171875 L 595 405.171875 L 625 406.171875 L 637 405.171875";

const text = `동희와 재석, 우리 함께 보낸 소중한 시간들`;

interface IntroTextProps {
  onFinish?: () => void;
}

const IntroText = ({ onFinish }: IntroTextProps) => {
  return (
    <motion.div
      className="fixed inset-0 w-full h-full overflow-hidden"
      exit={{ opacity: 0 }}
    >
      <div className="absolute w-full h-full flex flex-col">
        <AnimatedPathText
          path={path}
          pathId={`auto-path`}
          // svgClassName={`absolute -left-[100px] top-1/3 w-[calc(100%+200px)] h-full`}
          viewBox="0 0 640 640"
          text={text}
          textClassName={`text-white text-[20px]`}
          animationType="auto"
          repeatCount={1}
          easingFunction={{
            calcMode: "spline",
            keyTimes: "0;1",
            keySplines: "0.5 0.3 0.5 0.999",
          }}
          duration={7}
          textAnchor="end"
          onFinish={onFinish}
        />
      </div>
    </motion.div>
  );
};

export default IntroText;
