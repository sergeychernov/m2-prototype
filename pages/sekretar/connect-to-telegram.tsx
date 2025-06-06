import { useRef, useState } from 'react';
import Head from 'next/head';

interface MenuOption {
  text: string;
  callback_data: string;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
  menu?: MenuOption[];
}

const dialogSequence: Message[] = [
  { sender: 'bot', text: 'Привет! Чем могу помочь?' },
  { sender: 'user', text: 'Привет, бот!' },
  {
    sender: 'bot',
    text: 'Пожалуйста, выберите опцию:',
    menu: [
      { text: 'Опция 1', callback_data: 'option1' },
      { text: 'Опция 2', callback_data: 'option2' },
      { text: 'Другая опция', callback_data: 'option3' },
    ],
  },
  { sender: 'user', text: 'Расскажи о погоде.' },
  { sender: 'bot', text: 'Сегодня солнечно и тепло.' },
  { sender: 'user', text: 'Отлично! А что насчет новостей?' },
  { sender: 'bot', text: 'Последние новости доступны на нашем сайте.' },
  { sender: 'user', text: 'Понятно. Спасибо!' },
  { sender: 'bot', text: 'Всегда рад помочь!' },
];

export default function ConnectToTelegram() {
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

  const handleMenuSelection = (selectedText: string, callback: string) => {
    addMessage({ sender: 'user', text: `Выбрано: ${selectedText}` });
    let botResponse = '';
    switch (callback) {
      case 'option1':
        botResponse = 'Вы выбрали Опцию 1. Вот информация по ней...';
        break;
      case 'option2':
        botResponse = 'Опция 2 выбрана. Что бы вы хотели узнать дальше?';
        break;
      case 'option3':
        botResponse = 'Вы выбрали "Другая опция". Уточните ваш запрос.';
        break;
      default:
        botResponse = 'Неизвестная опция.';
    }
    setTimeout(() => addMessage({ sender: 'bot', text: botResponse }), 1000);
  };

  const sendUserMessage = () => {
    const text = inputRef.current?.value.trim();
    if (text) {
      addMessage({ sender: 'user', text });
      if (inputRef.current) inputRef.current.value = '';
    }

    if (dialogIndex.current < dialogSequence.length) {
      const next = dialogSequence[dialogIndex.current];
      setTimeout(() => {
        addMessage(next);
        dialogIndex.current += 1;
      }, next.sender === 'bot' ? 1000 : 0);
    } else {
      setTimeout(
        () => addMessage({ sender: 'bot', text: 'Диалог завершен. Если у вас есть еще вопросы, начните новый.' }),
        1000,
      );
    }
  };

  // init first message
  if (messages.length === 0 && dialogIndex.current === 0) {
    const first = dialogSequence[0];
    addMessage(first);
    dialogIndex.current = 1;
  }

  return (
    <>
      <Head>
        <title>Telegram Bot Chat</title>
      </Head>
      <div className="chat-container">
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
                      onClick={() => handleMenuSelection(option.text, option.callback_data)}
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
      </div>
      <style jsx>{`
        .chat-container {
          width: 400px;
          height: 600px;
          border: 1px solid #ccc;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin: 40px auto;
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
          max-width: 70%;
          word-wrap: break-word;
          cursor: pointer;
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
    </>
  );
}
