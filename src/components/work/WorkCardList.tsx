import { Media, Work } from '@/payload-types'

import RenderMedia from '../common/media'
import AnimateOnScroll from '../common/animate-on-scroll'
import WorkItemModal from './WorkItemModal'

type WorkCardListProps = {
    work: Work
}

export default function WorkCardList({ work }: WorkCardListProps) {
    return (
        <AnimateOnScroll
            triggerClass="fadeIn"
            className="card hover-view"
            data-card="work-list"
            data-fancybox={`work-list-${work.id}`}
            data-src={`#work-fancybox-list-${work.id}`}
        >
            <div className="card-bg"></div>

            <div className="card-header">
                <div className="card-ttl">
                    <h3 className="size-h5 font-heading">{work.title}</h3>
                </div>

                <div className="card-media show-md">
                    <RenderMedia
                        src={(work.listHoverMedia as Media).url}
                        alt={(work.listHoverMedia as Media).alt}
                    />
                </div>
            </div>

            <div className="card-type show-md">
                <p className="size-h5">{work.industry?.map((industry) => industry).join(', ')}</p>
            </div>

            <div className="card-year">
                <p className="size-h5">{work.date ? new Date(work.date).getFullYear() : ''}</p>
            </div>

            <WorkItemModal work={work} idTemplate="work-fancybox-list" />
        </AnimateOnScroll>
    )
}
