// Обробник події для кнопки "Add" при натисканні
document.getElementById('addButton').addEventListener('click', function() {
  const inputField = document.getElementById('inputField'); // Поле для введення
  const inputValue = inputField.value.trim(); // При отриманні інформації забирає пробіли
  const regex = /^([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)$/; // Перевіряє формат "Name = Value"

  // Перевіряємо чи відповідає введена інформація значенню формату
  if (regex.test(inputValue)) {
    const [_, name, value] = inputValue.match(regex); // За допомогою регулярного виразу розподіляємо на 'name' та 'value'
    const list = document.getElementById('list'); // тут ми отримуємо список з елементами
    const listItem = document.createElement('li'); // Створює новий пункт у списку

    // Створюємо значення для нового елементу у списку
    listItem.innerHTML = `
            <span>${name} = ${value}</span>
            <input type="checkbox" class="select-item"> <!-- Галочка -->
        `;
    list.appendChild(listItem); // Створюю сам елемент для значення
    inputField.value = ''; // Очистка поля
  } else {
    // Висвітлюю попередження якщо введення не написане належним чином
    alert('Invalid format. Please enter in the format: Name = Value');
  }
});

// для кнопки "Sort by Name" створюю обробник подій
document.getElementById('sortByName').addEventListener('click', function() {
  sortList('name'); // Тут ми робимо сортування за Name
});

// для кнопки "Sort by Value" створюю обробник подій
document.getElementById('sortByValue').addEventListener('click', function() {
  sortList('value'); // Робимо сортування за Value
});

// Для кнопки "Delete Selected" робимо подію для видалення вибраної пари Name=Value
document.getElementById('deleteSelected').addEventListener('click', function() {
  const listItems = document.querySelectorAll('#list li'); // Отримуємо всі елементи списку
  listItems.forEach(item => {
    const checkbox = item.querySelector('.select-item'); // Знаходимо галочку в усіх збережених елементах
    if (checkbox.checked) {
      item.remove(); // видаляємо елемент якщо він виділений галочкою
    }
  });
});

// Функція для сортування елементів у списку
function sortList(criteria) {
  const list = document.getElementById('list'); // Беремо список
  const listItems = Array.from(list.children); // Перетворюємо HTML у масив
  const sortedItems = listItems.sort((a, b) => {
    const [nameA, valueA] = a.querySelector('span').textContent.split(' = '); // Розділяємо сам текст елемента на name і value
    const [nameB, valueB] = b.querySelector('span').textContent.split(' = ');

    // Сортуємо: 'name' або 'value'
    if (criteria === 'name') {
      return nameA.localeCompare(nameB); // Сортування за Name
    } else if (criteria === 'value') {
      return valueA.localeCompare(valueB); // Сортування за Value
    }
  });

  list.innerHTML = ''; // Обнуляєм список
  sortedItems.forEach(item => list.appendChild(item)); // Додаємо уже відсортовані елементи
}

