'use client'

import Link, { LinkProps } from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'


interface TransitionLinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
}

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const TransitionLink = ({ href, children, ...props }: TransitionLinkProps) => {
    const router = useRouter()

    const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const body = document.querySelector('body')
        body?.classList.add('page-transition')
        await sleep(500)
        router.push(href)
        await sleep(500)
        body?.classList.remove('page-transition')
    }
  return (
    <Link onClick={(e) => handleTransition(e)} href={href} {...props}>{children}</Link>
  )
}

export default TransitionLink