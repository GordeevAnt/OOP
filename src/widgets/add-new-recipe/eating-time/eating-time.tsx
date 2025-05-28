import './EatingTime.css'

export default function ChooseEatingTime({eatingTimeId, onTimeChange}: { // Всё точно также как и в Category.tsx
    eatingTimeId: number | null,
    onTimeChange: (eatingTimeId: number) => void
}) {
    const eatingTimes = [
        { id: 1, name: "Завтрак" },
        { id: 2, name: "Обед" },
        { id: 3, name: "Полдник" },
        { id: 4, name: "Ужин" },
        { id: 5, name: "Любое Время"}
    ]

    return (
        <div className="eating-time-container">
            <label className="eating-time-label">Время приема пищи</label>
            <div className="eating-time-buttons">
                {eatingTimes.map(eatingTime => (
                    <button
                        key={eatingTime.id}
                        type="button"
                        className={`eating-time-button ${
                            eatingTimeId === eatingTime.id ? "eating-time-button-selected" : ""
                        }`}
                        onClick={() => onTimeChange(eatingTime.id)}
                    >
                        {eatingTime.name}
                    </button>
                ))}
            </div>
        </div>
    )
}