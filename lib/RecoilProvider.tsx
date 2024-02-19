"use client"
import React, { Children } from 'react'
import { RecoilRoot } from 'recoil'

const RecoilProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
        {children}
    </RecoilRoot>
  )
}

export default RecoilProvider