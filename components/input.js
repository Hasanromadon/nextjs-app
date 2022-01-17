export default function Input({type, onChange, value}) {
    return (
        <input type={type} onChange={onChange} value={value} className="border px-3 py-1 w-80" />
    )
}
