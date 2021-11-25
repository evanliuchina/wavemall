import { useTranslation } from 'react-i18next'
import Link from 'next/link'

import { useQuery } from '@apollo/client'
import { NFTokenDataList, OrderDirection } from '../entities'
import { NFT_TOKEN_LIST } from '../services/queries/list'
import { POLLING_INTERVAL } from '../constant'
import { useState } from 'react'
import { NEWTON_COLLECTION_NFT_CONTRACT } from '../constant/settings'
import { useTokenDescription } from 'hooks/useTokenDescription'
import { getNftDetailPath } from 'functions'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

SwiperCore.use([Autoplay, Pagination, Navigation])

export default function Home() {
  const { t } = useTranslation()
  const [orderBy, setOrderBy] = useState('mintBlock')
  const [orderDirection, setOrderDirection] = useState(OrderDirection.DESC)
  const where = { contract: NEWTON_COLLECTION_NFT_CONTRACT.toLowerCase() }
  const [filter, setFilter] = useState(where)
  const { loading, data, fetchMore, error } = useQuery<NFTokenDataList>(NFT_TOKEN_LIST, {
    variables: {
      skip: 0,
      first: 20,
      orderBy: orderBy,
      orderDirection: orderDirection,
      where: filter
    },
    fetchPolicy: 'no-cache',
    pollInterval: POLLING_INTERVAL
  })

  if (error) {
    console.log(error)
    return <HomeHero />
  }

  if (loading) {
    return (
      <>
        <HomeHero />
        <div className="">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:py-8 lg:px-8">
            <p className="text-center text-base font-semibold uppercase text-gray-800 dark:text-white tracking-wider">
              Featured: Newton Collections
            </p>
          </div>
        </div>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          pagination={{
            clickable: true
          }}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          breakpoints={{
            '640': {
              slidesPerView: 2,
              spaceBetween: 10
            },
            '768': {
              slidesPerView: 3,
              spaceBetween: 10
            },
            '1024': {
              slidesPerView: 5,
              spaceBetween: 10
            }
          }}
          className="homeSwiper"
        >
          <SwiperSlide>
            <Loader1 />
          </SwiperSlide>
          <SwiperSlide>
            <Loader1 />
          </SwiperSlide>
          <SwiperSlide>
            <Loader1 />
          </SwiperSlide>
          <SwiperSlide>
            <Loader1 />
          </SwiperSlide>
          <SwiperSlide>
            <Loader1 />
          </SwiperSlide>
          <SwiperSlide>
            <Loader1 />
          </SwiperSlide>
        </Swiper>
      </>
    )
  }

  function uniqBy(a, key) {
    let seen = new Set()
    return a.filter(item => {
      let k = key(item)
      return seen.has(k) ? false : seen.add(k)
    })
  }
  const uniqData = uniqBy(data?.tokens ?? [], item => {
    return item.id
  })

  function onFetchMore() {
    fetchMore({
      variables: {
        skip: data.tokens.length
      }
    })
  }

  const info = {
    data: uniqData,
    onFetchMore,
    setOrderBy,
    setOrderDirection,
    setFilter,
    where,
    showSubNav: false
  }

  return (
    <>
      <HomeHero />
      <div className="">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:py-8 lg:px-8">
          <p className="text-center text-base font-semibold uppercase text-gray-800 dark:text-white tracking-wider">
            Featured: Newton Collections
          </p>
        </div>
      </div>
      <HomeNewtonCollection {...info} />
    </>
  )
}

{
  /* Hero section */
}

let HomeHero = () => {
  const { t } = useTranslation()
  return (
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
          <div className="relative px-4 py-32 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
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
  )
}

export function HomeNewtonCollection(props) {
  const { data } = props

  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{
          clickable: true
        }}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        breakpoints={{
          '640': {
            slidesPerView: 2,
            spaceBetween: 10
          },
          '768': {
            slidesPerView: 3,
            spaceBetween: 10
          },
          '1024': {
            slidesPerView: 5,
            spaceBetween: 10
          }
        }}
        className="homeSwiper"
      >
        {data &&
          data.map(item => {
            return (
              <SwiperSlide key={item.id}>
                <NFTListCard item={item} />
              </SwiperSlide>
            )
          })}
      </Swiper>
    </>
  )
}

function NFTListCard(props) {
  const { item } = props
  const tokenMetaData = useTokenDescription(item.uri)
  const tokenProfile = <div className="title">{tokenMetaData.tokenName}</div>
  return (
    <div className="item">
      <Link href={getNftDetailPath(item.id)}>
        <a>
          <div className="cover">
            <div className="perfect_square">
              <img src={tokenMetaData.tokenImage} alt="" />
            </div>
          </div>
          {tokenProfile}
        </a>
      </Link>
    </div>
  )
}

function Loader1() {
  return (
    <div className="item loading">
      <a>
        <div className="cover">
          <div className="perfect_square"></div>
        </div>
        <div className="title">~</div>
      </a>
    </div>
  )
}
