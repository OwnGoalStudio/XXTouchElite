import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const features = [
  {
    title: 'Touch Automation',
    description: (
      <>
        Record and playback taps, swipes, and gestures with high precision.
        Support for multi-touch simulation and 3D Touch pressure sensitivity.
      </>
    ),
    icon: '🖱️',
  },
  {
    title: 'Image Recognition',
    description: (
      <>
        Ultra-fast screenshot capture with OpenCV-powered detection.
        Find images and text with pixel-perfect accuracy in milliseconds.
      </>
    ),
    icon: '🔍',
  },
  {
    title: 'System Integration',
    description: (
      <>
        Direct access to SpringBoard UI elements, app sandboxes,
        and system configuration. Control display, network, and more.
      </>
    ),
    icon: '⚙️',
  },
  {
    title: 'Lua Scripting',
    description: (
      <>
        Full Lua 5.3 support with debugging tools. Create complex
        automation workflows with an easy-to-learn language.
      </>
    ),
    icon: '📝',
  },
  {
    title: 'File Management',
    description: (
      <>
        Browse local files, edit permissions, import via WebDAV,
        and handle ZIP compression/decompression with ease.
      </>
    ),
    icon: '📁',
  },
  {
    title: 'Developer Tools',
    description: (
      <>
        Built-in editor with syntax highlighting, breakpoints,
        variable inspection, and error stack tracing.
      </>
    ),
    icon: '🛠️',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles.heroBgLogo}>
        <img src={useBaseUrl('img/XXTouch_Logo.svg')} alt="" />
      </div>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={clsx("hero__title", styles.heroTitle)}>
              XXTouch <span className={styles.eliteText}>Elite</span>
            </Heading>
            <p className={clsx("hero__subtitle", styles.heroSubtitle)}>{siteConfig.tagline}</p>

            <div className={styles.buttons}>
              <Link
                className={clsx('button', styles.button, styles.buttonPrimary)}
                to="/docs/tutorial/intro">
                Get Started <span className={styles.buttonIcon}>→</span>
              </Link>
              <Link
                className={clsx('button', styles.button, styles.buttonOutline)}
                to="https://havoc.app/package/xxtouchelite">
                Get on Havoc <span className={styles.downloadIcon}>↓</span>
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.phoneFrame}>
              <video
                src={useBaseUrl('assets/compressed.mp4')}
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

function Feature({title, description, icon}) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
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
        <Heading as="h2" className={clsx('text--center', styles.sectionTitle)}>
          Powerful Automation Tools
        </Heading>
        <p className={clsx('text--center', styles.sectionSubtitle)}>
          Everything you need to automate your iOS device
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
        <Heading as="h2" className={clsx('text--center', styles.sectionTitle)}>
          Compatible with iOS 14+
        </Heading>
        <p className={clsx('text--center', styles.sectionSubtitle)}>
          XXTouch Elite works with modern jailbreaks including:
        </p>
        <div className={styles.compatList}>
          <a href="https://unc0ver.dev" target="_blank" rel="noopener noreferrer" className={styles.jailbreakItem}>
            <div className={styles.jailbreakIconWrapper}>
              <img src={useBaseUrl('img/unc0ver.png')} alt="unc0ver" className={styles.jailbreakIcon} />
            </div>
            <span>unc0ver</span>
          </a>
          <a href="https://taurine.app" target="_blank" rel="noopener noreferrer" className={styles.jailbreakItem}>
            <div className={styles.jailbreakIconWrapper}>
              <img src={useBaseUrl('img/taurine.png')} alt="Taurine" className={styles.jailbreakIcon} />
            </div>
            <span>Taurine</span>
          </a>
          <a href="https://palera.in" target="_blank" rel="noopener noreferrer" className={styles.jailbreakItem}>
            <div className={styles.jailbreakIconWrapper}>
              <img src={useBaseUrl('img/palera1n.png')} alt="palera1n" className={styles.jailbreakIcon} />
            </div>
            <span>palera1n</span>
          </a>
          <a href="https://ellekit.space/dopamine/" target="_blank" rel="noopener noreferrer" className={styles.jailbreakItem}>
            <div className={styles.jailbreakIconWrapper}>
              <img src={useBaseUrl('img/dopamine.png')} alt="Dopamine" className={styles.jailbreakIcon} />
            </div>
            <span>Dopamine</span>
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
          <Heading as="h2" className={clsx('text--center', styles.ctaTitle)}>
            Ready to automate your iOS device?
          </Heading>
          <p className={clsx('text--center', styles.ctaSubtitle)}>
            Join thousands of users who have transformed how they interact with their devices.
          </p>
          <div className={styles.ctaAction}>
            <Link
              className={clsx('button', styles.button, styles.buttonCTA)}
              to="/docs/tutorial/intro">
              Get Started Now <span className={styles.buttonIcon}>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - iOS Automation Framework`}
      description="XXTouch Elite is a full-fledged automation framework for jailbroken iOS devices, offering touch automation, image recognition, and deep system integration.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageCompatibility />
        <HomepageCTA />
      </main>
    </Layout>
  );
}
