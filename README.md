# Holocene

Temporal's shared UI library

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Packaging

To link and watch for changes 

```bash
cd package
npm link
cd ..
npm run package -- --watch
```

In ui or cloud-ui

```bash
npm link holocene
```


To publish to NPM registry

```bash
npm run package
cd package
npm publish
```
