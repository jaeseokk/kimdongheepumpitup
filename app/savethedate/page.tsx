import { ExternalLinkIcon } from "lucide-react";
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
        <section className="min-h-dvh items-center justify-center flex flex-col">
          <p className="text-center">
            저희 두 사람이
            <br />
            10년의 사랑으로 평생을 약속합니다.
            <br />
            기쁜 날 행복한 시작을
            <br />
            따뜻한 응원으로 함께해 주세요.
          </p>
        </section>
        <section className="min-h-dvh items-center justify-center flex flex-col">
          <p>
            {new Date("2025-09-27").toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>04:00 PM</p>
          <p>제주도 신천리 홍충화 할머니 댁</p>
          <a
            href="https://smore.im/form/J0o0lFm0Pn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center text-sm"
          >
            RSVP <ExternalLinkIcon className="inline-block ml-1" size={16} />
          </a>
        </section>
        <section className="min-h-dvh items-center justify-center flex flex-col">
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
