import React, { useState, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Укажите корневой элемент для react-modal

export default function WrapperGenerator() {
  const [step, setStep] = useState(2); // Начальный шаг установлен на 2, чтобы сразу отобразить генератор
  const [params, setParams] = useState({
    height: '600',
    width: '500',
    borderWidth: '10',
    borderColor: '#000000',
    shuffle: false,
    numberColumns: '4'
  });
  const [imageUrls, setImageUrls] = useState([]);
  const [finalImageUrl, setFinalImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    console.log(e.target.value);
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files.length > 0 && imageUrls.length + files.length <= 5) {
      const newImageUrls = await Promise.all(Array.from(files).map(fileToBase64));
      setImageUrls(prev => [...prev, ...newImageUrls]);
      console.log('Выбранные файлы:', files);
      // Здесь можно обработать выбранные файлы
    } else if (imageUrls.length + files.length > 5) {
      alert('Вы можете добавить не более 5 изображений.');
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (index) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };


  const handleDone = async () => {
    try {
      // Отправка данных на бэкенд
      const response = await axios.post(
        'http://localhost:8081/api/v1/images/generate',
        {
          images: imageUrls.map(stripBase64Prefix),
          width: parseInt(params.width),
          height: parseInt(params.height),
          borderThickness: parseInt(params.borderWidth),
          borderColor: params.borderColor,
          shuffle: params.shuffle,
          columns: parseInt(params.numberColumns)
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          responseType: 'blob' // Указываем, что ответ будет в виде blob (nZIP-архив)
        }
      );
  
      // Создаем объект URL для скачивания архива
      const zipBlob = new Blob([response.data], { type: 'application/zip' });
      const zipUrl = URL.createObjectURL(zipBlob);
  
      // Создаем временную ссылку для скачивания
      const link = document.createElement('a');
      link.href = zipUrl;
      link.download = 'output.zip'; // Имя файла для сохранения
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Освобождаем URL, чтобы не засорять память
      URL.revokeObjectURL(zipUrl);
  
      alert('Архив успешно сгенерирован и загружен!');
    } catch (error) {
      console.error('Ошибка при генерации архива:', error);
      alert('Произошла ошибка при генерации архива.');
    }
  };
    
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const stripBase64Prefix = (base64String) => {
    return base64String.split(',')[1];
  };

  return (
    <div className="wrapper-generator">
      {step === 2 && (
        <div className="editor">
          <div className="params-sidebar">
            <h2>Параметры</h2>
            <div className="input-group">
              <label>Высота</label>
              <input
                placeholder={params.height}
                type="number"
                name="height"
                value={params.height}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-group">
              <label>Ширина</label>
              <input
                placeholder={params.width}
                type="number"
                name="width"
                value={params.width}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-group">
              <label>Толщина границ</label>
              <input
                placeholder={params.borderWidth}
                type="number"
                name="borderWidth"
                value={params.borderWidth}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="input-group">
              <label>Цвет границ</label>
              <input
                type="color"
                name="borderColor"
                value={params.borderColor}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group checkbox">
              <label>Перемешать</label>
              <input
                type="checkbox"
                name="shuffle"
                checked={params.shuffle}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
                <label>Количество колонок</label>
                <input
                    placeholder={params.numberColumns}
                    type="number"
                    name="numberColumns"
                    value={params.numberColumns}
                    onChange={handleInputChange}
                />
            </div>
          </div>
          
          <div className="preview-area">
            <div className="upload-zone">
              {imageUrls.length > 0 ? (
                <div className="image-preview">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="image-container">
                      <img src={url} alt="Uploaded" className="preview-image" />
                      <button 
                        className="remove-button"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <img className="close-icon" src="/public/close.png" alt="" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="upload-icon">
                  <img className="file-icon" src="/public/file icons.png" alt="" />
                </div>
              )}

              <div>
                  <button 
                    className="button primary"
                    onClick={handleClick}
                  >
                    Выберите файл
                  </button>
              </div>
              {imageUrls.length < 5 && (
                <span className="file-types">png, jpeg, jpg</span>
              )}
              {imageUrls.length >= 5 && (
                <p className="max-images-message">Вы достигли максимального количества изображений (5).</p>
              )}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept=".png, .jpeg, .jpg"
                multiple
              />
            </div>
          </div>
          <button 
            className="button done"
            onClick={handleDone}
          >
            Готово
          </button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Итоговое изображение"
        style={{
          content: {
            width: '80%',
            maxWidth: '800px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
      >
        <h2>Итоговое изображение</h2>
        {finalImageUrl ? (
          <img src={finalImageUrl} alt="Final" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
        ) : (
          <p>Загрузка...</p>
        )}
        <button 
          className="button done"
          onClick={() => setIsModalOpen(false)}
          style={{ marginTop: '20px' }}
        >
          Закрыть
        </button>
      </Modal>
    </div>
  );
}