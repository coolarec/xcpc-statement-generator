import { type FC, type ReactNode, useEffect, useState } from "react";
import { App, Button, Progress, Space } from "antd";
import { typstInitInfo, typstInitStatus, fontAccessConfirmResolve } from "@/compiler";

const LoadedText: FC<{ loaded: number; total?: number }> = ({ loaded, total }) => (
  <>
    {(loaded / (1024 * 1024)).toFixed(1)} MiB
    {total !== undefined && ` / ${(total / (1024 * 1024)).toFixed(1)} MiB`}
  </>
);

const ProgressBar: FC<{ status: "pending" | "fulfilled" | "rejected"; percent: number }> = ({ status, percent }) => (
  <Progress
    status={status === "rejected" ? "exception" : status === "fulfilled" ? "success" : "active"}
    percent={percent}
    format={(x) => (x || 0).toFixed(0) + "%"}
  />
);

const TypstInitStatusProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [, setStatus] = useState(typstInitStatus);
  const { notification } = App.useApp();

  useEffect(() => {
    const key = crypto.randomUUID();
    const fontKey = crypto.randomUUID();
    const mountTime = performance.now();
    let rafId: number | undefined;

    const loop = () => {
      setStatus(typstInitStatus);
      const elapsed = performance.now() - mountTime;

      const progressBars = (
        <>
          <div>
            下载编译器（<LoadedText {...typstInitInfo.compiler} />）
            <ProgressBar {...typstInitInfo.compiler} />
          </div>
          <div>
            下载字体（<LoadedText {...typstInitInfo.font} />）
            <ProgressBar {...typstInitInfo.font} />
          </div>
        </>
      );

      if (typstInitStatus === "pending") {
        rafId = requestAnimationFrame(loop);
        if (elapsed >= 1000) {
          (notification as any).open({
            key,
            type: "info",
            placement: "bottomRight",
            message: "Typst 正在初始化",
            description: progressBars,
            closable: false,
            duration: 0,
          });
        }
      } else if (typstInitStatus === "rejected") {
        (notification as any).open({
          key,
          type: "error",
          placement: "bottomRight",
          message: "Typst 初始化失败",
          description: progressBars,
          closable: false,
          duration: 0,
          btn: (
            <Space>
              <Button onClick={async () => { await window.caches?.delete("typst-assets"); window.location.reload(); }}>
                清空缓存
              </Button>
              <Button type="primary" onClick={() => window.location.reload()}>
                刷新
              </Button>
            </Space>
          ),
        });
      } else if (typstInitStatus === "fulfilled" && elapsed >= 1000) {
        (notification as any).open({
          key,
          type: "success",
          placement: "bottomRight",
          message: "Typst 初始化完成",
          description: progressBars,
          duration: 3,
        });
      }

      if (fontAccessConfirmResolve) {
        (notification as any).open({
          key: fontKey,
          type: "info",
          placement: "bottomRight",
          message: "请求访问本机字体",
          description: "允许访问本机字体可减少下载量。",
          closable: false,
          duration: 0,
          btn: (
            <Button type="primary" onClick={() => fontAccessConfirmResolve?.()}>
              确认
            </Button>
          ),
        });
      } else {
        notification.destroy(fontKey);
      }
    };

    rafId = requestAnimationFrame(loop);
    return () => {
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      notification.destroy(key);
      notification.destroy(fontKey);
    };
  }, [notification]);

  return <>{children}</>;
};

export default TypstInitStatusProvider;
