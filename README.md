[![NPM](https://img.shields.io/npm/v/@map.ir/vector-style-editor.svg)](https://www.npmjs.com/package/@map.ir/vector-style-editor)
![Release](https://github.com/map-ir/vector-style-editor/workflows/Release/badge.svg)

# mapir-vector-style-editor

| Prop              | Type                                                                              | Description                                        | Default | Require |
| ----------------- | --------------------------------------------------------------------------------- | -------------------------------------------------- | ------- | ------- |
| map               | [MapOptions](https://maplibre.org/maplibre-gl-js-docs/api/map/#map-parameters)    |                                                    |         | No      |
| locale            | 'fa' OR 'en'                                                                      | Language of editor                                 | 'en'    | No      |
| styleURL          | string                                                                            | URL of style for edit                              | -       | Yes     |
| sprite            | string                                                                            | URL of sprite of style                             | -       | No      |
| title             | string                                                                            | Tiltle of editor                                   | -       | No      |
| columns           | string[]                                                                          | Columns of dataset                                 | -       | No      |
| className         | string                                                                            |                                                    | -       | No      |
| onSubmit          | (arg: [StyleSpecification](https://docs.mapbox.com/help/glossary/style/)) => void | Callback that is invoked when submitting           | -       | No      |
| onCancel          | (arg: [StyleSpecification](https://docs.mapbox.com/help/glossary/style/)) => void | Callback that is invoked when canceling            | -       | No      |
| getDistinctValues | (arg: string) => Promise<any>                                                     | Callback that is invoked when a column is selected | -       | No      |

| CSS Variables         | Value                                                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| --SE-color-primary    | #ea4c89                                                                                                                     |
| --SE-color-primary-20 | #ea4c8920                                                                                                                   |
| --SE-color-secondry   | #2e0767                                                                                                                     |
| --SE-shade-1          | #1c1c1c                                                                                                                     |
| --SE-shade-2          | #808080                                                                                                                     |
| --SE-shade-3          | #C2C2C2                                                                                                                     |
| --SE-shade-4          | #E8E8E8                                                                                                                     |
| --SE-shade-5          | #E0E0E0                                                                                                                     |
| --SE-light-1          | #ffffff                                                                                                                     |
| --SE-light-2          | #FAFAFA                                                                                                                     |
| --SE-success-1        | #20A76E                                                                                                                     |
| --SE-fail-1           | #D10328                                                                                                                     |
| --SE-radius-4         | 16px                                                                                                                        |
| --SE-radius-8         | 8px                                                                                                                         |
| --SE-radius-16        | 4px                                                                                                                         |
| --SE-font-family      | -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif |

You can rewrite this variables.

## Install

```bash
npm install @map.ir/vector-style-editor
```

## Develop

use the `dev` script:

```bash
npm run dev
```

## License

MIT © [map-ir](LICENSE)
