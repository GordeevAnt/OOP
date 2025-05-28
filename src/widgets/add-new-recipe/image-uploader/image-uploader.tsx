import { useCallback, useState, useEffect } from 'react'; // Импортируем встроенные react хуки
import { useDropzone } from 'react-dropzone'; // Импорт хука для drag-and-drop загрузки файлов
import './ImageUploader.css'; // Стили для компонента

type ImageUploaderProps = { // Определяем пропсы для компонента
  onImageUpload: (imageData: string) => void // callback функция
  initialImage?: string // путь к начальному изображение
  resetTrigger?: boolean // состояние (флаг) для сброса / очистки
};

export default function ImageUploader({ // Начало компонента для загрузки изображений
  onImageUpload, 
  initialImage,
  resetTrigger = false // Устанавливаем значение по умолчанию false, чтобы форма не очищалась
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false) // Состояния для контроля процесса загрузки (загружается или нет)
  const [error, setError] = useState<string | null>(null) // Состояние для хранения ошибки
  const [preview, setPreview] = useState<string | null>(null) // Состояние для того чтобы хранить превью изображения в формате base64 (специальный текстовый формат)

  useEffect(() => { // Эффект для установки начального изображения
    if (initialImage) {
      setPreview(initialImage)
    } else {
      setPreview(null) // Сбрасываем превью если нет initialImage
    }
  }, [initialImage]) // Работает при изменении пути initialImage

  useEffect(() => { // Эффект для сброса состояния, очищаем поле с изображением
    if (resetTrigger) { // Если resetTrigger = True
      setPreview(null) // Очищаем превью изображения
    }
  }, [resetTrigger]) // Работает при измении значения resetTrigger

  const onDrop = useCallback(async (acceptedFiles: File[]) => { // Кастомный обработчик загруженных файлов
    if (acceptedFiles.length === 0) return // Если файлов нет выходим из функции
    
    const file = acceptedFiles[0] // Выбираем только один (первый) файл
    setError(null) // Сбрасываем ошибки
    setIsUploading(true) // Устанавливаем состояние в true, загрузка началась

    try { // Блок обработки ошибок
      const reader = new FileReader() // Инициализируем объект для чтения файлов
      reader.onload = () => { // обработчик чтения файлов
        const imageData = reader.result as string // Переводим в формат base64
        setPreview(imageData) // Устанваливает превью
        onImageUpload(imageData) // Вызываем callback функцию из AddRecipe используя данные загруженного изображения
      }
      reader.readAsDataURL(file) // Читаем файл
    } catch (err) { // Если есть ошибки, то ловим их тут
      console.error('Upload error:', err) // Обрабатываем, узнаем какая ошибка была поймана
      setError('Ошибка при загрузке изображения') // Выводим информацию о том, что произошла ошибка
    } finally {
      setIsUploading(false) // В результате в любом случае устанваливаем состояние (флаг) в false, загрузка завершена
    }
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ // Настраиваем dropzone
    onDrop, // Обработчик для выбранных файлов
    accept: { // Разрешенные типы файлов
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 1, // Можно выбрать только 1 файл
    maxSize: 5 * 1024 * 1024 // Максимальный размер файла 5MB
  })

  return (
    <div className="image-uploader">
      <div 
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} /> {/* Скрытый инпут для выбора файлов */}
        {isUploading ? (
          <div className="upload-status">Загрузка...</div>
        ) : preview ? (
          <div className="preview-container">
            <img src={preview} alt="Предпросмотр" className="preview-image" />
            <div className="change-image-text">Нажмите для изменения изображения</div>
          </div>
        ) : (
          <div className="upload-instructions">
            {isDragActive ? (
              <p>Отпустите файл для загрузки</p>
            ) : (
              <>
                <p>Перетащите сюда изображение или нажмите для выбора</p>
                <p className="hint">Поддерживаются JPG, PNG, WEBP (до 5MB)</p>
              </>
            )}
          </div>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}