import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor() { }


  dictionary: {id: string, ukr: string}[] = [
    {
      id: 'Achieve the unattainable!',
      ukr: 'Досягни недосяжне!'
    },
    {
      id: 'Set unachievable goals and achieve them. Create an unlimited number of task lists and manage them all at the same time',
      ukr: 'Встановюйте недосяжні цілі та досягайте їх. Створюйте необмежену кількість списків завдань та керуйте ними одночасно'
    },
    {
      id: 'Sign in',
      ukr: 'Вхід'
    },
    {
      id: 'Sign up',
      ukr: 'Реєстрація'
    },
    {
      id: 'Dashboard',
      ukr: 'Меню'
    },
    {
      id: 'Login',
      ukr: 'Вхід'
    },
    {
      id: 'Registration',
      ukr: 'Реєстрація'
    },
    {
      id: 'Logout',
      ukr: 'Вихід'
    },
    {
      id: 'en',
      ukr: 'анг'
    },
    {
      id: 'ukr',
      ukr: 'укр'
    },
    {
      id: 'Email',
      ukr: 'Електронна пошта'
    },
    {
      id: 'Password',
      ukr: 'Пароль'
    },
    {
      id: 'date of creation',
      ukr: 'дата створення'
    },
    {
      id: 'date of execution',
      ukr: 'дата виконання'
    },
    {
      id: 'priority',
      ukr: 'приоритет'
    },
    {
      id: 'discription',
      ukr: 'опис'
    },
    {
      id: 'done',
      ukr: 'стан виконання'
    },
    {
      id: 'Low',
      ukr: 'Низький'
    },
    {
      id: 'Normal',
      ukr: 'Нормальний'
    },
    {
      id: 'High',
      ukr: 'Високий'
    },
    {
      id: 'Task',
      ukr: 'Завдання'
    },
    {
      id: 'Todo',
      ukr: 'Списки завдань'
    },
    {
      id: 'Creation',
      ukr: 'Створення'
    },
    {
      id: 'Execution',
      ukr: 'Виконання'
    },
    {
      id: 'Add new task to',
      ukr: 'Додати нове завдання у'
    },
    {
      id: 'list',
      ukr: 'список'
    },
    {
      id: 'name',
      ukr: "ім'я"
    },
    {
      id: 'more settings...',
      ukr: 'більше налаштувань...'
    },
    {
      id: 'Add task',
      ukr: 'Додати завдання'
    },
    {
      id: 'Sort data',
      ukr: 'Сортувати'
    },
    {
      id: 'Priority',
      ukr: 'Приоритет'
    },
    {
      id: 'Edit',
      ukr: 'Редагувати'
    },
    {
      id: 'Delete',
      ukr: 'Видалити'
    },
    {
      id: 'Start now!',
      ukr: 'Почни зараз!'
    },
    {
      id: 'Create your task lists and add new tasks.',
      ukr: 'Створюй свої списки задач та додавай до них нові завдання'
    },
    {
      id: 'Go to the menu and create your first To-Do.',
      ukr: 'Перейдіть у меню та створіть свій перший список задач'
    },
    {
      id: 'Get start',
      ukr: 'Розпочати'
    },
    {
      id: 'All tasks',
      ukr: 'Всі завдання'
    },
    {
      id: 'color',
      ukr: 'колір'
    },
    {
      id: 'Add todo',
      ukr: 'Додати список завдань'
    },
    {
      id: 'List of ToDo',
      ukr: 'Перелік списків завдань'
    },
    {
      id: 'Get all To-Do',
      ukr: 'Отримати всі завдання'
    },
    {
      id: 'Add',
      ukr: 'Додати'
    },
    {
      id: 'Add new ToDo',
      ukr: 'Додати новий список завдань'
    },
    {
      id: 'The password is invalid or the user does not have a password.',
      ukr: 'Пароль недійсний або користувач не має пароля.'
    },
    {
      id: 'There is no user record corresponding to this identifier. The user may have been deleted.',
      ukr: 'Не існує користувача з такою електронною поштою. Або користувач може бути видалений.'
    },
    {
      id: 'Please enter a valid email address',
      ukr: 'Будь ласка, введіть дійсну адресу електронної пошти'
    },
    {
      id: 'Please enter a password',
      ukr: 'Введіть пароль'
    },
    {
      id: 'Confirm Password',
      ukr: 'Підтвердіть пароль'
    },
    {
      id: 'password does not match',
      ukr: 'пароль не співпадає'
    },
    {
      id: 'Password must contain at least one letter, at least one number, and be longer than six characters',
      ukr: 'Пароль має містити хочаб одну одну цифру та одну літеру та бути довшим за шість символів'
    },
    {
      id: 'Please enter a valid password',
      ukr: 'Будь ласка задайте правельний пароль'
    },
    {
      id: 'The email address is already in use by another account.',
      ukr: 'Адреса електронної пошти вже використовується іншим обліковим записом.'
    },
    {
      id: 'The email address is badly formatted.',
      ukr: 'Такої адреси електронної пошти не існує'
    },
    {
      id: 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.',
      ukr: "Сталася помилка мережі (наприклад, час очікування, перерване з'єднання або недоступний хост)"
    }

  ]


  
}

