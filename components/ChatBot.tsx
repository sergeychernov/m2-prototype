import { useRef, useState, useEffect } from 'react';

// ... существующие интерфейсы MenuOption и Message ...
interface MenuOption {
  text: string;
  callback_data: string;
}

export interface Message {
  sender: 'user' | 'bot';
  text: string;
  menu?: MenuOption[];
}

interface ChatBotProps {
  dialogSequence: Message[];
  title: string;
  initialMessagesCount?: number; // Новый параметр
}

export default function ChatBot({ dialogSequence, title, initialMessagesCount = 0 }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogIndex = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
    setTimeout(() => {
      containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }, 0);
  };

  const proceedToNextMessage = () => {
    if (dialogIndex.current < dialogSequence.length) {
      const nextMessage = dialogSequence[dialogIndex.current];
      setTimeout(() => {
        addMessage(nextMessage);
        dialogIndex.current++;
      }, 500);
    } else {
      addMessage({ sender: 'bot', text: 'Спасибо! Если есть еще вопросы, спрашивайте.' });
    }
  };

  const sendUserMessage = () => {
    const text = inputRef.current?.value.trim();

    if (text) {
      addMessage({ sender: 'user', text });
      if (inputRef.current) inputRef.current.value = '';
    }
    // После добавления сообщения пользователя (если оно было) или просто по клику,
    // показываем следующее сообщение из последовательности.
    proceedToNextMessage();
  };

  const handleMenuClick = () => {
    // При клике на меню также показываем следующее сообщение из последовательности.
    proceedToNextMessage();
  };

  const deleteLastMessage = () => {
    setMessages((prevMessages) => {
      if (prevMessages.length === 0) return [];

      const lastMessage = prevMessages[prevMessages.length - 1];
      const newMessages = prevMessages.slice(0, -1);

      // Если последнее сообщение было от бота и оно из dialogSequence,
      // то нужно откатить dialogIndex, чтобы это сообщение могло быть показано снова.
      // Это упрощенная логика, предполагающая, что сообщения бота из dialogSequence не повторяются.
      if (lastMessage.sender === 'bot') {
        const lastDialogMessage = dialogSequence[dialogIndex.current - 1];
        if (lastDialogMessage && lastDialogMessage.text === lastMessage.text) {
          dialogIndex.current--;
        }
      }
      return newMessages;
    });
  };

  useEffect(() => {
    setMessages([]);
    dialogIndex.current = 0;
    
    // Показываем начальные сообщения в соответствии с initialMessagesCount
    for (let i = 0; i < Math.min(initialMessagesCount, dialogSequence.length); i++) {
      addMessage(dialogSequence[i]);
      dialogIndex.current = i + 1;
    }
  }, [dialogSequence, initialMessagesCount]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>{title}</h3>
        <button onClick={deleteLastMessage} className="delete-last-message-button">
          &#x2716; {/* Крестик */}
        </button>
      </div>
      <div className="messages" ref={containerRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <span>{msg.text}</span>
            {msg.sender === 'bot' && msg.menu && (
              <div style={{ marginTop: '5px' }}>
                {msg.menu.map((option) => (
                  <button
                    key={option.callback_data}
                    className="inline-menu-button"
                    onClick={handleMenuClick} // Добавляем обработчик сюда
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input ref={inputRef} type="text" placeholder="Введите сообщение..." onKeyPress={(e) => e.key === 'Enter' && sendUserMessage()} />
        <button onClick={sendUserMessage}>Отправить</button>
      </div>
      {/* ... существующие стили ... */}
      <style jsx>{`
        .chat-container {
          width: 30%; 
          min-width: 300px; 
          height: 600px;
          border: 1px solid #ccc;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin: 10px; 
        }
        .chat-container h3 {
            text-align: center;
            padding: 10px;
            margin: 0;
            /* border-bottom: 1px solid #eee; */ /* Убрали разделитель, т.к. header теперь flex */
            flex-grow: 1; /* Чтобы заголовок занимал доступное место */
        }
        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between; /* Распределяет элементы по краям */
          padding: 0 10px; /* Небольшой отступ для кнопки */
          border-bottom: 1px solid #eee;
        }
        .delete-last-message-button {
          background: none;
          border: none;
          font-size: 1.2em;
          cursor: pointer;
          padding: 5px;
          color: #777;
        }
        .delete-last-message-button:hover {
          color: #333;
        }
        .messages {
          flex-grow: 1;
          overflow-y: auto;
          padding: 10px;
          display: flex;
          flex-direction: column;
        }
        .message {
          padding: 8px 12px;
          margin-bottom: 8px;
          border-radius: 18px;
          max-width: 85%; 
          word-wrap: break-word;
        }
        .user {
          background-color: #dcf8c6;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }
        .bot {
          background-color: #f1f0f0;
          align-self: flex-start;
          border-bottom-left-radius: 4px;
        }
        .inline-menu-button {
          background-color: #fff;
          border: 1px solid #007bff;
          color: #007bff;
          padding: 8px 12px;
          margin-top: 5px;
          margin-right: 5px;
          border-radius: 15px;
          cursor: pointer;
          display: inline-block;
        }
        .inline-menu-button:hover {
          background-color: #007bff;
          color: #fff;
        }
        .input-area {
          padding: 10px;
          border-top: 1px solid #ccc;
          display: flex;
        }
        .input-area input {
          flex-grow: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 20px;
          margin-right: 10px;
        }
        .input-area button {
          padding: 10px 15px;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 20px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}