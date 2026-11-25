import { baseVitestConfig } from '@cult-frog/tooling/vitest/base';

export default baseVitestConfig({
  aliasName: '@abyssal-rebirth/core',
  cwd: import.meta.dirname,
  testOverrides: { globals: false },
});
