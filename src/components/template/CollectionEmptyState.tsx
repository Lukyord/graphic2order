import AnimateOnScroll from '../common/animate-on-scroll'

export default function CollectionEmptyState() {
    return (
        <AnimateOnScroll className="empty-state" triggerClass="fadeEntry">
            <p>No matching items — try a different selection.</p>
        </AnimateOnScroll>
    )
}
