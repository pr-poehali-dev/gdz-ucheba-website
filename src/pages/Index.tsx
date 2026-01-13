import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from '@/components/ui/card';

const subjects = [
  { name: 'Математика', icon: '📐', color: 'from-purple-500 to-pink-500' },
  { name: 'Русский язык', icon: '📚', color: 'from-blue-500 to-purple-500' },
  { name: 'Английский язык', icon: '🌍', color: 'from-green-500 to-blue-500' },
  { name: 'Физика', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
  { name: 'Химия', icon: '🧪', color: 'from-pink-500 to-purple-500' },
  { name: 'Биология', icon: '🌿', color: 'from-green-500 to-teal-500' },
  { name: 'История', icon: '🏛️', color: 'from-orange-500 to-red-500' },
  { name: 'География', icon: '🌎', color: 'from-blue-500 to-cyan-500' },
];

const classes = [
  { number: 1, label: '1 класс' },
  { number: 2, label: '2 класс' },
  { number: 3, label: '3 класс' },
  { number: 4, label: '4 класс' },
  { number: 5, label: '5 класс' },
  { number: 6, label: '6 класс' },
  { number: 7, label: '7 класс' },
  { number: 8, label: '8 класс' },
  { number: 9, label: '9 класс' },
  { number: 10, label: '10 класс' },
  { number: 11, label: '11 класс' },
];

const faqData = [
  {
    question: 'Как найти нужное задание?',
    answer: 'Используйте поиск на главной странице или выберите свой класс и предмет в соответствующих разделах. Все задания структурированы по учебникам и темам.'
  },
  {
    question: 'Можно ли скачать решения?',
    answer: 'Да, все решения доступны для просмотра онлайн и скачивания в формате PDF. Просто откройте нужное задание и нажмите кнопку "Скачать".'
  },
  {
    question: 'Как часто обновляются решения?',
    answer: 'Мы регулярно добавляем новые решения и обновляем существующие. Следите за обновлениями в разделе "Новое" на главной странице.'
  },
  {
    question: 'Решения проверены учителями?',
    answer: 'Да, все решения проверяются нашей командой опытных педагогов и методистов перед публикацией на сайте.'
  },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => setActiveSection('home')}
            >
              GDZ.UCHEBA
            </div>
            <div className="hidden md:flex gap-6">
              {['home', 'classes', 'subjects', 'profile', 'faq', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`font-medium transition-all duration-300 hover:text-purple-600 ${
                    activeSection === section ? 'text-purple-600' : 'text-gray-700'
                  }`}
                >
                  {section === 'home' ? 'Главная' : 
                   section === 'classes' ? 'Классы' :
                   section === 'subjects' ? 'Предметы' :
                   section === 'profile' ? 'Профиль' :
                   section === 'faq' ? 'FAQ' : 'Контакты'}
                </button>
              ))}
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Войти
            </Button>
          </div>
        </div>
      </nav>

      {activeSection === 'home' && (
        <>
          <section className="container mx-auto px-4 py-20">
            <div className="text-center max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                Готовые домашние задания
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Все решения для всех классов — быстро, удобно, качественно
              </p>
              <div className="relative max-w-2xl mx-auto">
                <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                <Input
                  type="text"
                  placeholder="Поиск по предмету, классу или номеру задания..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-4 py-6 text-lg rounded-2xl border-2 border-purple-200 focus:border-purple-500 transition-all shadow-lg"
                />
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              Популярные предметы
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {subjects.map((subject, index) => (
                <Card 
                  key={subject.name}
                  className="group cursor-pointer hover:scale-105 transition-all duration-300 overflow-hidden border-2 hover:border-purple-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-3xl shadow-lg group-hover:shadow-xl transition-all`}>
                      {subject.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{subject.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="container mx-auto px-4 py-12">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center shadow-2xl">
              <h2 className="text-4xl font-bold mb-4">
                Присоединяйся к 100,000+ учеников
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Получай доступ ко всем решениям и улучшай свои оценки
              </p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-xl">
                Начать бесплатно
              </Button>
            </div>
          </section>
        </>
      )}

      {activeSection === 'classes' && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Выберите свой класс
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {classes.map((cls, index) => (
              <Card 
                key={cls.number}
                className="group cursor-pointer hover:scale-110 transition-all duration-300 border-2 hover:border-purple-400 animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-5xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {cls.number}
                  </div>
                  <p className="text-sm text-gray-600">класс</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'subjects' && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Все предметы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {subjects.map((subject, index) => (
              <Card 
                key={subject.name}
                className="group cursor-pointer hover:scale-105 transition-all duration-300 overflow-hidden border-2 hover:border-purple-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-4xl shadow-lg group-hover:shadow-xl transition-all`}>
                      {subject.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-1">{subject.name}</h3>
                      <p className="text-gray-500">Все классы</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'profile' && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-purple-200 shadow-xl">
              <CardContent className="p-12 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-5xl shadow-xl">
                  <Icon name="User" size={64} />
                </div>
                <h2 className="text-3xl font-bold mb-4">Профиль ученика</h2>
                <p className="text-gray-600 mb-8">Войдите, чтобы сохранять избранное и отслеживать прогресс</p>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8">
                  Войти или Зарегистрироваться
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {activeSection === 'faq' && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Частые вопросы
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-2 border-purple-200 rounded-2xl px-6 bg-white shadow-md hover:shadow-lg transition-all"
                >
                  <AccordionTrigger className="text-lg font-semibold hover:text-purple-600 py-6">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-purple-200 shadow-xl">
              <CardContent className="p-12">
                <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Свяжитесь с нами
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-all">
                    <Icon name="Mail" className="text-purple-600 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-gray-600">support@gdz.ucheba</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-pink-50 hover:bg-pink-100 transition-all">
                    <Icon name="Phone" className="text-pink-600 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                      <p className="text-gray-600">+7 (800) 555-35-35</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all">
                    <Icon name="MessageCircle" className="text-blue-600 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Telegram</h3>
                      <p className="text-gray-600">@gdz_ucheba_support</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">GDZ.UCHEBA</h3>
              <p className="text-purple-200">
                Лучший сервис готовых домашних заданий для всех классов
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Быстрые ссылки</h4>
              <div className="space-y-2">
                <button onClick={() => setActiveSection('home')} className="block text-purple-200 hover:text-white transition-colors">
                  Главная
                </button>
                <button onClick={() => setActiveSection('classes')} className="block text-purple-200 hover:text-white transition-colors">
                  Классы
                </button>
                <button onClick={() => setActiveSection('subjects')} className="block text-purple-200 hover:text-white transition-colors">
                  Предметы
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Контакты</h4>
              <div className="space-y-2 text-purple-200">
                <p>support@gdz.ucheba</p>
                <p>+7 (800) 555-35-35</p>
                <p>@gdz_ucheba_support</p>
              </div>
            </div>
          </div>
          <div className="border-t border-purple-700 pt-8 text-center text-purple-200">
            <p>© 2024 GDZ.UCHEBA. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
