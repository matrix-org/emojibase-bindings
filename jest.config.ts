import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/test/**/*-test.[jt]s?(x)"],
};

export default config;
