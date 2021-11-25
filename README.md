## Wave Market

**update .env.production**

**Deploy**

```bash
yarn
yarn build
pm2 start npm --name "wavemarket" -- start
```

**Update**

```bash
git pull
yarn
yarn build
pm2 restart wavemarket
```
