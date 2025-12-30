import { Media, Work } from '@/payload-types'

import { getTranslations } from 'next-intl/server'

import RenderMedia from '../common/media'
import AnimateOnScroll from '../common/animate-on-scroll'
import WorkItemModal from './WorkItemModal'

type WorkGridItemProps = {
    work: Work
}

export default async function WorkGridItem({ work }: WorkGridItemProps) {
    return (
        <div
            className={`card hover-view ${work.orientation.toLocaleLowerCase()}`}
            data-card="work-grid"
            data-fancybox={`work-grid-${work.id}`}
            data-src={`#work-fancybox-grid-${work.id}`}
        >
            <AnimateOnScroll triggerClass="fadeIn" className="card-media">
                <div className="media-hover-ttl">
                    <h3>{work.title}</h3>
                </div>
                <RenderMedia
                    src={(work.mainMedia as Media)?.url}
                    alt={(work.mainMedia as Media)?.alt}
                />
            </AnimateOnScroll>

            <WorkItemModal work={work} idTemplate="work-fancybox-grid" />
        </div>
    )
}
