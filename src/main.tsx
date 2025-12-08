import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider, App as AntApp } from "antd";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";
import "./i18n/config";
import i18n from "./i18n/config";
import App from "./App";

const Root = () => {
  const [locale, setLocale] = useState(i18n.language === "en" ? enUS : zhCN);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setLocale(lng === "en" ? enUS : zhCN);
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return (
    <StrictMode>
      <ConfigProvider locale={locale}>
        <AntApp>
          <App />
        </AntApp>
      </ConfigProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
