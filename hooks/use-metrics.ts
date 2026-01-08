"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"

const prodMetricaId = 106168252

declare global {
  interface Window {
    ym?: (
      id: number,
      method: string,
      params?: Record<string, any>
    ) => void
  }
}

export function useMetrics() {
  const { user, isLoaded } = useUser()
  const hostname = typeof window !== "undefined" ? window.location.hostname : ""
  const isLocalhost = hostname.includes("localhost")

  const metrikaId = prodMetricaId

  useEffect(() => {
    if (!isLoaded) return
    if (isLocalhost) return
    if (!user?.username) return

    if (window.ym) {
      window.ym(metrikaId, "setUserParams", {
        UserID: user.username,
      })
      return
    }

    ;(function (
      m: Record<string, any>,
      e: Document,
      t: string,
      r: string,
      i: string,
      k?: HTMLScriptElement,
      a?: HTMLScriptElement
    ) {
      m[i] =
        m[i] ||
        function (...args: any[]) {
          ;(m[i].a = m[i].a || []).push(args)
        }
      m[i].l = Date.now()
      k = e.createElement(t) as HTMLScriptElement
      a = e.getElementsByTagName(t)[0] as HTMLScriptElement
      k.async = true
      k.src = r
      if (a && a.parentNode) {
        a.parentNode.insertBefore(k, a)
      }
    })(window, document, "script", `https://mc.yandex.ru/metrika/tag.js?id=${metrikaId}`, "ym")

    const initMetrika = () => {
      if (window.ym) {
        window.ym(metrikaId, "init", {
          clickmap: false,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: false,
          userParams: { UserID: user.username },
        })
        console.log("Initialized Yandex Metrics for:", user.username, "ID:", metrikaId)
      } else {
        setTimeout(initMetrika, 100)
      }
    }

    initMetrika()
  }, [metrikaId, user?.username, isLoaded, isLocalhost])
}

