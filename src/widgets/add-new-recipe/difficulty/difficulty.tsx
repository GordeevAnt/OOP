import './Difficulty.css'

export default function Difficulty({difficaltyId, onDifficaltyChange}: { // Всё точно также как и в Category.tsx
    difficaltyId: number | null,
    onDifficaltyChange: (eatingTimeId: number) => void
}) {
    const difficalties = [
        { id: 1, name: "Легко" },
        { id: 2, name: "Средне" },
        { id: 3, name: "Сложно" }
    ]

    return (
        <div className="difficalty-container">
            <label className="difficalty-label">Сложность приготовления</label>
            <div className="difficalty-buttons">
                {difficalties.map(difficalty => (
                    <button
                        key={difficalty.id}
                        type="button"
                        className={`difficalty-button ${
                            difficaltyId === difficalty.id ? "difficalty-button-selected" : ""
                        }`}
                        onClick={() => onDifficaltyChange(difficalty.id)}
                    >
                        {difficalty.name}
                    </button>
                ))}
            </div>
        </div>
    )
}