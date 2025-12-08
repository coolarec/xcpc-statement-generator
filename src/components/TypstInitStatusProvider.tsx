import { type FC, type ReactNode, useEffect, useState } from "react";
import { App, Button, Progress, Space } from "antd";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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
            {t('messages:downloadCompiler')}（<LoadedText {...typstInitInfo.compiler} />）
            <ProgressBar {...typstInitInfo.compiler} />
          </div>
          <div>
            {t('messages:downloadFont')}（<LoadedText {...typstInitInfo.font} />）
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
            message: t('messages:typstInitializing'),
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
          message: t('messages:typstInitFailed'),
          description: progressBars,
          closable: false,
          duration: 0,
          btn: (
            <Space>
              <Button onClick={async () => { await window.caches?.delete("typst-assets"); window.location.reload(); }}>
                {t('common:clearCache')}
              </Button>
              <Button type="primary" onClick={() => window.location.reload()}>
                {t('common:refresh')}
              </Button>
            </Space>
          ),
        });
      } else if (typstInitStatus === "fulfilled" && elapsed >= 1000) {
        (notification as any).open({
          key,
          type: "success",
          placement: "bottomRight",
          message: t('messages:typstInitialized'),
          description: progressBars,
          duration: 3,
        });
      }

      if (fontAccessConfirmResolve) {
        (notification as any).open({
          key: fontKey,
          type: "info",
          placement: "bottomRight",
          message: t('messages:requestFontAccess'),
          description: t('messages:fontAccessDescription'),
          closable: false,
          duration: 0,
          btn: (
            <Button type="primary" onClick={() => fontAccessConfirmResolve?.()}>
              {t('common:confirm')}
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
