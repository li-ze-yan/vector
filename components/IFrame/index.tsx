"use client";

import { useSystemStore } from "@/stores";
import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const css = String.raw;

export function Iframe({ children, ...props }: React.ComponentProps<"iframe">) {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  const { theme } = useSystemStore();
  useEffect(() => {
    if (!mountNode) return;
    // eslint-disable-next-line react-hooks/immutability
    mountNode.className = theme as string;

    // We need to add `light` or `dark` to the <html> element in the iframe
    // for Safari to work properly
    const root = mountNode.getRootNode() as Document;
    if (root) {
      root.documentElement.className = theme as string;
    }
  }, [mountNode, theme]);

  const ref = useCallback((element: HTMLIFrameElement | null) => {
    if (!element) {
      setMountNode(null);
      return;
    }

    const innerDocument = element.contentWindow?.document;
    if (!innerDocument) return;

    const body = innerDocument.body;

    const styles = document.querySelectorAll("link[rel=stylesheet]");
    for (const style of styles) {
      innerDocument.head.appendChild(style.cloneNode(true));
    }

    const iframeStyles = innerDocument.createElement("style");
    iframeStyles.innerHTML = css`
      html,
      body {
        background-color: transparent;
      }
    `;
    body.appendChild(iframeStyles);

    setMountNode(body);
  }, []);

  return (
    // @ts-expect-error -- allowtransparency is not in React's iframe type
    <iframe {...props} ref={ref} allowtransparency="true">
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
}
