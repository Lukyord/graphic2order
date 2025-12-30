type CounterProps = {
    count: number
}

export default function Counter({ count }: CounterProps) {
    return (
        <div className="counter">
            <span className="counter-value">{count}</span>
        </div>
    )
}
