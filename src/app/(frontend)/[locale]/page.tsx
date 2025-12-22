import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { SplitTextComponent } from '@/components/common/split-text'
import AnimateOnScroll from '@/components/common/animate-on-scroll'
import { GlassElement } from '@/components/template/GlassElement/GlassElement'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const tHomepage = await getTranslations('Homepage')
  const tGeneralButton = await getTranslations('General.Button')

  return (
    <main id="main" className="index-page">
      <section data-section="homepage-hero" className="header-padding">
        <div className="sc-inner pc-t-150 pc-b-150">
          <div className="container" style={{ position: 'relative' }}>
            <GlassElement
              width="21vw"
              height="21vw"
              radius="50%"
              widthMb="31vw"
              heightMb="31vw"
              radiusMb="50%"
              depth={10}
              blur={2}
              chromaticAberration={2}
              debug={false}
              animation={3}
              pcPosition={{ top: '25%', left: '10%' }}
              mbPosition={{ top: '20%', left: '0%' }}
            />

            <GlassElement
              width="14vw"
              height="14vw"
              radius="50%"
              widthMb="21vw"
              heightMb="21vw"
              radiusMb="50%"
              depth={12}
              blur={4}
              chromaticAberration={1}
              debug={false}
              animation={2}
              pcPosition={{ top: '-2%', left: '59%' }}
              mbPosition={{ top: '-2%', left: '75%' }}
            />

            <div className="sc-title-text">
              <SplitTextComponent
                as="p"
                className="vw-ttl"
                type="chars,words"
                from={{ y: '100%' }}
                to={{ y: '0%' }}
                duration={0.8}
                stagger={0.01}
                delay={0.3}
              >
                Design Studio
              </SplitTextComponent>

              <SplitTextComponent
                as="p"
                className="vw-ttl"
                type="chars,words"
                from={{ y: '100%' }}
                to={{ y: '0%' }}
                duration={0.8}
                stagger={0.01}
                delay={0.5}
              >
                With
              </SplitTextComponent>

              <SplitTextComponent
                as="p"
                className="vw-ttl"
                type="chars,words"
                from={{ y: '100%' }}
                to={{ y: '0%' }}
                duration={0.8}
                stagger={0.01}
                delay={0.7}
              >
                Creativity and
              </SplitTextComponent>

              <SplitTextComponent
                as="p"
                className="vw-ttl"
                type="chars,words"
                from={{ y: '100%' }}
                to={{ y: '0%' }}
                duration={0.8}
                stagger={0.01}
                delay={0.9}
              >
                Passion
              </SplitTextComponent>
            </div>

            <div className="block-content-start">
              <div className="block-body">
                <AnimateOnScroll triggerClass="fadeIn" className="block-desc" delay={1200}>
                  <p>{tHomepage('hero-desc')}</p>
                </AnimateOnScroll>

                <AnimateOnScroll triggerClass="fadeIn" className="block-cta" delay={1500}>
                  <Link href="/contact" className="button">
                    <span>{tGeneralButton('get-in-touch')}</span>
                  </Link>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ height: '100vh' }}></section>
    </main>
  )
}
