import { useEffect, useRef, useState } from "react";

type Pos = { top: number; left: number };

export interface UsePortalPositionOptions {
  offset?: number;
  margin?: number;
  // preferred position like 'bottom', 'top', 'left', 'right' or with -start/-end
  position?: string;
}

export function usePortalPosition(
  anchorRef: React.RefObject<HTMLElement | null>,
  isOpen: boolean,
  opts: UsePortalPositionOptions = {}
) {
  const { offset = 8, margin = 8, position = "bottom" } = opts;
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );
  const [portalPos, setPortalPos] = useState<Pos>({ top: 0, left: 0 });

  useEffect(() => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    setPortalContainer(el);
    return () => {
      if (el.parentNode) el.parentNode.removeChild(el);
    };
  }, []);

  // initial estimate when opening — anchor rect based
  useEffect(() => {
    if (!isOpen || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    // basic estimates (will be refined after measuring portal size)
    const baseLeft = rect.left + window.scrollX;
    const baseTop = rect.top + window.scrollY;

    let left = baseLeft;
    let top = rect.bottom + window.scrollY + offset;

    if (position.startsWith("top")) {
      top = baseTop - offset;
    } else if (position.startsWith("left")) {
      left = baseLeft - offset;
      top = baseTop;
    } else if (position.startsWith("right")) {
      left = rect.right + window.scrollX + offset;
      top = baseTop;
    }

    setPortalPos({ top, left });
  }, [isOpen, anchorRef, offset, position]);

  // after portal renders, measure and clamp/flip to viewport
  useEffect(() => {
    if (!isOpen || !portalRef.current || !anchorRef.current) return;

    const el = portalRef.current;
    const rect = anchorRef.current.getBoundingClientRect();
    const w = el.offsetWidth;
    const h = el.offsetHeight;

    const posName = position.split("-")[0];
    const align = position.includes("-") ? position.split("-")[1] : "center";

    let left = 0;
    let top = 0;

    if (posName === "bottom") {
      top = rect.bottom + window.scrollY + offset;
      if (align === "start") left = rect.left + window.scrollX;
      else if (align === "end")
        left = rect.left + window.scrollX + rect.width - w;
      else left = rect.left + window.scrollX + rect.width / 2 - w / 2;
    } else if (posName === "top") {
      top = rect.top + window.scrollY - h - offset;
      if (align === "start") left = rect.left + window.scrollX;
      else if (align === "end")
        left = rect.left + window.scrollX + rect.width - w;
      else left = rect.left + window.scrollX + rect.width / 2 - w / 2;
    } else if (posName === "left") {
      left = rect.left + window.scrollX - w - offset;
      if (align === "start") top = rect.top + window.scrollY;
      else if (align === "end")
        top = rect.top + window.scrollY + rect.height - h;
      else top = rect.top + window.scrollY + rect.height / 2 - h / 2;
    } else if (posName === "right") {
      left = rect.right + window.scrollX + offset;
      if (align === "start") top = rect.top + window.scrollY;
      else if (align === "end")
        top = rect.top + window.scrollY + rect.height - h;
      else top = rect.top + window.scrollY + rect.height / 2 - h / 2;
    }

    // clamp to viewport (consider scroll offsets)
    const minLeft = window.scrollX + margin;
    const maxLeft = window.scrollX + window.innerWidth - w - margin;
    const minTop = window.scrollY + margin;
    const maxTop = window.scrollY + window.innerHeight - h - margin;

    left = Math.min(Math.max(left, minLeft), Math.max(minLeft, maxLeft));
    top = Math.min(Math.max(top, minTop), Math.max(minTop, maxTop));

    if (
      Math.abs(left - portalPos.left) > 1 ||
      Math.abs(top - portalPos.top) > 1
    ) {
      setPortalPos({ left, top });
    }
  }, [
    isOpen,
    portalRef.current,
    anchorRef.current,
    portalPos.left,
    portalPos.top,
    margin,
    offset,
    position,
  ]);

  return { portalContainer, portalRef, portalPos, setPortalPos };
}

export default usePortalPosition;
