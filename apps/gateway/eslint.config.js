import baseConfig from "@portfolio/config-eslint";

export default [
  ...baseConfig,
  {
    ignores: ["dist", "node_modules"],
  },
];
