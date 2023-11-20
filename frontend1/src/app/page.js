'use client';
import Image from 'next/image';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useChat } from './use-chat';
import { ChatMessage } from './ChatMessage';
import Navber from './navbar';
import Footer from './footer';
export default function Home() {
  const [message, setMessage] = useState('');
  const { currentChat, chatHistory, sendMessage, cancel, state, clear } =
    useChat();
  const currentMessage = useMemo(() => {
    return { content: currentChat ?? '', role: 'assistant' };
  }, [currentChat]);
  const bottomRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [currentChat, chatHistory, state]);
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const inputRef = useRef(null);
  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, [state]);
  return (
    <>
      <Navber />
      <main className="bg-white md:rounded-lg md:shadow-md p-6  w-full  h-5/6 flex flex-col">
        <section className="overflow-y-auto flex-grow mb-4 pb-8 m-auto w-4/5 ">
          <div className="flex flex-col space-y-4">
            {chatHistory.length === 0 ? (
              <>
                <div className="bg-white border-gray-100 border-2 rounded-lg px-8 py-5 mr-20 w-full">
                  <h1 className="text-2xl font-bold mb-2">
                    🤖 Hello, I am MediBot
                  </h1>
                  <p>
                    I am a chatbot that can help you find information about
                    medicines. I can also help you find your nearest pharmacy. I
                    am still learning, so please be patient with me.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    'Which Medicine is the best for liver?',
                    'Tell me a intresting fact about medicine',
                    'What is meaning of Antibiotic?',
                  ].map((phrase) => (
                    <button
                      key={phrase}
                      onClick={() => sendMessage(phrase, chatHistory)}
                      className="bg-gray-100 border-gray-300 border-2 rounded-lg p-4"
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center">
                  <p className="text-sm text-gray-500 mt-5">
                    BE Project 2023 - 2024 | Group ID: 2
                  </p>
                </div>
              </>
            ) : (
              chatHistory.map((chat, i) => (
                <ChatMessage key={i} message={chat} />
              ))
            )}

            {currentChat ? <ChatMessage message={currentMessage} /> : null}
          </div>

          <div ref={bottomRef} />
        </section>
        <div className="flex items-center justify-center h-15">
          {state === 'idle' ? null : (
            <button
              className="bg-gray-100 text-gray-900 py-2 px-4 my-8"
              onClick={cancel}
            >
              Stop generating
            </button>
          )}
        </div>
        <section className="bg-gray-100 rounded-lg p-2 w-4/5 m-auto">
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(message, chatHistory);
              setMessage('');
            }}
          >
            {chatHistory.length > 1 ? (
              <button
                className="bg-gray-100 text-gray-600 py-2 px-4 rounded-l-lg"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  clear();
                  setMessage('');
                }}
              >
                Clear
              </button>
            ) : null}
            <input
              type="text"
              ref={inputRef}
              className="w-full rounded-l-lg p-2 outline-none"
              placeholder={state == 'idle' ? 'Type your message...' : '...'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={state !== 'idle'}
            />
            {state === 'idle' ? (
              <button
                className="bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
                type="submit"
              >
                Send
              </button>
            ) : null}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
