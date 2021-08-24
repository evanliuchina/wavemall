/**
 * useTokenDescription
 *
 * Provide the token uri, and parse the uri from ipfs, ar, https ...
 * and return the token info,like: tokenName, tokenDescription, nftType(image or video)
 * tokenImage and tokenVideo...
 *
 * usage:
 * ```
 * const { tokenName, tokenDescription, nftType, tokenImage, tokenVideo } = useTokenDescription(tokenUri)
 * ```
 */
import { getFromIPFS } from 'functions'
import { UriResolver } from 'functions/UriResolver'
import { useEffect, useState } from 'react'

export class TokenMetaData {
  tokenName: string = ''
  tokenDescription: string = ''
  nftType: string = 'image'
  tokenImage: string = ''
  tokenVideo: string = ''
}

export async function parseTokenMetaData(uri): Promise<TokenMetaData> {
  const data = new TokenMetaData()
  try {
    const ipfsHash = uri.substr(uri.lastIndexOf('/') + 1)
    const tokenExtraInfo = await getFromIPFS(ipfsHash)
    if (!tokenExtraInfo) {
      return data
    }
    // Video Support, using `video` key
    if (tokenExtraInfo.video !== undefined) {
      const _videoUri = UriResolver(tokenExtraInfo.video.substring(tokenExtraInfo.video.lastIndexOf('/')))
      data.nftType = 'video'
      data.tokenVideo = _videoUri
    }

    // TBD: support for `media`:[], mime:video|audio|image/type
    // TBD: tag
    // TBD: attributes

    if (tokenExtraInfo.description !== undefined) {
      data.tokenName = tokenExtraInfo.name
    }

    if (tokenExtraInfo.image !== undefined) {
      const imageUri = UriResolver(tokenExtraInfo.image.substring(tokenExtraInfo.image.lastIndexOf('/')))
      data.tokenImage = imageUri
    }

    if (tokenExtraInfo.description !== undefined) {
      data.tokenDescription = tokenExtraInfo.description
    }
    return data
  } catch (e) {
    console.error(e)
    return data
  }
}

export function useTokenDescription(uri) {
  let data = new TokenMetaData()
  const [tokenMetaData, setTokenMetaData] = useState<TokenMetaData>(data)
  useEffect(() => {
    if (!uri) {
      return
    }
    parseTokenMetaData(uri)
      .then(data => {
        setTokenMetaData(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [uri])
  return tokenMetaData
}