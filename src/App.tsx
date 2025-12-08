import type { FC } from "react";
import { App as AntdApp, Button, Space } from "antd";
import { useTranslation } from "react-i18next";
import TypstInitStatusProvider from "./components/TypstInitStatusProvider";
import ContestEditor from "./contestEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { name as appName, version as appVersion } from "../package.json";
import "./App.css";

const App: FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "zh" ? "en" : "zh";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <AntdApp>
      <TypstInitStatusProvider>
        <div className="app">
          <main>
            <ContestEditor />
          </main>
          <footer>
            <div>
              <a
                href="https://github.com/lihaoze123/xcpc-statement-generator"
                target="_blank"
              >
                <FontAwesomeIcon icon={faGithub} />
                {appName}
              </a>{" "}
              <span>v{appVersion}</span>{" "}
              <span>({GIT_COMMIT_INFO + (import.meta.env.DEV ? "-dev" : "")})</span>
            </div>
            <Space>
              <Button
                type="text"
                size="small"
                icon={<FontAwesomeIcon icon={faLanguage} />}
                onClick={toggleLanguage}
              >
                {i18n.language === "zh" ? "English" : "中文"}
              </Button>
              <span>Developed by chumeng</span>
            </Space>
          </footer>
        </div>
      </TypstInitStatusProvider>
    </AntdApp>
  );
};

export default App;
