import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import './ImageUploader.css';

type ImageUploaderProps = {
  onImageUpload: (imageData: string) => void;
  initialImage?: string;
  resetTrigger?: boolean;
};

export default function ImageUploader({ 
  onImageUpload, 
  initialImage,
  resetTrigger = false // Добавляем новый пропс
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialImage) {
      setPreview(initialImage);
    } else {
      setPreview(null); // Сбрасываем превью если нет initialImage
    }
  }, [initialImage]);

  // Добавляем эффект для сброса при изменении resetTrigger
  useEffect(() => {
    if (resetTrigger) {
      setPreview(null);
    }
  }, [resetTrigger]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    setError(null);
    setIsUploading(true);

    try {
      // Создаем превью и сохраняем как base64
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result as string;
        setPreview(imageData);
        onImageUpload(imageData); // Передаем данные изображения (base64)
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Ошибка при загрузке изображения');
    } finally {
      setIsUploading(false);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  return (
    <div className="image-uploader">
      <div 
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
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
  );
}