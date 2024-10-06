import { defineEventHandler, getQuery } from 'h3';

const employees = [
    { id: 1, name: 'Иван Иванов', position: 'Разработчик' },
    { id: 2, name: 'Петр Петров', position: 'Дизайнер' },
    { id: 3, name: 'Сидор Сидоров', position: 'Менеджер' },
    { id: 4, name: 'Анна Смирнова', position: 'Менеджер проектов' },
    { id: 5, name: 'Ольга Кузнецова', position: 'Аналитик' }
];

export default defineEventHandler((event) => {
    // Используем getQuery для получения параметров запроса
    const query = getQuery(event);
    const page = parseInt(query.page) || 1; // Получаем номер страницы из параметров запроса
    const limit = 2; // Количество сотрудников на странице
    const start = (page - 1) * limit;
    const end = start + limit;

    // Получаем нужные данные для текущей страницы
    const paginatedEmployees = employees.slice(start, end);

    // Возвращаем данные в нужном формате
    return {
        employees: paginatedEmployees,
        total: employees.length
    };
});
