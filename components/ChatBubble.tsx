
import React from 'react';
import { Message, MessageRole } from '../types';

interface ChatBubbleProps {
  message: Message;
}

const UserIcon = () => (
  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
    YOU
  </div>
);

const BotIcon = () => (
    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white flex-shrink-0">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 7h10a2 2 0 0 1 2 2v1l1 1v3l-1 1v3a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-3l-1 -1v-3l1 -1v-1a2 2 0 0 1 2 -2z" />
            <path d="M10 16h4" />
            <circle cx="8.5" cy="11.5" r=".5" fill="currentColor" />
            <circle cx="15.5" cy="11.5" r=".5" fill="currentColor" />
        </svg>
    </div>
);

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;
  const isModel = message.role === MessageRole.MODEL;
  const isError = message.role === MessageRole.ERROR;

  const bubbleClasses = isUser
    ? 'bg-blue-600 text-white'
    : isModel
    ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    : 'bg-red-100 dark:bg-red-900/50 border border-red-400 text-red-700 dark:text-red-300';
    
  const alignmentClass = isUser ? 'justify-end' : 'justify-start';

  if(isError) {
    return (
        <div className="flex justify-center my-2">
             <div className={`p-3 rounded-lg max-w-sm md:max-w-md lg:max-w-lg ${bubbleClasses}`}>
                 <p className="text-sm">{message.text}</p>
             </div>
        </div>
    )
  }

  return (
    <div className={`flex items-start space-x-3 my-4 ${alignmentClass}`}>
      {!isUser && <BotIcon />}
      <div className={`p-3 rounded-lg max-w-sm md:max-w-md lg:max-w-lg ${bubbleClasses}`}>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
       {isUser && <UserIcon />}
    </div>
  );
};

export default ChatBubble;
