import type { Metadata } from "next";
import { Nanum_Brush_Script } from "next/font/google";
import { ThemeProvider } from "../components/ThemeProvider";

const nanumBrushScript = Nanum_Brush_Script({
  variable: "--font-nanum-brush-script",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "💗 JAESEOK DONGHEE 💗",
  description: "🌴 재석동희 결혼잔치에 초대합니다 🏝️",
  openGraph: {
    images: "https://kimdongheepumpitup.love/og.png",
  },
};

export default function SaveTheDateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className={`${nanumBrushScript.variable} antialiased`}>
        {children}
      </div>
    </ThemeProvider>
  );
}
