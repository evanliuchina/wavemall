import React from 'react'

const MainLoadingView = props => {
  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto">
          <img src="/assets/wavemarket-logo.svg" className="w-24 h-24 animate-ping" alt="" />
        </div>
      </div>
    </>
  )
}
export default MainLoadingView
