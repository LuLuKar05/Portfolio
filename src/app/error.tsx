"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeContent: "center",
        gap: "1rem",
        padding: "2rem",
        background: "#050608",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <p style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.18em" }}>
        SYSTEM / RECOVERY
      </p>
      <h1 style={{ fontFamily: "var(--font-nasalization)", textTransform: "uppercase" }}>
        Something drifted off course.
      </h1>
      <button
        type="button"
        onClick={reset}
        style={{
          justifySelf: "center",
          padding: "12px 18px",
          border: "1px solid #fff",
          background: "#fff",
          color: "#050608",
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        Try again
      </button>
    </main>
  );
}
