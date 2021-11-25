import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export default function Home() {
  const { t } = useTranslation()
  return (
    <>
      {/* Hero section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 sm:py-8">
          <div className="relative bg-black dark:bg-black rounded-3xl sm:overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 bg-cyan-600 rounded-3xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/assets/home/hero-bg.jpg"
                className="h-full w-full object-cover rounded-3xl"
              >
                <source src="/assets/home/hero-bg.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="relative px-4 py-48 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <p className="mt-6 max-w-lg mx-auto text-center font-extralight text-3xl sm:text-5xl text-white sm:max-w-3xl uppercase">
                an open global digital entertainment ecosystem
              </p>
              <div className="mt-8 flex justify-center">
                <div className="inline-flex rounded-md shadow">
                  <Link href="/browse">
                    <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md !text-white bg-mainColor-500 hover:bg-mainColor-600 hover:text-white hover:scale-105">
                      {t('home page.browse market')}
                    </a>
                  </Link>
                </div>
                <div className="ml-3 inline-flex">
                  <Link href="/create">
                    <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md !text-mainColor-500 bg-white hover:bg-gray-100 hover:text-mainColor-500 hover:scale-105">
                      {t('create nft')}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
