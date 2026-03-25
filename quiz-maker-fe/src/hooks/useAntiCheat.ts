import { useCallback, useEffect, useRef, useState } from "react";
import type { AntiCheatEvent, AntiCheatSummary } from "@/types";

export default function useAntiCheat(attemptId: number | null) {
  const [events, setEvents] = useState<AntiCheatEvent[]>([]);
  const attemptIdRef = useRef(attemptId);

  const pushEvent = useCallback((type: AntiCheatEvent["type"]) => {
    if (attemptIdRef.current === null) return;
    setEvents((prev) => [
      ...prev,
      { type, timestamp: new Date().toISOString() },
    ]);
  }, []);

  useEffect(() => {
    if (attemptId === null) return;

    const handleVisibility = () => {
      pushEvent(document.hidden ? "blur" : "focus");
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [attemptId]);

  const handlePaste = useCallback(() => {
    pushEvent("paste");
  }, []);

  const getSummary = useCallback((): AntiCheatSummary => {
    return {
      tabSwitches: events.filter((e) => e.type === "blur").length,
      pasteCount: events.filter((e) => e.type === "paste").length,
      events,
    };
  }, [events]);

  return { events, handlePaste, getSummary };
}
