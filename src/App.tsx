import type { FC } from "react";
import { App as AntdApp } from "antd";
import TypstInitStatusProvider from "./components/TypstInitStatusProvider";
import ContestEditor from "./contestEditor";
import "./App.css";

const App: FC = () => {
  return (
    <div className="app">
      <AntdApp>
        <TypstInitStatusProvider>
          <main>
            <ContestEditor />
          </main>
          <footer>
            <span>XCPC Statement Generator</span>
          </footer>
        </TypstInitStatusProvider>
      </AntdApp>
    </div>
  );
};

export default App;
