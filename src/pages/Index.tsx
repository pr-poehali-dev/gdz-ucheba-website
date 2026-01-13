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

const exercisesData = {
  'Математика': {
    1: [
      { id: 1, title: 'Задача 1', topic: 'Сложение чисел до 10', answer: '5 + 3 = 8. Ответ: 8' },
      { id: 2, title: 'Задача 2', topic: 'Вычитание чисел до 10', answer: '9 - 4 = 5. Ответ: 5' },
      { id: 3, title: 'Задача 3', topic: 'Сравнение чисел', answer: '7 > 5. Ответ: 7 больше 5' },
      { id: 4, title: 'Задача 4', topic: 'Состав числа 10', answer: '10 = 6 + 4. Ответ: 6 и 4' },
      { id: 5, title: 'Задача 5', topic: 'Задачи на сложение', answer: 'У Маши было 3 яблока, ей дали еще 2. Всего: 3 + 2 = 5 яблок' },
    ],
    5: [
      { id: 1, title: 'Упражнение 1', topic: 'Дроби', answer: '3/4 + 1/4 = 4/4 = 1. Ответ: 1' },
      { id: 2, title: 'Упражнение 2', topic: 'Десятичные дроби', answer: '0.5 + 0.3 = 0.8. Ответ: 0.8' },
      { id: 3, title: 'Упражнение 3', topic: 'Уравнения', answer: 'x + 5 = 12. x = 12 - 5 = 7. Ответ: x = 7' },
      { id: 4, title: 'Упражнение 4', topic: 'Площадь прямоугольника', answer: 'S = a × b = 5 × 3 = 15 см². Ответ: 15 см²' },
      { id: 5, title: 'Упражнение 5', topic: 'Задачи на движение', answer: 'S = v × t = 60 км/ч × 2 ч = 120 км. Ответ: 120 км' },
    ],
    9: [
      { id: 1, title: 'Задание 1', topic: 'Квадратные уравнения', answer: 'x² - 5x + 6 = 0. D = 25 - 24 = 1. x₁ = 3, x₂ = 2. Ответ: x = 2 или x = 3' },
      { id: 2, title: 'Задание 2', topic: 'Системы уравнений', answer: 'x + y = 5, x - y = 1. Решение: x = 3, y = 2. Ответ: (3; 2)' },
      { id: 3, title: 'Задание 3', topic: 'Функции', answer: 'y = 2x + 3. При x = 2: y = 7. Ответ: y = 7' },
      { id: 4, title: 'Задание 4', topic: 'Теорема Пифагора', answer: 'c² = a² + b² = 9 + 16 = 25. c = 5. Ответ: 5 см' },
      { id: 5, title: 'Задание 5', topic: 'Прогрессии', answer: 'a₁ = 2, d = 3. a₅ = 2 + 4×3 = 14. Ответ: 14' },
    ],
  },
  'Русский язык': {
    1: [
      { id: 1, title: 'Упражнение 1', topic: 'Гласные и согласные', answer: 'В слове "мама" 2 гласных (а, а) и 2 согласных (м, м). GDZ.UCHEBA' },
      { id: 2, title: 'Упражнение 2', topic: 'Слоги', answer: 'Ко-ро-ва — 3 слога. Ответ: 3 слога. GDZ.UCHEBA' },
      { id: 3, title: 'Упражнение 3', topic: 'Алфавит', answer: 'Буквы по порядку: А, Б, В, Г, Д, Е, Ё, Ж, З... GDZ.UCHEBA' },
      { id: 4, title: 'Упражнение 4', topic: 'Перенос слов', answer: 'Пе-нал, учи-тель, кни-га. GDZ.UCHEBA' },
      { id: 5, title: 'Упражнение 5', topic: 'Большая буква', answer: 'Москва, Волга, Иван — с большой буквы. GDZ.UCHEBA' },
    ],
    5: [
      { id: 1, title: 'Упражнение 10', topic: 'Части речи', answer: 'Существительное: дом. Прилагательное: красивый. Глагол: идти. GDZ.UCHEBA' },
      { id: 2, title: 'Упражнение 11', topic: 'Падежи', answer: 'Именительный: кто? что? книга. Родительный: кого? чего? книги. GDZ.UCHEBA' },
      { id: 3, title: 'Упражнение 12', topic: 'Спряжение глаголов', answer: 'Читать: я читаю, ты читаешь, он читает. I спряжение. GDZ.UCHEBA' },
      { id: 4, title: 'Упражнение 13', topic: 'Орфография', answer: 'Корова, молоко, воробей — словарные слова. GDZ.UCHEBA' },
      { id: 5, title: 'Упражнение 14', topic: 'Синтаксис', answer: 'Мальчик читает книгу. Подлежащее: мальчик. Сказуемое: читает. GDZ.UCHEBA' },
    ],
    9: [
      { id: 1, title: 'Упражнение 45', topic: 'Сложные предложения', answer: 'Солнце село, и стало темно. ССП с соединительным союзом "и". GDZ.UCHEBA' },
      { id: 2, title: 'Упражнение 46', topic: 'Причастный оборот', answer: 'Книга, лежащая на столе, интересная. Обособляется запятыми. GDZ.UCHEBA' },
      { id: 3, title: 'Упражнение 47', topic: 'Деепричастный оборот', answer: 'Читая книгу, он думал о будущем. Обособляется запятыми. GDZ.UCHEBA' },
      { id: 4, title: 'Упражнение 48', topic: 'Пунктуация в СПП', answer: 'Я знаю, что он придет. Запятая перед союзом "что". GDZ.UCHEBA' },
      { id: 5, title: 'Упражнение 49', topic: 'Прямая речь', answer: '"Я приду завтра", — сказал он. Знаки: кавычки, тире, точка. GDZ.UCHEBA' },
    ],
  },
  'Английский язык': {
    3: [
      { id: 1, title: 'Exercise 1', topic: 'Alphabet', answer: 'A, B, C, D, E, F, G... Z. GDZ.UCHEBA' },
      { id: 2, title: 'Exercise 2', topic: 'Colors', answer: 'Red, blue, green, yellow, orange, purple. GDZ.UCHEBA' },
      { id: 3, title: 'Exercise 3', topic: 'Numbers', answer: 'One, two, three, four, five, six, seven. GDZ.UCHEBA' },
      { id: 4, title: 'Exercise 4', topic: 'Animals', answer: 'Cat, dog, bird, fish, elephant, lion. GDZ.UCHEBA' },
      { id: 5, title: 'Exercise 5', topic: 'Family', answer: 'Mother, father, sister, brother, grandmother. GDZ.UCHEBA' },
    ],
    7: [
      { id: 1, title: 'Exercise 15', topic: 'Present Simple', answer: 'I play football. He plays tennis. They play basketball. GDZ.UCHEBA' },
      { id: 2, title: 'Exercise 16', topic: 'Past Simple', answer: 'I went to school yesterday. She visited her friend. GDZ.UCHEBA' },
      { id: 3, title: 'Exercise 17', topic: 'Future Simple', answer: 'I will go to the cinema tomorrow. We will study English. GDZ.UCHEBA' },
      { id: 4, title: 'Exercise 18', topic: 'Present Continuous', answer: 'I am reading now. She is writing a letter. GDZ.UCHEBA' },
      { id: 5, title: 'Exercise 19', topic: 'Modal verbs', answer: 'Can: I can swim. Must: You must study. Should: We should help. GDZ.UCHEBA' },
    ],
    11: [
      { id: 1, title: 'Exercise 32', topic: 'Present Perfect', answer: 'I have already done my homework. She has visited London. GDZ.UCHEBA' },
      { id: 2, title: 'Exercise 33', topic: 'Conditionals', answer: 'If I have time, I will go. If I had money, I would buy. GDZ.UCHEBA' },
      { id: 3, title: 'Exercise 34', topic: 'Passive Voice', answer: 'The book was written by Tolstoy. English is spoken worldwide. GDZ.UCHEBA' },
      { id: 4, title: 'Exercise 35', topic: 'Reported Speech', answer: 'He said: "I am tired." → He said that he was tired. GDZ.UCHEBA' },
      { id: 5, title: 'Exercise 36', topic: 'Articles', answer: 'A cat (любой), the cat (конкретный), cats (множество). GDZ.UCHEBA' },
    ],
  },
  'Физика': {
    7: [
      { id: 1, title: 'Задача 1', topic: 'Плотность', answer: 'ρ = m/V = 200г / 100см³ = 2 г/см³. Ответ: 2 г/см³. GDZ.UCHEBA' },
      { id: 2, title: 'Задача 2', topic: 'Скорость', answer: 'v = S/t = 100м / 20с = 5 м/с. Ответ: 5 м/с. GDZ.UCHEBA' },
      { id: 3, title: 'Задача 3', topic: 'Давление', answer: 'p = F/S = 1000Н / 2м² = 500 Па. Ответ: 500 Па. GDZ.UCHEBA' },
      { id: 4, title: 'Задача 4', topic: 'Сила Архимеда', answer: 'F = ρgV = 1000 × 10 × 0.001 = 10 Н. Ответ: 10 Н. GDZ.UCHEBA' },
      { id: 5, title: 'Задача 5', topic: 'Работа', answer: 'A = F × S = 50Н × 10м = 500 Дж. Ответ: 500 Дж. GDZ.UCHEBA' },
    ],
    9: [
      { id: 1, title: 'Задача 8', topic: 'Ускорение', answer: 'a = (v - v₀)/t = (20 - 0)/5 = 4 м/с². Ответ: 4 м/с². GDZ.UCHEBA' },
      { id: 2, title: 'Задача 9', topic: 'Импульс', answer: 'p = mv = 2кг × 10м/с = 20 кг·м/с. Ответ: 20 кг·м/с. GDZ.UCHEBA' },
      { id: 3, title: 'Задача 10', topic: 'Энергия', answer: 'E = mv²/2 = 2 × 100/2 = 100 Дж. Ответ: 100 Дж. GDZ.UCHEBA' },
      { id: 4, title: 'Задача 11', topic: 'Мощность', answer: 'N = A/t = 1000Дж / 10с = 100 Вт. Ответ: 100 Вт. GDZ.UCHEBA' },
      { id: 5, title: 'Задача 12', topic: 'Закон Ома', answer: 'I = U/R = 12В / 6Ом = 2 А. Ответ: 2 А. GDZ.UCHEBA' },
    ],
    11: [
      { id: 1, title: 'Задача 20', topic: 'Фотоэффект', answer: 'Eф = hν - A. При hν > A электроны вылетают. GDZ.UCHEBA' },
      { id: 2, title: 'Задача 21', topic: 'Ядерные реакции', answer: '²³⁸U → ²³⁴Th + ⁴He (α-распад). GDZ.UCHEBA' },
      { id: 3, title: 'Задача 22', topic: 'Колебания', answer: 'T = 2π√(L/g) = 2×3.14×√(1/10) = 2 с. Ответ: 2 с. GDZ.UCHEBA' },
      { id: 4, title: 'Задача 23', topic: 'Волны', answer: 'λ = v/ν = 340м/с / 170Гц = 2 м. Ответ: 2 м. GDZ.UCHEBA' },
      { id: 5, title: 'Задача 24', topic: 'Оптика', answer: '1/F = 1/d + 1/f. F = 10см, d = 20см → f = 20см. GDZ.UCHEBA' },
    ],
  },
};

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
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<any | null>(null);

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
                  onClick={() => {
                    setSelectedSubject(subject.name);
                    setActiveSection('subject-detail');
                  }}
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
                onClick={() => {
                  setSelectedClass(cls.number);
                  setActiveSection('class-detail');
                }}
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
                onClick={() => {
                  setSelectedSubject(subject.name);
                  setActiveSection('subject-detail');
                }}
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

      {activeSection === 'subject-detail' && selectedSubject && (
        <section className="container mx-auto px-4 py-12">
          <Button 
            onClick={() => setActiveSection('subjects')} 
            variant="outline" 
            className="mb-6"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к предметам
          </Button>
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {selectedSubject}
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Выберите класс для просмотра заданий</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {classes.map((cls, index) => {
              const hasExercises = exercisesData[selectedSubject as keyof typeof exercisesData]?.[cls.number];
              return (
                <Card 
                  key={cls.number}
                  onClick={() => {
                    if (hasExercises) {
                      setSelectedClass(cls.number);
                      setActiveSection('exercises');
                    }
                  }}
                  className={`group cursor-pointer transition-all duration-300 border-2 animate-scale-in ${
                    hasExercises 
                      ? 'hover:scale-110 hover:border-purple-400' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`text-4xl font-bold mb-2 ${
                      hasExercises 
                        ? 'bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent' 
                        : 'text-gray-400'
                    }`}>
                      {cls.number}
                    </div>
                    <p className="text-xs text-gray-600">класс</p>
                    {hasExercises && (
                      <div className="mt-2 text-xs text-purple-600 font-medium">
                        ✓ Доступно
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {activeSection === 'class-detail' && selectedClass && (
        <section className="container mx-auto px-4 py-12">
          <Button 
            onClick={() => setActiveSection('classes')} 
            variant="outline" 
            className="mb-6"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к классам
          </Button>
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {selectedClass} класс
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Выберите предмет</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {subjects.map((subject, index) => {
              const hasExercises = exercisesData[subject.name as keyof typeof exercisesData]?.[selectedClass];
              return (
                <Card 
                  key={subject.name}
                  onClick={() => {
                    if (hasExercises) {
                      setSelectedSubject(subject.name);
                      setActiveSection('exercises');
                    }
                  }}
                  className={`group transition-all duration-300 overflow-hidden border-2 animate-scale-in ${
                    hasExercises 
                      ? 'cursor-pointer hover:scale-105 hover:border-purple-300' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-4xl shadow-lg ${hasExercises ? 'group-hover:shadow-xl' : ''} transition-all`}>
                        {subject.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-1">{subject.name}</h3>
                        {hasExercises ? (
                          <p className="text-purple-600 text-sm font-medium">✓ Решения доступны</p>
                        ) : (
                          <p className="text-gray-400 text-sm">Скоро</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {activeSection === 'exercises' && selectedSubject && selectedClass && (
        <section className="container mx-auto px-4 py-12">
          <Button 
            onClick={() => {
              setActiveSection('subject-detail');
              setSelectedClass(null);
            }} 
            variant="outline" 
            className="mb-6"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {selectedSubject} — {selectedClass} класс
            </h2>
            <p className="text-gray-600">Выберите упражнение для просмотра решения</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {exercisesData[selectedSubject as keyof typeof exercisesData]?.[selectedClass]?.map((exercise, index) => (
              <Card 
                key={exercise.id}
                onClick={() => {
                  setSelectedExercise(exercise);
                  setActiveSection('answer');
                }}
                className="group cursor-pointer hover:scale-[1.02] transition-all duration-300 border-2 hover:border-purple-400 animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-1 text-purple-700">{exercise.title}</h3>
                      <p className="text-gray-600">{exercise.topic}</p>
                    </div>
                    <Icon name="ChevronRight" className="text-purple-400 group-hover:text-purple-600 transition-colors" size={32} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'answer' && selectedExercise && (
        <section className="container mx-auto px-4 py-12">
          <Button 
            onClick={() => setActiveSection('exercises')} 
            variant="outline" 
            className="mb-6"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к упражнениям
          </Button>
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-purple-300 shadow-2xl">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <div className="inline-block px-6 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
                    <p className="text-purple-700 font-semibold">{selectedSubject} • {selectedClass} класс</p>
                  </div>
                  <h2 className="text-3xl font-bold mb-2">{selectedExercise.title}</h2>
                  <p className="text-gray-600 text-lg">{selectedExercise.topic}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-6">
                  <h3 className="font-bold text-xl mb-4 text-purple-700">Решение:</h3>
                  <p className="text-lg leading-relaxed whitespace-pre-line">{selectedExercise.answer}</p>
                </div>
                <div className="flex gap-4">
                  <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Icon name="Download" size={20} className="mr-2" />
                    Скачать PDF
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Icon name="Share2" size={20} className="mr-2" />
                    Поделиться
                  </Button>
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