import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'XXTouch Elite',
  tagline: 'Powerful and flexible automation tool for iOS since 2015.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://xxtou.ch',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'OwnGoalStudio', // Usually your GitHub org/user name.
  projectName: 'XXTouchElite', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/OwnGoalStudio/XXTouchElite/tree/main/',
        },
        blog: {
          showReadingTime: true,
          showLastUpdateTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/OwnGoalStudio/XXTouchElite/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'ignore',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'XXTouch Elite',
      logo: {
        alt: 'XXTouch Elite Logo',
        src: 'img/XXTouch_Logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {
          type: 'docSidebar',
          sidebarId: 'luaManualSidebar',
          position: 'left',
          label: 'Manual',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          to: '/library',
          label: 'Library',
          position: 'left',
        },
        {
          href: 'https://elite.82flex.com',
          label: 'Open API',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/tutorial/intro',
            },
            {
              label: 'Manual',
              to: '/docs/lua-manual/intro',
            },
            {
              label: 'Open API',
              href: 'https://elite.82flex.com',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/xxtouch',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/xxtouch_chat',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/RTyMX6c9',
            },
            {
              label: 'X',
              href: 'https://x.com/82Flex',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Library',
              to: '/library',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/OwnGoalStudio/XXTouchElite',
            },
          ],
        },
      ],
      copyright: `Copyright © 2014-${new Date().getFullYear()} OwnGoal Studio. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['lua'],
    },
  } satisfies Preset.ThemeConfig,

  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: "/",
        blogRouteBasePath: "/blog",
      },
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1280,    // max resized image's size.
        min: 640,     // min resized image's size. if original is lower, use that size.
        steps: 4,     // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
  ],
};

export default config;
