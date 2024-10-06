<template>
    <div>
        <h1 v-if="employees.length"></h1>
        <h1 v-else>Загрузка...</h1>
        <ul>
            <li
                v-for="(employee, index) in employees"
                :key="employee.id">
                {{ employee }}
                <NuxtLink :to="`/${employee.id}`">{{ employee.name }} - {{ employee.position }}</NuxtLink>
            </li>
        </ul>
        <div>
            <button @click="prevPage" :disabled="currentPage === 1">Предыдущая</button>
            <span>Страница {{ currentPage }}</span>
            <button @click="nextPage" :disabled="currentPage >= totalPages">Следующая</button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const employees = ref([]);
const currentPage = ref(parseInt(route.query.page) || 1);
const limit = 2; // Количество сотрудников на странице
const total = ref(0);
const totalPages = ref(0);

// Функция для получения данных
const getData = async (page) => {
    const response = await $fetch(`/api/employees?page=${page}&limit=${limit}`);
    employees.value = response.employees; // Присваиваем массив сотрудников
    total.value = response.total; // Присваиваем общее количество сотрудников
    totalPages.value = Math.ceil(total.value / limit); // Пересчитываем общее количество страниц
};

// Функция для перехода на следующую страницу
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        updateRoute();
    }
};

// Функция для перехода на предыдущую страницу
const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        updateRoute();
    }
};

// Функция для обновления маршрута
const updateRoute = () => {
    router.push({ path: '/', query: { page: currentPage.value } });
};

// Наблюдатель для изменения параметра страницы
watch(() => route.query.page, (newPage) => {
    currentPage.value = parseInt(newPage) || 1;
    getData(currentPage.value);
});
// Получение данных при монтировании компонента
getData(currentPage.value);
</script>

<style scoped>
/* Ваши стили здесь */
</style>