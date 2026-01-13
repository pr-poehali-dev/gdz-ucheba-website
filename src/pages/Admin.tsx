import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
}

interface Exercise {
  id: number;
  subject: string;
  class_number: number;
  title: string;
  topic: string;
  answer: string;
  is_published: boolean;
  created_at: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalExercises: 0, activeUsers: 0 });
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false);
  const [newExercise, setNewExercise] = useState({
    subject: '',
    class_number: 1,
    title: '',
    topic: '',
    answer: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@gdz.ucheba' && password === 'admin123') {
      setIsAuthenticated(true);
      loadData();
    } else {
      alert('Неверный email или пароль');
    }
  };

  const loadData = async () => {
    try {
      const API_URL = 'https://functions.poehali.dev/12252fab-74bb-4b23-95a8-acfd95ba7227';
      const usersRes = await fetch(`${API_URL}?action=users`);
      const exercisesRes = await fetch(`${API_URL}?action=exercises`);
      
      if (usersRes.ok && exercisesRes.ok) {
        const usersData = await usersRes.json();
        const exercisesData = await exercisesRes.json();
        setUsers(usersData);
        setExercises(exercisesData);
        setStats({
          totalUsers: usersData.length,
          totalExercises: exercisesData.length,
          activeUsers: usersData.filter((u: User) => u.is_active).length,
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  };

  const handleAddExercise = async () => {
    try {
      const API_URL = 'https://functions.poehali.dev/12252fab-74bb-4b23-95a8-acfd95ba7227';
      const response = await fetch(`${API_URL}?action=exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExercise),
      });
      
      if (response.ok) {
        setIsAddExerciseOpen(false);
        loadData();
        setNewExercise({ subject: '', class_number: 1, title: '', topic: '', answer: '' });
      }
    } catch (error) {
      console.error('Ошибка добавления упражнения:', error);
    }
  };

  const handleToggleUserStatus = async (userId: number, currentStatus: boolean) => {
    try {
      const API_URL = 'https://functions.poehali.dev/12252fab-74bb-4b23-95a8-acfd95ba7227';
      await fetch(`${API_URL}?action=users`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, is_active: !currentStatus }),
      });
      loadData();
    } catch (error) {
      console.error('Ошибка обновления пользователя:', error);
    }
  };

  const handleDeleteExercise = async (exerciseId: number) => {
    if (confirm('Удалить это упражнение?')) {
      try {
        const API_URL = 'https://functions.poehali.dev/12252fab-74bb-4b23-95a8-acfd95ba7227';
        await fetch(`${API_URL}?action=exercises`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ exercise_id: exerciseId }),
        });
        loadData();
      } catch (error) {
        console.error('Ошибка удаления упражнения:', error);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-purple-200 shadow-2xl">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Icon name="Shield" size={40} className="text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Админ-панель
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gdz.ucheba"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Shield" className="text-purple-600" size={32} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Админ-панель GDZ.UCHEBA
            </h1>
          </div>
          <Button onClick={() => setIsAuthenticated(false)} variant="outline">
            <Icon name="LogOut" size={20} className="mr-2" />
            Выйти
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Всего пользователей</p>
                  <p className="text-4xl font-bold text-purple-600">{stats.totalUsers}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                  <Icon name="Users" size={32} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-pink-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Активных пользователей</p>
                  <p className="text-4xl font-bold text-pink-600">{stats.activeUsers}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
                  <Icon name="UserCheck" size={32} className="text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Всего упражнений</p>
                  <p className="text-4xl font-bold text-blue-600">{stats.totalExercises}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <Icon name="BookOpen" size={32} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-2">
            <TabsTrigger value="users" className="text-lg">
              <Icon name="Users" size={20} className="mr-2" />
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="exercises" className="text-lg">
              <Icon name="BookOpen" size={20} className="mr-2" />
              Упражнения
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>База пользователей</span>
                  <Badge variant="secondary">{users.length} человек</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Имя</TableHead>
                        <TableHead>Роль</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Дата регистрации</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                            Нет пользователей
                          </TableCell>
                        </TableRow>
                      ) : (
                        users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.full_name || '—'}</TableCell>
                            <TableCell>
                              <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                {user.role === 'admin' ? 'Админ' : 'Пользователь'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={user.is_active ? 'default' : 'destructive'}>
                                {user.is_active ? 'Активен' : 'Заблокирован'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(user.created_at).toLocaleDateString('ru-RU')}
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleToggleUserStatus(user.id, user.is_active)}
                              >
                                {user.is_active ? 'Заблокировать' : 'Разблокировать'}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exercises">
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Управление упражнениями</span>
                  <Dialog open={isAddExerciseOpen} onOpenChange={setIsAddExerciseOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        <Icon name="Plus" size={20} className="mr-2" />
                        Добавить упражнение
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Добавить новое упражнение</DialogTitle>
                        <DialogDescription>
                          Заполните все поля для создания нового упражнения
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="subject">Предмет</Label>
                          <Select
                            value={newExercise.subject}
                            onValueChange={(value) => setNewExercise({ ...newExercise, subject: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите предмет" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Математика">Математика</SelectItem>
                              <SelectItem value="Русский язык">Русский язык</SelectItem>
                              <SelectItem value="Английский язык">Английский язык</SelectItem>
                              <SelectItem value="Физика">Физика</SelectItem>
                              <SelectItem value="Химия">Химия</SelectItem>
                              <SelectItem value="Биология">Биология</SelectItem>
                              <SelectItem value="История">История</SelectItem>
                              <SelectItem value="География">География</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="class">Класс</Label>
                          <Select
                            value={newExercise.class_number.toString()}
                            onValueChange={(value) => setNewExercise({ ...newExercise, class_number: parseInt(value) })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1,2,3,4,5,6,7,8,9,10,11].map(n => (
                                <SelectItem key={n} value={n.toString()}>{n} класс</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="title">Название</Label>
                          <Input
                            id="title"
                            value={newExercise.title}
                            onChange={(e) => setNewExercise({ ...newExercise, title: e.target.value })}
                            placeholder="Упражнение 1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="topic">Тема</Label>
                          <Input
                            id="topic"
                            value={newExercise.topic}
                            onChange={(e) => setNewExercise({ ...newExercise, topic: e.target.value })}
                            placeholder="Сложение чисел"
                          />
                        </div>
                        <div>
                          <Label htmlFor="answer">Решение</Label>
                          <Textarea
                            id="answer"
                            value={newExercise.answer}
                            onChange={(e) => setNewExercise({ ...newExercise, answer: e.target.value })}
                            placeholder="Подробное решение с ответом..."
                            rows={6}
                          />
                        </div>
                        <Button onClick={handleAddExercise} className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                          Добавить
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Предмет</TableHead>
                        <TableHead>Класс</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Тема</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {exercises.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                            Нет упражнений
                          </TableCell>
                        </TableRow>
                      ) : (
                        exercises.map((exercise) => (
                          <TableRow key={exercise.id}>
                            <TableCell className="font-medium">{exercise.id}</TableCell>
                            <TableCell>{exercise.subject}</TableCell>
                            <TableCell>{exercise.class_number}</TableCell>
                            <TableCell>{exercise.title}</TableCell>
                            <TableCell>{exercise.topic}</TableCell>
                            <TableCell>
                              <Badge variant={exercise.is_published ? 'default' : 'secondary'}>
                                {exercise.is_published ? 'Опубликовано' : 'Черновик'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteExercise(exercise.id)}
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}