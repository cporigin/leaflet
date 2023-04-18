import { MainRuntime } from '@teambit/cli';
import { ReactAspect, ReactMain } from '@teambit/react';
import { EnvsAspect, EnvsMain } from '@teambit/envs';
import { ReactWithMuiAspect } from './react-with-mui.aspect';
// import { previewConfigTransformer, devServerConfigTransformer } from './webpack/webpack-transformers';

export class ReactWithMuiMain {
  static slots = [];

  static dependencies = [ReactAspect, EnvsAspect];

  static runtime = MainRuntime;

  static async provider([react, envs]: [ReactMain, EnvsMain]) {
    const templatesReactEnv = envs.compose(react.reactEnv, [
      /**
       * override dependencies here
       */
      react.overrideDependencies({
        dependencies: {
          '@mui/material': '5.12.1',
          react: '^18.2.0',
          'react-dom': '^18.2.0',
          '@learnbit-react/material-ui.theme.theme-provider': '0.0.1'
        },
        devDependencies: {
          '@mui/material': '5.12.1',
          react: '^18.2.0',
          'react-dom': '^18.2.0',
          '@learnbit-react/material-ui.theme.theme-provider': '0.0.1'
        },
        peerDependencies: {
          '@mui/material': {
            version: '5.12.1',
            resolveFromEnv: true
          },
          react: {
            version: '^18.2.0',
            resolveFromEnv: true
          },
          'react-dom': {
            version: '^18.2.0',
            resolveFromEnv: true
          },
          '@learnbit-react/material-ui.theme.theme-provider': {
            version: '0.0.1',
            resolveFromEnv: true
          }
        }
      }),
      /**
       * override the ESLint default config here then check your files for lint errors
       * @example
       * bit lint
       * bit lint --fix
       */
      react.useEslint({
        transformers: [
          (config) => {
            config.setRule('no-console', ['error']);
            return config;
          }
        ]
      }),

      /**
       * override the Prettier default config here the check your formatting
       * @example
       * bit format --check
       * bit format
       */
      react.usePrettier({
        transformers: [
          (config) => {
            config.setKey('tabWidth', 2);
            return config;
          }
        ]
      })
    ]);
    envs.registerEnv(templatesReactEnv);
    return new ReactWithMuiMain();
  }
}

ReactWithMuiAspect.addRuntime(ReactWithMuiMain);
