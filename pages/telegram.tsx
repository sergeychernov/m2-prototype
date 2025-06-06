import { useRef, useState } from 'react';
import Head from 'next/head';
import ChatBot, { Message } from '../components/ChatBot';
import Layout from '../components/Layout';
import realtorDialogData from '../dialogs/realtorDialog.json';
import sellerDialogData from '../dialogs/sellerDialog.json';
import buyerDialogData from '../dialogs/buyerDialog.json';

// Приведение типов импортированных данных
const realtorDialog: Message[] = realtorDialogData as Message[];
const sellerDialog: Message[] = sellerDialogData as Message[];
const buyerDialog: Message[] = buyerDialogData as Message[];

export default function TelegramPage() {
  return (
    <Layout>
      <h1>Демонстрация чат-ботов</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <ChatBot dialogSequence={realtorDialog} title="Чат риелтора" initialMessagesCount={1} />
        <ChatBot dialogSequence={sellerDialog} title="Чат продавца"  />
        <ChatBot dialogSequence={buyerDialog} title="Чат покупателя" />
      </div>
    </Layout>
  );
}
