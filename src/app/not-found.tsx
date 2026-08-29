import Link from "next/link";

export default function NotFound() {
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
        404 / UNCHARTED
      </p>
      <h1 style={{ fontFamily: "var(--font-nasalization)", textTransform: "uppercase" }}>
        This orbit does not exist.
      </h1>
      <Link
        href="/"
        style={{
          justifySelf: "center",
          padding: "12px 18px",
          border: "1px solid #fff",
          background: "#fff",
          color: "#050608",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        Return home
      </Link>
    </main>
  );
}
