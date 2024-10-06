
import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
    return [
        { id: 1, name: 'Иван Иванов', position: 'Разработчик' },
        { id: 2, name: 'Петр Петров', position: 'Дизайнер' },
        { id: 3, name: 'Сидор Сидоров', position: 'Менеджер' }
    ];
});