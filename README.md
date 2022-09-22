### Web UI Implementation for Crossplain (Control plane for infrastructure)

## Overview

### Technology Stack
* SvelteKit
* TailwindCSS
* TypeScript

### Run Locally

```bash
git clone
cd crossplain-web
pnpm install
pnpm run dev
```

### Build. Docker

```bash
docker build -t crossplain/web-ui .
docker run -p 3000:3000 crossplain/web-ui
```
