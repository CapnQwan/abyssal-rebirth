import { baseVitestConfig } from '@cult-frog/tooling/vitest/base';

export default baseVitestConfig({
  aliasName: '@abyssal-rebirth/shared',
  cwd: import.meta.dirname,
  testOverrides: { globals: false },
});
