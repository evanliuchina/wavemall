/**
 * @author weixuefeng@diynova.com
 * @time  2021/8/20 3:55 下午
 * @description:
 * @copyright (c) 2021 Newton Foundation. All rights reserved.
 */

import React from 'react'
import NumberFormat from 'react-number-format'
import { formatEther } from 'ethers/lib/utils'
import { cSymbol, pageSize, POLLING_INTERVAL } from '../../constant'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'
import { useOwner } from '../../hooks/useOwner'
import { GET_BID_HISTORY } from '../../services/queries/bidHistory'
import { useWeb3React } from '@web3-react/core'
import { MakeBidModal } from '../Modal/MakeBidModal'
import PutOffSaleModal from '../Modal/PutOffSaleModal'
import { useNFTExchangeContract } from '../../hooks/useContract'
import { DateTime } from '../../functions/DateTime'

export function NFTEnglandAuction(props) {
  // isOwner: cancel auction
  // is now owner: make bid, cat bid history.
  let { t } = useTranslation()
  const { account } = useWeb3React()
  const { nftToken, nftTokenMetaData, contractFee } = props
  const isOwner = useOwner(nftToken.orders[0].owner.id)
  const where = { askOrder: nftToken.orders[0].id }
  const exchangeContract = useNFTExchangeContract()

  const { data, loading, error } = useQuery(GET_BID_HISTORY, {
    variables: {
      skip: 0,
      first: pageSize,
      orderBy: 'createdAt',
      orderDirection: 'desc',
      where: where
    },
    fetchPolicy: 'cache-and-network',
    pollInterval: POLLING_INTERVAL
  })
  const myBidWhere = { bidder: account.toLowerCase(), askOrder: nftToken.orders[0].id }
  const {
    data: myBid,
    loading: myBidLoading,
    error: myBidError
  } = useQuery(GET_BID_HISTORY, {
    variables: {
      skip: 0,
      first: 1,
      orderBy: 'createdAt',
      orderDirection: 'desc',
      where: myBidWhere
    },
    fetchPolicy: 'cache-and-network'
  })

  if (error || myBidError) {
    return <>Error :(</>
  }
  if (loading || myBidLoading) {
    return <>loading...</>
  }
  const bidHistories = data.bidOrders
  const hasBid = bidHistories.length > 0
  const highestBid = bidHistories.length === 0 ? '0' : bidHistories[0].price
  const deadLine: number = nftToken.orders[0].deadline
  const myLastBidPrice = myBid.bidOrders.length === 0 ? '0' : parseInt(formatEther(myBid.bidOrders[0].price))
  const title = myLastBidPrice > 0 ? t('raise bid') : t('make bid')
  const isHigher = highestBid > 0 && myBid.bidOrders.length > 0 && highestBid === myBid.bidOrders[0].price
  const isEnded = Date.now() / 1000 > deadLine
  const canClaimNFT = isEnded && isHigher

  function claimNft() {
    const askOrderHash = nftToken.orders[0].id
    const override = {
      value: myBid.bidOrders[0].price
    }
    exchangeContract
      .claimByHash(askOrderHash, override)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const newProp = {
    ...props,
    title
  }
  return (
    <section className="offer-card auction mobile">
      <header>
        <div className="price" hidden={bidHistories.length > 0}>
          <h4>{t('starting price')}</h4>
          <h3>
            <NumberFormat
              thousandSeparator={true}
              displayType={'text'}
              decimalScale={0}
              fixedDecimalScale={true}
              value={formatEther(nftToken.orders[0].startPrice + '')}
            />{' '}
            {cSymbol()}
          </h3>
        </div>

        <div className="price" hidden={bidHistories.length === 0}>
          <h4>{t('highest bid')}</h4>
          <h3>
            <NumberFormat
              thousandSeparator={true}
              displayType={'text'}
              decimalScale={0}
              fixedDecimalScale={true}
              value={formatEther(highestBid)}
            />{' '}
            {cSymbol()}
          </h3>
        </div>

        <div className="status">
          <h4>{t('auction_ends_in')}</h4>
          <p title={DateTime(deadLine * 1000)}>{DateTime(deadLine * 1000)}</p>
          <span hidden>
            {/*{t("round")} {auction.round.toString()}: #{startTime.toString()} - #{endTime.toString()}*/}
          </span>
        </div>
      </header>

      <footer className="">
        <p hidden={isOwner}>
          {t('my bid')}: {myLastBidPrice} {cSymbol()}
        </p>
        <div hidden={isOwner || isEnded}>
          <MakeBidModal {...newProp} />
        </div>
        <div hidden={!isOwner || hasBid}>
          <PutOffSaleModal {...newProp} />
        </div>
        <div hidden={!canClaimNFT}>
          <button
            onClick={() => {
              claimNft()
            }}
            type="button"
            className="primary yellow small"
          >
            {t('claim nft')}
          </button>
        </div>
      </footer>

      <div className="tfoot"></div>
    </section>
  )
}