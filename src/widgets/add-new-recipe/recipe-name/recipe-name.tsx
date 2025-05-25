import './RecipeName.css'

export default function InputName({name, onNameChange}: {
    name: string,
    onNameChange: (name: string) => void
}) {
    return (
        <div className="input-name-container">
            <label className="input-name-label">Название рецепта</label>
            <div className="input-name-wrapper">
                <input
                    className="input-name-field"
                    type="text"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    required
                />
            </div>
        </div>
    )
}