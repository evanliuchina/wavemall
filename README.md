## Wave Mall

**update .env.production**

**Deploy**

```bash
yarn
yarn build
pm2 start npm --name "wavemall" -- start
```

**Update**

```bash
git pull
yarn
yarn build
pm2 restart wavemall
```
