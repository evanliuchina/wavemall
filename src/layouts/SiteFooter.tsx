import { WaveMarketLogo, WaveMarketText } from 'components/icons'
import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

function SiteFooter() {
  const { t } = useTranslation()
  return (
    <footer id="main-footer" aria-labelledby="footer">
      <div className="wrapper">
        <div>
          <div className="brand">
            <header>
              <img src="/assets/wavemarket-logo.svg" alt="WaveMarket" className="h-12 w-auto mr-2" />{' '}
              <WaveMarketText className="h-8 w-auto" />
            </header>
            <p>{t('global.slogan')}</p>
          </div>
          <div className="sections">
            <section>
              <div>
                <h3>{t('Marketplace')}</h3>
                <ul>
                  <li>
                    <Link href="/browse">{t('browse')}</Link>
                  </li>
                  <li>
                    <Link href="/activity">{t('Activity')}</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3>{t('My Account')}</h3>
                <ul>
                  <li>
                    <Link href="/me">{t('my nfts')}</Link>
                  </li>
                  <li>
                    <Link href="/create">{t('create')}</Link>
                  </li>
                  <li>
                    <Link href="/me/orders-sell">{t('sells')}</Link>
                  </li>
                  <li>
                    <Link href="/me/orders-buy">{t('buys')}</Link>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
        <div className="cpr">© 2021 Wave Market {t('global.all rights reserved')}</div>
      </div>
    </footer>
  )
}

export default SiteFooter
