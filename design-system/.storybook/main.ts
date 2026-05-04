// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from '@storybook/react-vite';
import { resolve, dirname } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": ["@storybook/addon-onboarding", "@storybook/addon-docs"],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  viteFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': resolve(__dirname, '../src'),
      };
    }
    config.plugins = [...(config.plugins || []), tsconfigPaths()];
    return config;
  },
  staticDirs: [{ from: '../public', to: '/' }],
  managerHead: (head) => `
    ${head}
    <style>
      .sidebar-header img {
        width: 120px !important;
        max-width: none !important;
        height: auto !important;
        margin: 8px 0 !important;
      }
      .sidebar-header a {
        width: auto !important;
        display: block !important;
      }
    </style>
  `,
};

export default config;