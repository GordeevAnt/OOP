import './CookingTime.css'

export default function ChooseCookingTime({cookingTimeId, onTimeChange}: {
    cookingTimeId: number | null,
    onTimeChange: (cookingTimeId: number) => void
}) {
    const cookingTimes = [
        { id: 1, name: "Быстро (до 30 минут)" },
        { id: 2, name: "Долго (более 30 минут)" },
        { id: 3, name: "Неизвестно" }
    ]

    return (
        <div className="cooking-time-container">
            <label className="cooking-time-label">Время приготовления</label>
            <div className="cooking-time-buttons">
                {cookingTimes.map(cookingTime => (
                    <button
                        key={cookingTime.id}
                        type="button"
                        className={`cooking-time-button ${
                            cookingTimeId === cookingTime.id ? "cooking-time-button-selected" : ""
                        }`}
                        onClick={() => onTimeChange(cookingTime.id)}
                    >
                        {cookingTime.name}
                    </button>
                ))}
            </div>
        </div>
    )
}