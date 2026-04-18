import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger)

  // 1. Reveal 指令
  nuxtApp.vueApp.directive('scroll-reveal', {
    mounted(el: HTMLElement, binding: any) {
      const opt = binding.value || {}
      gsap.set(el, { y: opt.y ?? 40, opacity: 0, scale: opt.scale ?? 0.98, visibility: 'hidden' })
      
      gsap.to(el, {
        y: 0, opacity: 1, scale: 1, duration: 1, delay: opt.delay ?? 0,
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          toggleActions: "play none none none",
          onEnter: () => (el.style.visibility = 'visible')
        }
      })
    },
    unmounted(el: HTMLElement) {
      ScrollTrigger.getAll().forEach(t => { if (t.vars.trigger === el) t.kill() })
    }
  })

  // 2. Group 指令
  nuxtApp.vueApp.directive('scroll-group', {
    mounted(el: HTMLElement, binding: any) {
      const opt = binding.value || {}
      const rawTargets = opt.selector ? el.querySelectorAll(opt.selector) : el.children
      const targets = Array.from(rawTargets) as HTMLElement[]
      
      if (targets.length === 0) return

      gsap.set(targets, { y: opt.y ?? 40, opacity: 0, scale: opt.scale ?? 0.98, visibility: 'hidden' })

      gsap.to(targets, {
        y: 0, opacity: 1, scale: 1, duration: 1,
        stagger: opt.stagger ?? 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          onEnter: () => {
            targets.forEach((t) => (t.style.visibility = 'visible'))
          }
        }
      })
    },
    unmounted(el: HTMLElement) {
      ScrollTrigger.getAll().forEach(t => { if (t.vars.trigger === el) t.kill() })
    }
  })

  // 3. Count 指令
  nuxtApp.vueApp.directive('count', {
    mounted(el: HTMLElement, binding: any) {
      const rawValue = binding.value || el.innerText
      const match = rawValue.match(/(\d+\.?\d*)/)
      const targetNumber = match ? parseFloat(match[0]) : 0
      const prefix = rawValue.split(match ? match[0] : '')[0] || ''
      const suffix = match ? rawValue.substring(match[0].length) : ''

      const obj = { val: 0 }

      gsap.to(obj, {
        val: targetNumber,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true
        },
        onUpdate: () => {
          const displayValue = targetNumber % 1 !== 0 ? obj.val.toFixed(1) : Math.floor(obj.val)
          el.innerText = `${prefix}${displayValue}${suffix}`
        }
      })
    }
  })
})