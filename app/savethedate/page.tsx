import { ExternalLinkIcon } from "lucide-react";
import { InView } from "../components/InView";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Photos from "./components/Photos";

const SaveTheDatePage = () => {
  return (
    <main>
      <div className="relative">
        <section className="min-h-dvh items-center justify-center flex flex-col">
          <Hero />
        </section>
        <section className="min-h-screen items-center justify-center flex flex-col">
          <InView
            variants={{
              hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            viewOptions={{ margin: "0px 0px -200px 0px" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="text-center text-xl">
              저희 두 사람이
              <br />
              10년의 사랑으로 평생을 약속합니다.
              <br />
              기쁜 날 행복한 시작을
              <br />
              따뜻한 응원으로 함께해 주세요.
            </p>
          </InView>
        </section>
        <section className="min-h-screen items-center justify-center flex flex-col">
          <InView
            variants={{
              hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            viewOptions={{ margin: "0px 0px -200px 0px" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center text-center">
              <p className="text-xl">
                {new Date("2025-09-27").toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-xl">04:00 PM</p>
              <p className="text-xl">제주도 신천리 홍충화 할머니 댁</p>
              <p className="text-lg">
                (제주도 서귀포시 성산읍 신천리 483 일대)
              </p>
              <a
                href="https://smore.im/form/J0o0lFm0Pn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center text-lg mt-4"
              >
                잔치 참석 여부 응답하고 안내 받기{" "}
                <ExternalLinkIcon className="inline-block ml-1" size={16} />
              </a>
            </div>
          </InView>
        </section>
        <section className="min-h-screen items-center justify-center flex flex-col">
          <Photos />
        </section>
        <section className="min-h-[36rem] items-center justify-center flex flex-col footer">
          <Footer />
        </section>
      </div>
    </main>
  );
};

export default SaveTheDatePage;
