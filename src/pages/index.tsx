import type { ReactNode, KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";
import Translate, { translate } from "@docusaurus/Translate";

const features = [
  {
    title: translate({ message: "Touch Automation" }),
    description: (
      <Translate>
        Record and playback taps, swipes, and gestures with high precision.
        Support for multi-touch simulation and 3D Touch pressure sensitivity.
      </Translate>
    ),
    icon: "🖱️",
  },
  {
    title: translate({ message: "Image Recognition" }),
    description: (
      <Translate>
        Ultra-fast screenshot capture with OpenCV-powered detection. Find images
        and text with pixel-perfect accuracy in milliseconds.
      </Translate>
    ),
    icon: "🔍",
  },
  {
    title: translate({ message: "System Integration" }),
    description: (
      <Translate>
        Direct access to SpringBoard UI elements, app sandboxes, and system
        configuration. Control display, network, and more.
      </Translate>
    ),
    icon: "⚙️",
  },
  {
    title: translate({ message: "Lua Scripting" }),
    description: (
      <Translate>
        Full Lua 5.3 support with debugging tools. Create complex automation
        workflows with an easy-to-learn language.
      </Translate>
    ),
    icon: "📝",
  },
  {
    title: translate({ message: "File Management" }),
    description: (
      <Translate>
        Browse local files, edit permissions, import via WebDAV, and handle ZIP
        compression/decompression with ease.
      </Translate>
    ),
    icon: "📁",
  },
  {
    title: translate({ message: "Developer Tools" }),
    description: (
      <Translate>
        Built-in editor with syntax highlighting, breakpoints, variable
        inspection, and error stack tracing.
      </Translate>
    ),
    icon: "🛠️",
  },
];

// Responsive media query hook
function useMediaQuery(query: string): boolean {
  const getMatch = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false;
  const [matches, setMatches] = useState<boolean>(getMatch());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    // Support older Safari
    // @ts-ignore
    if (mql.addEventListener) mql.addEventListener("change", handler);
    else mql.addListener(handler as any);
    return () => {
      // @ts-ignore
      if (mql.removeEventListener) mql.removeEventListener("change", handler);
      else mql.removeListener(handler as any);
    };
  }, [query]);

  return matches;
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className={styles.heroBgLogo}>
        <img src={useBaseUrl("img/XXTouch_Logo.svg")} alt="" />
      </div>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={clsx("hero__title", styles.heroTitle)}>
              XXTouch <span className={styles.eliteText}>Elite</span>
            </Heading>
            <p className={clsx("hero__subtitle", styles.heroSubtitle)}>
              {siteConfig.tagline}
            </p>

            <div className={styles.buttons}>
              <Link
                className={clsx("button", styles.button, styles.buttonPrimary)}
                to="/docs/tutorial/intro"
              >
                <Translate>Get Started</Translate>
              </Link>
              <HavocDropdown />
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.phoneFrame}>
              <video
                src={useBaseUrl("assets/compressed.mp4")}
                className={styles.phoneScreenshot}
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
              />
            </div>
            <div className={styles.heroBackground}></div>
          </div>
        </div>
      </div>
    </header>
  );
}

function HavocDropdown() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const lastPointerType = useRef<"mouse" | "touch" | "pen" | null>(null);
  const closeTimer = useRef<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 960px)");
  const [mobileRender, setMobileRender] = useState(false);
  const [mobileClosing, setMobileClosing] = useState(false);

  function cancelClose() {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose(delay = 180) {
    cancelClose();
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      closeTimer.current = null;
    }, delay);
  }

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        open &&
        btnRef.current &&
        menuRef.current &&
        !btnRef.current.contains(target) &&
        !menuRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Close on escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => () => cancelClose(), []);

  // Focus first item when opening
  useEffect(() => {
    if (open) {
      // Only auto-focus when opened by keyboard/touch, not mouse hover
      if (!isMobile && lastPointerType.current !== "mouse") {
        const first =
          menuRef.current?.querySelector<HTMLElement>("[data-menuitem]");
        first?.focus();
      }
    }
  }, [open, isMobile]);

  // Disable background scroll when mobile overlay is open
  useEffect(() => {
    if (!isMobile) return;
    if (mobileRender) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobile, mobileRender]);

  // Manage mobile overlay mount/unmount with closing animation
  useEffect(() => {
    if (!isMobile) {
      setMobileRender(false);
      setMobileClosing(false);
      return;
    }
    if (open) {
      setMobileClosing(false);
      setMobileRender(true);
    } else if (mobileRender) {
      setMobileClosing(true);
      const t = window.setTimeout(() => {
        setMobileRender(false);
        setMobileClosing(false);
      }, 240);
      return () => window.clearTimeout(t);
    }
  }, [isMobile, open, mobileRender]);

  function onButtonKeyDown(e: ReactKeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    }
  }

  return (
    <div
      className={styles.dropdown}
      onPointerEnter={(e) => {
        if (isMobile) return;
        if (e.pointerType === "mouse") {
          lastPointerType.current = "mouse";
          cancelClose();
          setOpen(true);
        }
      }}
      onPointerLeave={(e) => {
        if (isMobile) return;
        if (e.pointerType === "mouse") {
          scheduleClose();
        }
      }}
    >
      <button
        ref={btnRef}
        type="button"
        className={clsx(
          "button",
          styles.button,
          styles.buttonOutline,
          styles.dropdownButton
        )}
        aria-haspopup="menu"
        aria-expanded={open}
        onPointerDown={(e) => {
          // Track last pointer type to differentiate mouse vs touch
          if (
            e.pointerType === "mouse" ||
            e.pointerType === "touch" ||
            e.pointerType === "pen"
          ) {
            lastPointerType.current = e.pointerType as
              | "mouse"
              | "touch"
              | "pen";
          }
        }}
        onClick={() => {
          // Only toggle on non-mouse (touch/pen). Mouse uses hover.
          if (!isMobile && lastPointerType.current === "mouse") return;
          setOpen((v) => !v);
        }}
        onKeyDown={onButtonKeyDown}
      >
        <Translate>Get on Havoc</Translate>
      </button>
      {!isMobile && (
        <div
          ref={menuRef}
          className={clsx(styles.dropdownMenu, open && styles.open)}
          role="menu"
          aria-label={translate({ message: "Choose Edition" })}
        >
          <Link
            href="https://havoc.app/package/xxtouchelite"
            className={styles.dropdownItem}
            role="menuitem"
            data-menuitem
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <span className={styles.menuIcon}>🛠️</span>
            <span>
              <Translate>Jailbreak Edition</Translate>
            </span>
          </Link>
          <Link
            href="https://havoc.app/package/xxtouchelitets"
            className={styles.dropdownItem}
            role="menuitem"
            data-menuitem
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <span className={styles.menuIcon}>🧩</span>
            <span>
              <Translate>TrollStore Edition</Translate>
            </span>
          </Link>
        </div>
      )}

      {isMobile &&
        mobileRender &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className={clsx(
              styles.mobileOverlay,
              mobileClosing && styles.closing
            )}
            role="dialog"
            aria-modal="true"
            aria-label={translate({ message: "Choose Edition" })}
            onClick={() => setOpen(false)}
          >
            <div
              className={clsx(
                styles.mobilePanel,
                mobileClosing && styles.closing
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.mobileHeader}>
                <div className={styles.mobileTitle}>
                  <Translate>Choose Edition</Translate>
                </div>
                <button
                  type="button"
                  className={styles.mobileClose}
                  aria-label={translate({ message: "Close" })}
                  onClick={() => setOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className={styles.mobileOptions}>
                <Link
                  href="https://havoc.app/package/xxtouchelite"
                  className={styles.mobileOption}
                  role="menuitem"
                  data-menuitem
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.menuIcon}>🛠️</span>
                  <span>
                    <Translate>Jailbreak Edition</Translate>
                  </span>
                </Link>
                <Link
                  href="https://havoc.app/package/xxtouchelitets"
                  className={styles.mobileOption}
                  role="menuitem"
                  data-menuitem
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.menuIcon}>🧩</span>
                  <span>
                    <Translate>TrollStore Edition</Translate>
                  </span>
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

function Feature({ title, description, icon }) {
  return (
    <div className={clsx("col col--4", styles.feature)}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <div className={styles.featureContent}>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className={clsx("text--center", styles.sectionTitle)}>
          <Translate>Powerful Automation Tools</Translate>
        </Heading>
        <p className={clsx("text--center", styles.sectionSubtitle)}>
          <Translate>Everything you need to automate your iOS device</Translate>
        </p>
        <div className="row">
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageCompatibility() {
  return (
    <section className={styles.compatibility}>
      <div className="container">
        <Heading as="h2" className={clsx("text--center", styles.sectionTitle)}>
          <Translate>Compatible with iOS 14+</Translate>
        </Heading>
        <p className={clsx("text--center", styles.sectionSubtitle)}>
          <Translate>
            XXTouch Elite works with modern jailbreaks and TrollStore:
          </Translate>
        </p>
        <div className={styles.compatList}>
          <a
            href="https://unc0ver.dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.jailbreakItem}
          >
            <div className={styles.jailbreakIconWrapper}>
              <img
                src={useBaseUrl("img/unc0ver.png")}
                alt="unc0ver"
                className={styles.jailbreakIcon}
              />
            </div>
            <span>unc0ver</span>
          </a>
          <a
            href="https://taurine.app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.jailbreakItem}
          >
            <div className={styles.jailbreakIconWrapper}>
              <img
                src={useBaseUrl("img/taurine.png")}
                alt="Taurine"
                className={styles.jailbreakIcon}
              />
            </div>
            <span>Taurine</span>
          </a>
          <a
            href="https://zhuxinlang.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.jailbreakItem}
          >
            <div className={styles.jailbreakIconWrapper}>
              <img
                src={useBaseUrl("img/xinaa15.png")}
                alt="XinaA15"
                className={styles.jailbreakIcon}
              />
            </div>
            <span>XinaA15</span>
          </a>
          <a
            href="https://palera.in"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.jailbreakItem}
          >
            <div className={styles.jailbreakIconWrapper}>
              <img
                src={useBaseUrl("img/palera1n.png")}
                alt="palera1n"
                className={styles.jailbreakIcon}
              />
            </div>
            <span>palera1n</span>
          </a>
          <a
            href="https://ellekit.space/dopamine/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.jailbreakItem}
          >
            <div className={styles.jailbreakIconWrapper}>
              <img
                src={useBaseUrl("img/dopamine.png")}
                alt="Dopamine"
                className={styles.jailbreakIcon}
              />
            </div>
            <span>Dopamine</span>
          </a>
          <a
            href="https://ios.cfw.guide/installing-trollstore"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.jailbreakItem}
          >
            <div className={styles.jailbreakIconWrapper}>
              <img
                src={useBaseUrl("img/trollstore.png")}
                alt="TrollStore"
                className={styles.jailbreakIcon}
              />
            </div>
            <span>TrollStore</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function HomepageCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.ctaBgPattern}></div>
      <div className="container">
        <div className={styles.ctaContent}>
          <Heading as="h2" className={clsx("text--center", styles.ctaTitle)}>
            <Translate>Ready to automate your iOS device?</Translate>
          </Heading>
          <p className={clsx("text--center", styles.ctaSubtitle)}>
            <Translate>
              Join thousands of users who have transformed how they interact
              with their devices.
            </Translate>
          </p>
          <div className={styles.ctaAction}>
            <Link
              className={clsx("button", styles.button, styles.buttonCTA)}
              to="/docs/tutorial/intro"
            >
              <Translate>Get Started Now</Translate>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - iOS Automation Framework`}
      description="XXTouch Elite is a full-fledged automation framework for jailbroken or TrollStore-supported iOS devices, offering touch automation, image recognition, and deep system integration."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageCompatibility />
        <HomepageCTA />
      </main>
    </Layout>
  );
}
