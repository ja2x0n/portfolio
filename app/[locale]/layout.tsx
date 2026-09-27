import type { Metadata } from "next";
import { Anybody, M_PLUS_1 } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import PageMask from "@/components/PageMask/PageMask";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css";

/** 영문. 굵기(wght)와 폭(wdth) 두 축을 쓰는 가변 폰트다. */
const latin = Anybody({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-latin",
  display: "swap",
});

const korean = localFont({
  src: [
    {
      path: "../../fonts/Paperlogy-3Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/Paperlogy-4Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/Paperlogy-6SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/Paperlogy-7Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ko",
  display: "swap",
});

const japanese = M_PLUS_1({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  preload: false,
  variable: "--font-ja",
  display: "swap",
});

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return { title: t("title"), description: t("description") };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${latin.variable} ${korean.variable} ${japanese.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <NextIntlClientProvider>
            <Header />
            {children}
            <Footer />
            <PageMask />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
