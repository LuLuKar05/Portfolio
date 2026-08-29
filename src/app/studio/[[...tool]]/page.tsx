import type { Metadata } from "next";
import Link from "next/link";
import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

import styles from "./studio.module.css";

export const metadata: Metadata = {
  title: "Portfolio Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className={styles.setup}>
        <p className={styles.eyebrow}>Sanity Studio</p>
        <h1>Connect your CMS project</h1>
        <p>
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code> to <code>.env.local</code>,
          then restart the development server.
        </p>
        <Link href="/">Return to portfolio</Link>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
