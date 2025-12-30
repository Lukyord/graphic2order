import { getTranslations } from 'next-intl/server'

import { Media, Work, WorkType } from '@/payload-types'

import RenderMedia from '../common/media'
import { LexicalToHTML } from '../common/lexicaltoHTML'

type WorkItemModalProps = {
    work: Work
    idTemplate: string
}

export default async function WorkItemModal({ work, idTemplate }: WorkItemModalProps) {
    const tWork = await getTranslations('Work.work-item')

    return (
        <div
            id={`${idTemplate}-${work.id}`}
            className="work-fancybox-content"
            style={{ display: 'none' }}
            data-lenis-prevent
        >
            <div className="work-fancybox-content-scroll">
                <div className="content-inner">
                    <div className="content-gallery">
                        {work.gallery?.map((item, index) => (
                            <RenderMedia
                                key={`work-gallery-${work.id}-${index}`}
                                src={(item as Media)?.url}
                                alt={(item as Media)?.alt}
                            />
                        ))}
                    </div>

                    <div className="content-text">
                        <div className="content-ttl">
                            <h3 className="size-h1">{work.title}</h3>
                        </div>

                        <div className="content-grid">
                            <div className="grid-item">
                                <div className="item-subttl">
                                    <h4 className="size-h6">{tWork('industry')}</h4>
                                </div>
                                <div className="item-content">
                                    <ul className="flex-col">
                                        {work.industry?.map((item, index) => (
                                            <li key={`work-industry-${work.id}-${index}`}>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="grid-item">
                                <div className="item-subttl">
                                    <h4 className="size-h6">{tWork('year')}</h4>
                                </div>
                                <div className="item-content">
                                    <p className="size-body">
                                        {new Date(work.date as string).getFullYear()}
                                    </p>
                                </div>
                            </div>
                            <div className="grid-item">
                                <div className="item-subttl">
                                    <h4 className="size-h6">{tWork('services')}</h4>
                                </div>
                                <div className="item-content">
                                    <ul className="flex-row">
                                        {work.workTypes?.map((item, index) => (
                                            <li
                                                key={`work-work-type-${work.id}-${index}`}
                                                className="work-type-tag"
                                            >
                                                {(item as WorkType).name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="grid-item">
                                <div className="item-subttl">
                                    <h4 className="size-h6">{tWork('info')}</h4>
                                </div>
                                <div className="item-content">
                                    <LexicalToHTML data={work.content} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
