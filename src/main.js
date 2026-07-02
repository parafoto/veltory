// ═══════════════════════════════════════════════════════
// HE Paramotores — heparamotor.ru
// Unified codebase — single source of truth
// ═══════════════════════════════════════════════════════

const AI_DIAG = {
  no_start: {
    title: 'ДВИГАТЕЛЬ НЕ ЗАВОДИТСЯ',
    steps: [
      'Проверьте наличие топлива в баке',
      'Проверьте топливный кран — он должен быть открыт',
      'Проверьте свечу зажигания: выкрутите, осмотрите электрод',
      'Проверьте искру: вставьте свечу в колпачок, приложите к корпусу, потяните стартер',
      'Если искры нет: замените свечу (BR9ES, зазор 0.7mm)',
      'Если искра есть: проверьте подачу топлива — снимите шланг с карбюратора',
      'Если топливо не поступает: продуйте топливный фильтр, проверьте шланг',
      'Если топливо поступает: проверьте мембраны карбюратора Walbro 37',
      'Проверьте компрессию: приложите палец к свечному отверстию и потяните стартер'
    ],
    parts: ['Свеча BR9ES', 'Мембраны Walbro', 'Топливный фильтр', 'Топливный шланг'],
    critical: 'Если компрессии нет — не эксплуатируйте двигатель. Обратитесь к специалисту.'
  },
  hard_start: {
    title: 'ТРУДНЫЙ ЗАПУСК',
    steps: [
      'Проверьте свечу: цвет электрода должен быть кофейно-коричневым',
      'Если свеча чёрная и мокрая: переобогащённая смесь',
      'Винт H: поверните на 1/8 оборота ПО часовой',
      'Винт L: поверните на 1/8 оборота ПО часовой',
      'Проверьте воздушный фильтр: если забит — прочистите или замените',
      'Проверьте праймер: нажмите 3-5 раз перед запуском',
      'Проверьте высоковольтный провод и колпачок',
      'Проверьте зазор свечи: должен быть 0.7mm'
    ],
    parts: ['Свеча BR9ES', 'Воздушный фильтр', 'Колпачок свечи'],
    critical: 'При температуре ниже +5°C используйте праймер 5-7 раз.'
  },
  stall: {
    title: 'ГЛОХНЕТ НА ХОЛОСТЫХ',
    steps: [
      'Проверьте обороты холостого хода: должны быть 2000-2200 RPM',
      'Если обороты низкие: винт холостого хода — поверните ПРОТИВ часовой на 1/4 оборота',
      'Проверьте винт L: 1/4 — 1/3 оборота от полностью закрученного',
      'Проверьте мембраны карбюратора: изношенная мембрана = нестабильные обороты',
      'Проверьте прокладку между карбюратором и цилиндром',
      'Проверьте подсос воздуха: в соединениях патрубков, прокладках',
      'Проверьте топливный фильтр и шланг'
    ],
    parts: ['Мембраны Walbro 37', 'Прокладка карбюратора', 'Топливный фильтр'],
    critical: 'Нестабильный холостой ход на высоте может привести к остановке двигателя!'
  },
  overheat: {
    title: 'ПЕРЕГРЕВ',
    steps: [
      'НЕМЕДЛЕННО снизьте обороты!',
      'Проверьте пропеллер: неправильный шаг = перегрузка',
      'Проверьте масло в топливе: должно быть 2.5% (40:1)',
      'Проверьте карбюратор: обеднённая смесь = перегрев',
      'Проверьте охлаждение: воздушные каналы не забиты',
      'Проверьте компрессию: высокая компрессия = increased heat',
      'CHT > 250°C — НЕДОПУСТИМО, остановите двигатель'
    ],
    parts: ['Пропеллер', 'Масло Motul 710', 'Мембраны Walbro 37'],
    critical: 'EGT > 600°C или CHT > 250°C — НЕМЕДЛЕННАЯ ОСТАНОВКА!'
  },
  low_power: {
    title: 'СНИЖЕНИЕ МОЩНОСТИ',
    steps: [
      'Проверьте пропеллер: трещины, деформация, износ',
      'Проверьте компрессию: должна быть > 6 бар',
      'Проверьте свечу: изношенный электрод = потеря искры',
      'Проверьте карбюратор: засорение жиклёров',
      'Проверьте воздушный фильтр',
      'Проверьте выхлопную систему: забитый глушитель',
      'Проверьте ремень/сцепление: проскальзывание'
    ],
    parts: ['Пропеллер', 'Свеча BR9ES', 'Воздушный фильтр', 'Ремень Poly V Belt'],
    critical: 'Снижение мощности на взлёте опасно — проверьте перед каждым полётом.'
  },
  spark_black: {
    title: 'ЧЁРНАЯ СВЕЧА',
    steps: [
      'Чёрная свеча = переобогащённая смесь',
      'Винт H: поверните ПРОТИВ часовой на 1/8 оборота',
      'Проверьте воздушный фильтр: забитый фильтр = мало воздуха',
      'Проверьте праймер: не переполняйте бак',
      'Проверьте иглу карбюратора: износ = переобогащение',
      'Прочистите свечу: мелкая наждачная бумага'
    ],
    parts: ['Свеча BR9ES', 'Воздушный фильтр', 'Мембраны Walbro 37'],
    critical: 'Длительная работа на богатой смеси = нагар на поршне и кольцах.'
  },
  spark_white: {
    title: 'БЕЛАЯ СВЕЧА',
    steps: [
      'Белая свеча = обеднённая смесь (ОПАСНО!)',
      'Винт H: поверните ПО часовой на 1/8 оборота',
      'Проверьте топливный фильтр: засор = мало топлива',
      'Проверьте шланги: подсос воздуха',
      'Проверьте уровень топлива в баке',
      'НЕ ЛЕТАЙТЕ на обеднённой смеси — прогар поршня!'
    ],
    parts: ['Топливный фильтр', 'Топливный шланг', 'Свеча BR9ES'],
    critical: 'Белая свеча = риск прогара поршня! Обеднённая смесь убивает двигатель.'
  },
  vibration: {
    title: 'ПОВЫШЕННАЯ ВИБРАЦИЯ',
    steps: [
      'Проверьте крепление двигателя к раме',
      'Проверьте балансировку пропеллера',
      'Проверьте подшипники коленвала',
      'Проверьте крепление глушителя',
      'Проверьте люфт коленвала:纵向 люфт недопустим',
      'Проверьте маховик: крепление, баланс'
    ],
    parts: ['Подшипник коленвала', 'Подшипник первичного вала', 'Пропеллер'],
    critical: 'Сильная вибрация может привести к разрушению рамы!'
  },
  noise: {
    title: 'ПОСТОРОННИЙ ШУМ',
    steps: [
      '金属ный стук = подшипники, шатун',
      'Шипение = подсос воздуха',
      'Глухой стук = поршень/цилиндр',
      'Свист = ремень, сцепление',
      'Продиагностируйте на ХХ: увеличьте обороты плавно',
      'Запишите характер шума для специалиста'
    ],
    parts: ['Подшипник коленвала', 'Подшипник первичного вала', 'Ремень Poly V Belt'],
    critical: 'При металлическом стуке НЕ продолжайте полёт!'
  },
  smoke: {
    title: 'ДЫМ ИЗ ВЫХЛОПА',
    steps: [
      'Норма: лёгкий голубоватый дым на холодном двигателе',
      'Белый густой дым: вода в топливе или прокладка',
      'Чёрный дым: переобогащённая смесь',
      'Сизый дым: масло попадает в камеру сгорания',
      'Проверьте масло в топливе: не более 2.5%',
      'Проверьте прокладку головки цилиндра'
    ],
    parts: ['Прокладка головки', 'Сальник коленвала', 'Масло Motul 710'],
    critical: 'Густой белый дым — немедленно проверьте прокладку головки.'
  },
  fuel_leak: {
    title: 'УТЕЧКА ТОПЛИВА',
    steps: [
      'Определите место утечки: бак, шланг, карбюратор',
      'Проверьте хомуты на шлангах',
      'Проверьте прокладки карбюратора',
      'Проверьте топливный кран',
      'Проверьте крышку бака: уплотнитель',
      'НЕ ЗАПУСКАЙТЕ двигатель при утечке топлива!'
    ],
    parts: ['Топливный шланг', 'Хомуты', 'Прокладка карбюратора', 'Топливный кран'],
    critical: 'Утечка топлива = риск возгорания. Не летайте!'
  },
  oil_leak: {
    title: 'УТЕЧКА МАСЛА',
    steps: [
      'Определите место: сальники, прокладки, крышка',
      'Проверьте сальники коленвала',
      'Проверьте прокладку картера',
      'Проверьте уровень масла в топливе',
      'Проверьте крышку маслозаливной горловины',
      'Масляное пятно под двигателем = сальник'
    ],
    parts: ['Сальник коленвала', 'Сальник первичного вала', 'Прокладка картера'],
    critical: 'Масло на ремне/сцеплении — замена сальника обязательна.'
  }
};

const AI_PARTS_DB_SEARCH = {
  'поршень': ['Поршень HQ diamond graphite', 'Поршневые кольца chromed (2)', 'Стопорное кольцо поршневого пальца', 'Палец поршневой'],
  'кольца': ['Поршневые кольца chromed (2)', 'Компрессионное кольцо', 'Маслосъёмное кольцо'],
  'карбюратор': ['Карбюратор Walbro 37', 'Мембраны Walbro 37 (комплект)', 'Прокладка карбюратора', 'Диафрагма Walbro 37', 'Игольчатый клапан'],
  'мембран': ['Мембраны Walbro 37 (комплект)', 'Диафрагма Walbro 37'],
  'свеча': ['Свеча NGK BR9ES'],
  'фильтр': ['Фильтр воздушный', 'Фильтр топливный'],
  'зажиган': ['Катушка зажигания', 'Модуль зажигания IDI', 'Высоковольтный провод', 'Колпачок свечи'],
  'глушитель': ['Глушитель карбоновый', 'Глушитель Db-Killer', 'Крепление глушителя'],
  'стартер': ['Стартер ручной', 'Комплект Flash-стартера', 'Шнур стартера', 'Пружина стартера', 'Барабан стартера'],
  'сцеплен': ['Колодки сцепления', 'Диск сцепления', 'Пружина сцепления', 'Ремень Poly V Belt'],
  'ремень': ['Ремень Poly V Belt'],
  'пропел': ['Пропеллер дюраль 122cm', 'Пропеллер дюраль 130cm', 'Пропеллер carbon 130cm'],
  'прокладк': ['Прокладка головки', 'Прокладка цилиндра', 'Прокладка картера', 'Прокладка карбюратора', 'Прокладка выхлопа'],
  'подшипн': ['Подшипник коленвала', 'Подшипник первичного вала', 'Подшипник сцепления'],
  'бак': ['Бак топливный 12л', 'Бак топливный 18л', 'Крышка бака', 'Топливный кран'],
  'сальник': ['Сальник коленвала', 'Сальник первичного вала'],
  'трос': ['Трос газа', 'Трос ручного газа'],
  'рида': ['Редклапан (рид)', 'Корпус ридклапана']
};

const AI_MAINT_DATA = {
  intervals: [
    { hours: 25, title: 'ТО-25 (25 моточасов)', items: ['Затянуть все крепежные элементы', 'Проверить и почистить свечу (BR9ES, 0.7mm)', 'Проверить воздушный фильтр', 'Проверить карбюратор', 'Проверить мембраны карбюратора', 'Проверить ручной стартер', 'Проверить топливные шланги и хомуты', 'Проверить крепление глушителя', 'Проверить крепление двигателя к раме'], estimated: '2 500 руб' },
    { hours: 50, title: 'ТО-50 (50 моточасов)', items: ['Всё из ТО-25 +:', 'Заменить свечу (BR9ES)', 'Заменить мембраны карбюратора', 'Проверить поршневые кольца', 'Проверить компрессию', 'Проверить ремень/сцепление', 'Проверить подшипники', 'Проверить выхлопную систему'], estimated: '4 200 руб' },
    { hours: 100, title: 'ТО-100 (100 моточасов)', items: ['Всё из ТО-50 +:', 'Заменить резиновые уплотнения', 'Заменить поршневые кольца (2 chromed rings)', 'Проверить подшипники коленвала', 'Заменить карбюраторный комплект', 'Проверить сальники коленвала', 'Проверить цилиндр (Nikasil)'], estimated: '8 500 руб' },
    { hours: 150, title: 'ТО-150 (150 моточасов)', items: ['Всё из ТО-100 +:', 'Заменить сцепление', 'Заменить подшипники первичного вала', 'Проверить шестерню редуктора', 'Проверить шатун'], estimated: '12 000 руб' },
    { hours: 200, title: 'ТО-200 (200 моточасов)', items: ['Всё из ТО-150 +:', 'Заменить все прокладки', 'Проверить головку цилиндра', 'Проверить покрытие Nikasil', 'Заменить поршень при необходимости', 'Проверить коленвал'], estimated: '18 000 руб' },
    { hours: 300, title: 'ТО-300 / КАПРЕМОНТ', items: ['Полный разбор двигателя', 'Замена поршневой группы', 'Замена всех подшипников', 'Замена всех сальников', 'Замена всех прокладок', 'Проверка/замена коленвала', 'Сборка, обкатка, тест на стенде'], estimated: '28 000 руб' }
  ]
};

// ── Navigation ──
function toggleMenu() {
  const b = document.querySelector('.burger');
  const t = document.getElementById('navTabs');
  if (b) b.classList.toggle('open');
  if (t) t.classList.toggle('open');
}

function toggleFAQ(id) {
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  const isOpen = el.style.display !== 'none';
  el.style.display = isOpen ? 'none' : 'block';
  const item = el.closest('.faq-item');
  if (item) item.classList.toggle('open', !isOpen);
}

function toggleSpecs(id) {
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  const isOpen = el.style.maxHeight && el.style.maxHeight !== '0px';
  document.querySelectorAll('.specs-panel').forEach(function(p) { p.style.maxHeight = '0px'; });
  if (!isOpen) {
    requestAnimationFrame(function() {
      el.style.maxHeight = el.scrollHeight + 'px';
    });
  }
}

function switchPage(id) {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  const page = document.getElementById('page-' + id);
  if (page) page.style.display = 'block';
  document.querySelectorAll('.ntab').forEach(t => {
    t.style.color = 'var(--td)';
    t.style.borderBottomColor = 'transparent';
  });
  const active = document.querySelector('[data-page="' + id + '"]');
  if (active) {
    active.style.color = 'var(--accent)';
    active.style.borderBottomColor = 'var(--accent)';
  }
  const titles = {
    home: 'HE Paramotores — База знаний',
    engines: 'Двигатели',
    parts: 'Запчасти',
    build: 'Конфигуратор',
    service: 'Сервис',
    ai: 'AI Сервисы',
    dash: 'Паспорт',
    library: 'Инструкции',
    compare: 'Сравнение',
    contact: 'Контакты',
    dealers: 'Дилеры',
    about: 'О проекте',
    individual: 'На заказ',
    faq: 'FAQ'
  };
  document.title = titles[id] || 'HE Paramotores';
  const descs = {
    home: 'Информационная платформа для русскоязычных пилотов. Техническая документация, AI-диагностика, каталог запчастей.',
    engines: '6 двигателей HE Paramotores: MVL 125, MV1 185, MV2 204, Raptor 250, RS-185, RS-206. Характеристики и сравнение.',
    parts: 'Каталог оригинальных запчастей HE Paramotores. Артикулы, совместимость, фильтры по моделям.',
    build: 'Конфигуратор двигателей HE Paramotores. 5 шагов, мгновенный расчёт стоимости.',
    service: 'Обслуживание и ремонт двигателей HE Paramotores. Калькулятор ТО, график работ.',
    ai: 'AI-диагностика, подбор запчастей, инструкции по ТО, напоминания о техническом обслуживании.',
    contact: 'Контакты: Ivan Rudek @ivan_rudek, HE Paramotores S.L. Madrid, Spain.',
    about: 'О проекте heparamotor.ru — информационная платформа для русскоязычных пилотов.',
    compare: 'Сравнение 6 моделей двигателей HE Paramotores по характеристикам.',
    library: 'Руководства по настройке карбюратора, обкатке, моментам затяжки, топливу.',
    dash: 'Паспорт двигателя HE Paramotores. Проверка по серийному номеру.',
    dealers: 'Дилеры HE Paramotores в России и СНГ.',
    individual: 'Конфигурация двигателей HE Paramotores на заказ.',
    faq: 'Часто задаваемые вопросы: выбор двигателя, обслуживание, запчасти.'
  };
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', descs[id] || descs.home);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Engines data (single source of truth) ──
const ENGINES = [
  {
    id: 'mvl', name: 'MVL 125cc', badge: 'Light',
    specs: { 'Тип': '2-тактный', 'Объём': '125cc', 'Цилиндр': 'Al Nikasil', 'Карб': 'Walbro 37', 'Зажигание': 'Inductive IDI', 'Свеча': 'BR9ES', 'Передача': 'Центроб. ременное', 'Стартер': 'Ручной / Flash', 'Выхлоп': 'Карбон', 'Охлаждение': 'Воздушное', 'Топливо': 'АИ-98 + масло 2.5%' },
    cmp: { volume: 125, power: 23, thrust: 73, weight: '26 кг', carb: 'Walbro 37', clutch: 'Ременное', ignition: 'IDI', starter: 'R/Flash/E' }
  },
  {
    id: 'mv1', name: 'MV1 185cc', badge: 'Bestseller',
    specs: { 'Тип': '2-тактный', 'Объём': '184.70cc (54x66mm)', 'Мощность': '25 HP при 8300 RPM', 'Оптимум': '8000-8300 RPM', 'Тяга': '75 кг / 70 кг', 'Вес': '13.4 кг', 'Расход': '4.3-4.7 л/ч', 'Цилиндр': 'Al Nikasil', 'Поршень': 'HQ diamond graphite', 'Карб': 'Walbro 37', 'Зажигание': 'Inductive IDI', 'Свеча': 'BR9ES 0.7mm', 'Передача': 'Центроб. ременное 1:2.90', 'Стартер': 'Ручной / Flash / Электро', 'Выхлоп': 'Карбон', 'Охлаждение': 'Воздушное', 'Топливо': 'АИ-98 + масло 2.5%', 'EGT/CHT': '550/250', 'Обороты': 'Макс 8300' },
    cmp: { volume: 184.70, power: 25, thrust: 75, weight: '13.4 кг', carb: 'Walbro 37', clutch: 'Ременное', ignition: 'IDI', starter: 'R/Flash/E' }
  },
  {
    id: 'mv2', name: 'MV2 204cc', badge: 'Bestseller',
    specs: { 'Тип': '2-тактный', 'Объём': '204cc (66x54mm)', 'Мощность': '29 HP при 8300 RPM', 'Оптимум': '8300-8600 RPM', 'Тяга': '75 кг / 70 кг', 'Вес': '13.6 кг', 'Расход': '4.3-4.7 л/ч', 'Цилиндр': 'Al Nikasil', 'Поршень': 'HQ diamond graphite', 'Карб': 'Walbro 37', 'Зажигание': 'Inductive IDI', 'Свеча': 'BR9ES 0.7mm', 'Передача': 'Центроб. ременное', 'Стартер': 'Ручной / Flash / Электро', 'Выхлоп': 'Карбон', 'Охлаждение': 'Воздушное', 'Топливо': 'АИ-98 + масло 2.5%', 'EGT/CHT': '550/250', 'Обороты': 'Макс 8600, Опт 8300-8600', 'Особенность': 'Двойной пуск' },
    cmp: { volume: 204, power: 29, thrust: 75, weight: '13.6 кг', carb: 'Walbro 37', clutch: 'Ременное', ignition: 'IDI', starter: 'R/Flash/E' }
  },
  {
    id: 'raptor', name: 'Raptor 250', badge: 'Flagship',
    specs: { 'Тип': '2-тактный', 'Объём': '277cc (66x54mm)', 'Мощность': '25 HP при 7800 RPM', 'Оптимум': '8300-8600 RPM', 'Тяга': '77 кг / 72 кг', 'Вес': '14.2 кг', 'Расход': '3.8-4.2 л/ч', 'Цилиндр': 'Al Nikasil', 'Поршень': 'HQ diamond graphite', 'Карб': 'Walbro 37', 'Зажигание': 'Inductive IDI', 'Свеча': 'BR9ES 0.7mm', 'Передача': 'Центроб. сухое', 'Стартер': 'Ручной / Flash / Электро', 'Выхлоп': 'Db-Killer карбон', 'Охлаждение': 'Воздушное', 'Топливо': 'АИ-98 + масло 2.5%', 'EGT/CHT': '550/250', 'Обороты': 'Макс 8600, Опт 8300-8600' },
    cmp: { volume: 277, power: 25, thrust: 77, weight: '14.2 кг', carb: 'Walbro 37', clutch: 'Сухое', ignition: 'IDI', starter: 'R/Flash/E' }
  },
  {
    id: 'rs185', name: 'RS-185', badge: 'New RS',
    specs: { 'Тип': '2-тактный', 'Объём': '185cc', 'Мощность': '26 HP', 'Серия': 'New RS', 'Цилиндр': 'Al Nikasil', 'Карб': 'Walbro', 'Зажигание': 'Электронная катушка', 'Передача': 'Poly V Belt', 'Охлаждение': 'Воздушное', 'Топливо': 'АИ-98 + масло 2.5%' },
    cmp: { volume: 185, power: 26, weight: '-', carb: 'Walbro', clutch: 'Poly V', ignition: 'Катушка', starter: 'Ручной' }
  },
  {
    id: 'rs206', name: 'RS-206', badge: 'Flagship',
    specs: { 'Тип': '2-тактный', 'Объём': '206cc', 'Мощность': '29 HP', 'Серия': 'New RS, флагман', 'Цилиндр': 'Al Nikasil', 'Карб': 'Walbro', 'Зажигание': 'Электронная катушка', 'Передача': 'Poly V Belt', 'Стартер': 'Flash starter', 'Охлаждение': 'Воздушное', 'Топливо': 'АИ-98 + масло 2.5%' },
    cmp: { volume: 206, power: 29, weight: '-', carb: 'Walbro', clutch: 'Poly V', ignition: 'Катушка', starter: 'Flash' }
  }
];

// ── Parts catalog ──
const TPL = [
  { n: 'Стартер', i: 'RF-001', c: 'starter', eur: 231 },
  { n: 'Задняя панель', i: 'RF-002', c: 'crankcase', eur: 58.56 },
  { n: 'Винт M8', i: 'RF-003', c: 'fastener', eur: 0.73 },
  { n: 'Катушка зажигания', i: 'RF-018', c: 'ignition', eur: 54 },
  { n: 'Картер A', i: 'RF-024', c: 'crankcase', eur: 198 },
  { n: 'Подшипник 6204', i: 'RF-026', c: 'bearing', eur: 11 },
  { n: 'Коленчатый вал', i: 'RF-028', c: 'crankcase', eur: 256 },
  { n: 'Картер B', i: 'RF-030', c: 'crankcase', eur: 198 },
  { n: 'Ремень', i: 'RF-042', c: 'drive', eur: 41 },
  { n: 'Рид-коробка', i: 'RF-047', c: 'reed', eur: 31.4 },
  { n: 'Карбюратор', i: 'RF-054', c: 'carb', eur: 1.7 },
  { n: 'Воздушный фильтр', i: 'RF-063', c: 'fuel', eur: 30.74 },
  { n: 'Поршень', i: 'RF-067', c: 'piston', eur: 103 },
  { n: 'Кольца', i: 'RF-068', c: 'piston', eur: 29 },
  { n: 'Цилиндр', i: 'RF-071', c: 'piston', eur: 317 },
  { n: 'Головка', i: 'RF-073', c: 'piston', eur: 146 },
  { n: 'Свеча', i: 'RF-075', c: 'ignition', eur: 5.36 },
  { n: 'Глушитель', i: 'RF-135', c: 'exhaust', eur: 91.5 }
];

let PARTS = [];
let _id = 1;
['mv1', 'mv2', 'mvl', 'rs185', 'rs206', 'raptor'].forEach(function(eng) {
  TPL.forEach(function(t) {
    PARTS.push({
      id: _id++,
      sku: eng.toUpperCase() + '-' + t.i,
      name: t.n,
      cat: t.c,
      eng: [eng],
      price: Math.round(t.eur * 100),
      eur: t.eur,
      stock: 1
    });
  });
});

const CATS = { all: 'All', piston: 'Piston', crankcase: 'Crankcase', carb: 'Carb', fuel: 'Filters', ignition: 'Ignition', exhaust: 'Exhaust', starter: 'Starter', drive: 'Drive', reed: 'Reed', bearing: 'Bearings', fastener: 'Fastener', misc: 'Misc' };
const CATO = ['all', 'piston', 'crankcase', 'carb', 'fuel', 'ignition', 'exhaust', 'starter', 'drive', 'reed', 'bearing', 'fastener', 'misc'];

// ── Configurator ──
const BUILD = [
  {
    key: 'engine', title: 'Двигатель',
    options: [
      { id: 'mvl', name: 'MVL 125cc', desc: 'Ежедневное.', price: 145000, specs: { HP: '23' } },
      { id: 'mv1', name: 'MV1 185cc', desc: 'Универсал.', price: 185000, specs: { HP: '25' } },
      { id: 'mv2', name: 'MV2 204cc', desc: 'Монстр.', price: 265000, specs: { HP: '29' } },
      { id: 'raptor', name: 'Raptor 250', desc: 'Тягач.', price: 220000, specs: { HP: '25' } },
      { id: 'rs185', name: 'RS-185', desc: 'Новый RS.', price: 165000, specs: { HP: '26' } },
      { id: 'rs206', name: 'RS-206', desc: 'Флагман.', price: 195000, specs: { HP: '29' } }
    ]
  },
  {
    key: 'frame', title: 'Рама',
    options: [
      { id: 'f1', name: 'Classic Steel', price: 38000 },
      { id: 'f2', name: 'Aero Al 7075', price: 58000 },
      { id: 'f3', name: 'Titan', price: 125000 }
    ]
  },
  {
    key: 'prop', title: 'Пропеллер',
    options: [
      { id: 'p1', name: 'Дюраль 2L', price: 14000 },
      { id: 'p2', name: 'Carbon 2L', price: 28000 }
    ]
  },
  {
    key: 'harness', title: 'Подвеска',
    options: [
      { id: 'h1', name: 'Standard', price: 18000 },
      { id: 'h2', name: 'Air', price: 32000 }
    ]
  },
  {
    key: 'acc', title: 'Аксессуары',
    options: [
      { id: 'a1', name: 'Бак 12л', price: 4500 },
      { id: 'a2', name: 'Бак 18л', price: 6200 },
      { id: 'a3', name: 'Праймер', price: 3200 }
    ]
  }
];

// ── Engine database (passports) ──
const EDB = {
  'HE-2024-MV1-00487': {
    model: 'MV1 185cc', year: 2024, serial: 'HE-2024-MV1-00487',
    status: 'На гарантии', owner: 'Сергей М.', reg: '15.03.2024', warr: '14.03.2026',
    hours: 87, lastTO: '45 м/ч', nextTO: '100 м/ч',
    history: [
      { d: '12.09.2024', t: 'ТО-45', desc: 'Свеча, фильтр.', cost: '4 200 руб' },
      { d: '15.03.2024', t: 'Ввод', desc: 'Регистрация.', cost: '—' }
    ],
    docs: [{ n: 'Паспорт', t: 'PDF' }, { n: 'Руководство MV1', t: 'PDF' }]
  },
  'HE-2023-RS206-00112': {
    model: 'RS-206', year: 2023, serial: 'HE-2023-RS206-00112',
    status: 'Гарантия истекла', owner: 'Андрей К.', reg: '08.07.2023', warr: '07.07.2025',
    hours: 312, lastTO: '300 м/ч', nextTO: '350 м/ч',
    history: [
      { d: '03.04.2025', t: 'ТО-300', desc: 'Капремонт.', cost: '28 400 руб' },
      { d: '15.09.2023', t: 'ТО-100', desc: 'Свечи, фильтр.', cost: '3 800 руб' }
    ],
    docs: [{ n: 'Паспорт', t: 'PDF' }]
  }
};

// ── Dealers ──
const DEALERS = [
  { name: 'Москва', addr: 'ул. Авиаторов 12', phone: '+7 495 123-45-67', tags: ['sales', 'service'] },
  { name: 'СПб', addr: 'Литейный пр. 48', phone: '+7 812 234-56-78', tags: ['sales', 'training'] },
  { name: 'Казань', addr: 'ул. Баумана 32', phone: '+7 843 345-67-89', tags: ['sales'] },
  { name: 'Сочи', addr: 'Курортный пр. 76', phone: '+7 862 456-78-90', tags: ['service', 'training'] },
  { name: 'Минск', addr: 'пр. Независимости 110', phone: '+375 17 567-89-01', tags: ['sales', 'service'] }
];

// ── State ──
let curEng = 'all';
let curCat = 'all';
let quote = [];
let buildSel = {};
let curBuildStep = 0;

// ── Parts rendering ──
function renderEngSel() {
  const el = document.getElementById('engSel');
  if (!el) return;
  el.innerHTML = [{ id: 'all', l: 'Все двигатели' }]
    .concat(ENGINES.map(function(e) { return { id: e.id, l: e.name }; }))
    .map(function(e) {
      return '<button class="p-pill' + (e.id === curEng ? ' active' : '') + '" onclick="filterEng(\'' + e.id + '\')" style="display:block;width:100%;text-align:left;margin-bottom:.15rem">' + e.l + '</button>';
    }).join('');
}

function renderCatFil() {
  const el = document.getElementById('catFil');
  if (!el) return;
  var base = curEng !== 'all' ? PARTS.filter(function(p) { return p.eng.includes(curEng); }) : PARTS;
  el.innerHTML = CATO.map(function(c) {
    return '<button class="p-pill' + (c === curCat ? ' active' : '') + '" onclick="filterCat(\'' + c + '\')" style="display:block;width:100%;text-align:left;margin-bottom:.15rem">' + CATS[c] + ' <span style="float:right;color:var(--td)">' + (c === 'all' ? base.length : base.filter(function(p) { return p.cat === c; }).length) + '</span></button>';
  }).join('');
}

function filterEng(e) { curEng = e; renderEngSel(); renderCatFil(); renderParts(); }
function filterCat(c) { curCat = c; renderCatFil(); renderParts(); }

function getParts() {
  var p = PARTS;
  if (curEng !== 'all') p = p.filter(function(x) { return x.eng.includes(curEng); });
  if (curCat !== 'all') p = p.filter(function(x) { return x.cat === curCat; });
  var q = (document.getElementById('pSearch')?.value || '').toLowerCase();
  if (q) p = p.filter(function(x) { return x.name.toLowerCase().includes(q) || x.sku.toLowerCase().includes(q); });
  return p;
}

function renderParts() {
  var el = document.getElementById('pGrid');
  if (!el) return;
  var parts = getParts();
  var cnt = document.getElementById('pShown');
  if (cnt) cnt.textContent = parts.length;
  el.innerHTML = parts.map(function(p) {
    return '<div class="p-card" onclick="addQ(' + p.id + ')"><div class="p-sku">' + p.sku + '</div><div class="p-name">' + p.name + '</div><div class="p-compat">' + p.eng.map(function(e) { return e.toUpperCase(); }).join(' / ') + '</div><div class="p-foot"><div class="p-price">EUR ' + p.eur.toFixed(2) + '</div><button class="btn btn-o btn-xs">+</button></div></div>';
  }).join('');
}

// ── Quote ──
function addQ(id) {
  if (!quote.find(function(q) { return q.id === id; })) {
    quote.push(PARTS.find(function(p) { return p.id === id; }));
    renderQuote();
    if (!document.getElementById('qPan').classList.contains('open')) toggleQ();
  }
}

function rmQ(id) { quote = quote.filter(function(q) { return q.id !== id; }); renderQuote(); }

function renderQuote() {
  var items = document.getElementById('qItems');
  var total = document.getElementById('qTotal');
  var cnt = document.getElementById('qCnt');
  if (!items || !total || !cnt) return;
  cnt.textContent = quote.length || '';
  if (!quote.length) {
    items.innerHTML = '<div class="q-empty">Добавьте запчасти</div>';
    total.innerHTML = '';
    return;
  }
  items.innerHTML = quote.map(function(q) {
    return '<div class="q-item"><div style="flex:1;min-width:0"><div class="q-item-name">' + q.name + '</div><div class="q-item-sku">' + q.sku + '</div></div><div class="q-item-price">EUR ' + q.eur.toFixed(2) + '</div><button class="q-item-rm" onclick="rmQ(' + q.id + ')">&#10005;</button></div>';
  }).join('');
  var sum = quote.reduce(function(s, q) { return s + q.price; }, 0);
  total.innerHTML = '<div class="q-total"><div class="q-total-l">Итого</div><div class="q-total-v">' + sum.toLocaleString() + ' руб</div></div>';
}

function toggleQ() {
  document.getElementById('qPan').classList.toggle('open');
  document.getElementById('qOv').classList.toggle('open');
}

function submitQ() {
  if (!quote.length) return;
  var b = document.querySelector('.q-panel .btn-g');
  if (!b) return;
  b.textContent = 'ОТПРАВЛЕНО';
  b.style.background = 'var(--g)';
  setTimeout(function() {
    b.textContent = 'СОХРАНИТЬ СПИСОК';
    b.style.background = '';
    quote = [];
    renderQuote();
    toggleQ();
  }, 2000);
}

// ── Configurator ──
function initBuild() {
  var el = document.getElementById('bldSteps');
  if (!el) return;
  el.innerHTML = BUILD.map(function(s, i) {
    return '<button class="bld-step' + (i === curBuildStep ? ' active' : '') + '" onclick="goBld(' + i + ')">' + s.title + '</button>';
  }).join('');
  renderBldPanel();
  renderBldSum();
}

function renderBldPanel() {
  var s = BUILD[curBuildStep];
  if (!s) return;
  var c = document.getElementById('bldPanels');
  if (!c) return;
  var pn = document.getElementById('bldPreviewModel');
  if (pn) {
    var eng = ENGINES.find(function(e) { return e.id === buildSel.engine; });
    pn.textContent = eng ? eng.name : '---';
  }
  c.innerHTML = '<div class="bld-panel active"><div class="label">ШАГ ' + (curBuildStep + 1) + '/' + BUILD.length + '</div><h3 style="margin:.2rem 0 .75rem">' + s.title.toUpperCase() + '</h3>' +
    s.options.map(function(o) {
      return '<div class="bld-card' + (buildSel[s.key] === o.id ? ' sel' : '') + '" onclick="selBld(\'' + s.key + '\',\'' + o.id + '\')"><h4>' + o.name + '</h4><p class="desc">' + (o.desc || '') + '</p><div class="bld-card-price">' + o.price.toLocaleString() + ' руб</div></div>';
    }).join('') +
    '<div style="display:flex;justify-content:space-between;margin-top:.75rem">' +
    (curBuildStep > 0 ? '<button class="btn btn-o btn-sm" onclick="goBld(' + (curBuildStep - 1) + ')">&#8592; Назад</button>' : '<span></span>') +
    '<button class="btn btn-g btn-sm" onclick="goBld(' + (curBuildStep + 1) + ')">' + (curBuildStep < BUILD.length - 1 ? '&#8594; Далее' : '&#10003; Готово') + '</button>' +
    '</div></div>';
}

function selBld(step, id) { buildSel[step] = id; renderBldPanel(); renderBldSum(); }

function goBld(n) {
  if (n < 0 || n > BUILD.length) return;
  curBuildStep = n;
  initBuild();
}

function renderBldSum() {
  var total = 0;
  var items = BUILD.map(function(s) {
    var o = s.options.find(function(x) { return x.id === buildSel[s.key]; });
    if (o) {
      total += o.price;
      return '<div class="bld-sum-row"><span style="font-size:.55rem;color:var(--td)">' + s.title + '</span><span>' + o.name + '</span></div>';
    }
    return '';
  }).join('');
  var si = document.getElementById('bldSumItems');
  if (si) si.innerHTML = items;
  var st = document.getElementById('bldSumTotal');
  if (st) st.textContent = total.toLocaleString() + ' руб';
  [6, 12, 24, 36].forEach(function(m) {
    var el = document.getElementById('inst' + m);
    if (el) el.textContent = total ? Math.round(total / m).toLocaleString() + ' руб/мес' : '---';
  });
}

// ── Maintenance calculator ──
var TO = [
  { h: 25, c: 2500, t: 'Крепёж, свечи, фильтр, карбюратор, мембраны, стартер, ремень' },
  { h: 50, c: 4200, t: 'Замена свечей, мембраны, чистка карбюратора' },
  { h: 100, c: 8500, t: 'Резинки, карбюратор, поршневые кольца, подшипники' },
  { h: 150, c: 12000, t: 'Сцепление, подшипники шестерни' },
  { h: 200, c: 18000, t: 'Прокладки, головка, цилиндр' },
  { h: 300, c: 28000, t: 'Полный капитальный ремонт' }
];

function calcTO() {
  var h = parseInt(document.getElementById('calcHours')?.value) || 0;
  var res = document.getElementById('calcResult');
  var warn = document.getElementById('calcWarn');
  var fill = document.getElementById('calcFill');
  if (!res) return;
  var overdue = TO.filter(function(s) { return h >= s.h * 1.1; });
  if (warn) warn.classList.toggle('show', overdue.length > 0);
  var next = TO.find(function(s) { return h < s.h; });
  if (fill) fill.style.width = next ? Math.min((h / next.h) * 100, 100) + '%' : '100%';
  var html = '';
  if (overdue.length) html += '<div style="color:var(--r);font-family:JetBrains Mono;font-size:.6rem;letter-spacing:.1em;margin-bottom:.4rem">ПРОСРОЧЕНО</div>';
  TO.forEach(function(s) {
    var done = h >= s.h;
    var cls = done ? (h >= s.h * 1.1 ? 'overdue' : 'done') : '';
    html += '<div class="calc-item ' + cls + '"><div class="calc-item-name">' + s.h + ' м/ч: ' + s.t + '</div><div class="calc-item-cost">' + (done ? (cls === 'overdue' ? '! ' : '') + 'Выполнено' : s.c.toLocaleString() + ' руб') + '</div></div>';
  });
  if (next) html += '<div class="calc-total"><span>Следующее: ' + next.h + ' м/ч</span><span>~' + next.c.toLocaleString() + ' руб</span></div>';
  res.innerHTML = html;
}

// ── Owner dashboard / passport ──
function lookup() {
  var input = document.getElementById('serIn')?.value?.trim().toUpperCase();
  var c = document.getElementById('dashC');
  if (!input || !c) return;
  var e = EDB[input];
  if (!e) {
    c.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--td)"><div style="font-size:1.5rem;margin-bottom:.4rem;opacity:.3">&#10005;</div>\u041d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e: <strong style="color:var(--t)">' + input + '</strong></div>';
    c.classList.add('vis');
    return;
  }
  var sb = e.status.includes('\u0438\u0441\u0442\u0435\u043a\u043b\u0430') ? 'badge-r' : 'badge-g';
  var qr = genQR(input);
  c.innerHTML = '<div class="passport"><div class="passport-head"><div><div class="passport-title">\u0426\u0418\u0424\u0420\u041e\u0412\u041e\u0419 \u041f\u0410\u0421\u041f\u041e\u0420\u0422</div><div class="passport-sn">' + e.serial + '</div></div><div class="passport-qr">' + qr + '</div></div><div class="passport-grid"><div class="passport-field"><div class="passport-field-l">\u041c\u043e\u0434\u0435\u043b\u044c</div><div class="passport-field-v">HE ' + e.model + '</div></div><div class="passport-field"><div class="passport-field-l">\u0413\u043e\u0434</div><div class="passport-field-v">' + e.year + '</div></div><div class="passport-field"><div class="passport-field-l">\u0412\u043b\u0430\u0434\u0435\u043b\u0435\u0446</div><div class="passport-field-v">' + e.owner + '</div></div><div class="passport-field"><div class="passport-field-l">\u0413\u0430\u0440\u0430\u043d\u0442\u0438\u044f</div><div class="passport-field-v">' + e.warr + '</div></div><div class="passport-field"><div class="passport-field-l">\u0421\u0442\u0430\u0442\u0443\u0441</div><div class="passport-field-v"><span class="badge ' + sb + '">' + e.status + '</span></div></div><div class="passport-field"><div class="passport-field-l">\u041d\u0430\u0440\u0430\u0431\u043e\u0442\u043a\u0430</div><div class="passport-field-v">' + e.hours + ' \u043c/\u0447</div></div><div class="passport-field"><div class="passport-field-l">\u0421\u043b\u0435\u0434. \u0422\u041e</div><div class="passport-field-v" style="color:var(--accent)">' + e.nextTO + '</div></div></div></div><div style="margin-bottom:1.5rem"><div class="label" style="margin-bottom:.75rem">\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u043e\u0431\u0441\u043b\u0443\u0436\u0438\u0432\u0430\u043d\u0438\u044f</div><table class="dash-table"><thead><tr><th>\u0414\u0430\u0442\u0430</th><th>\u0422\u0438\u043f</th><th>\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435</th><th>\u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c</th></tr></thead><tbody>' + e.history.map(function(h) { return '<tr><td>' + h.d + '</td><td>' + h.t + '</td><td>' + h.desc + '</td><td>' + h.cost + '</td></tr>'; }).join('') + '</tbody></table></div>';
  c.classList.add('vis');
}

function genQR(text) {
  var h = 0;
  for (var i = 0; i < text.length; i++) h = ((h << 5) - h) + text.charCodeAt(i);
  h |= 0;
  var cells = [];
  var s = 7, cs = 10;
  for (var r = 0; r < s; r++)
    for (var c = 0; c < s; c++) {
      var corner = (r < 3 && c < 3) || (r < 3 && c >= s - 3) || (r >= s - 3 && c < 3);
      var val = corner || ((h >> (r * s + c)) & 1);
      cells.push('<rect x="' + (c * cs) + '" y="' + (r * cs) + '" width="' + cs + '" height="' + cs + '" fill="' + (val ? 'var(--accent)' : 'var(--ds)') + '"/>');
    }
  return '<svg viewBox="0 0 ' + (s * cs) + ' ' + (s * cs) + '">' + cells.join('') + '</svg>';
}

// ── Dealers ──
function renderDealers(f) {
  f = f || 'all';
  var el = document.getElementById('dealerFilters');
  var g = document.getElementById('dealerGrid');
  if (!el || !g) return;
  el.innerHTML = ['all', 'sales', 'service'].map(function(tag) {
    return '<button class="dealer-filter' + (f === tag ? ' active' : '') + '" onclick="renderDealers(\'' + tag + '\')">' + (tag === 'all' ? '\u0412\u0441\u0435' : tag === 'sales' ? '\u041f\u0440\u043e\u0434\u0430\u0436\u0438' : '\u0421\u0435\u0440\u0432\u0438\u0441') + '</button>';
  }).join('');
  var filtered = f === 'all' ? DEALERS : DEALERS.filter(function(d) { return d.tags.includes(f); });
  g.innerHTML = filtered.map(function(d) {
    return '<div class="dealer-card"><div class="dealer-name">' + d.name + '</div><div class="dealer-addr">' + d.addr + '</div><div class="dealer-phone">' + d.phone + '</div><div class="dealer-tags">' + d.tags.map(function(tg) {
      return '<span class="dealer-tag ' + tg + '">' + (tg === 'sales' ? '\u041f\u0440\u043e\u0434\u0430\u0436\u0438' : tg === 'training' ? '\u041e\u0431\u0443\u0447\u0435\u043d\u0438\u0435' : '\u0421\u0435\u0440\u0432\u0438\u0441') + '</span>';
    }).join('') + '</div></div>';
  }).join('');
}

// ── Forms ──
function submitForm(e, msg) {
  e.preventDefault();
  var b = e.target.querySelector('button[type="submit"]');
  if (!b) return;
  b.textContent = msg + ' \u2713';
  b.style.background = 'var(--g)';
  setTimeout(function() {
    b.textContent = '\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c';
    b.style.background = '';
    e.target.reset();
  }, 3000);
}

function submitToTelegram(e) {
  e.preventDefault();
  var name = document.getElementById('tgName')?.value || '';
  var phone = document.getElementById('tgPhone')?.value || '';
  var subject = document.getElementById('tgSubject')?.value || '';
  var msg = document.getElementById('tgMsg')?.value || '';
  var text = '%F0%9F%93%8B+%D0%9D%D0%9E%D0%92%D0%9E%D0%95+%D0%A1%D0%9E%D0%9E%D0%91%D0%A9%D0%95%D0%9D%D0%98%D0%95%0A%0A' + encodeURIComponent('\u0418\u043c\u044f: ' + name + '%0A\u0422\u0435\u043b\u0435\u0444\u043e\u043d: ' + phone + '%0A\u0422\u0435\u043c\u0430: ' + subject + '%0A%0A' + msg);
  var b = document.getElementById('tgBtn');
  if (b) {
    b.textContent = '\u2713 \u041e\u0422\u041f\u0420\u0410\u0412\u041b\u0415\u041d\u043e';
    b.style.background = 'var(--g)';
    setTimeout(function() {
      b.textContent = '\u041e\u0422\u041f\u0420\u0410\u0412\u0418\u0422\u044c \u0412 TELEGRAM';
      b.style.background = '';
    }, 3000);
  }
  window.open('https://t.me/skynetparamotor?text=' + text, '_blank');
}

// ── AI Services ──
function openAI(type) {
  document.querySelectorAll('.ai-panel').forEach(function(p) { p.style.display = 'none'; });
  var panel = document.getElementById('ai-' + type);
  if (panel) {
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function closeAI() {
  document.querySelectorAll('.ai-panel').forEach(function(p) { p.style.display = 'none'; });
}

function runDiag() {
  var symptom = document.getElementById('aiDiagSymptom')?.value;
  var custom = document.getElementById('aiDiagText')?.value?.trim();
  var result = document.getElementById('aiDiagResult');
  if (!result) return;
  var data = null;
  if (symptom && AI_DIAG[symptom]) data = AI_DIAG[symptom];
  if (!data && custom) {
    result.style.display = 'block';
    result.innerHTML = '<h4>\u0410\u041d\u0410\u041b\u0418\u0417 \u0417\u0410\u041f\u0420\u041e\u0421\u0410</h4><p>\u0412\u044b \u043e\u043f\u0438\u0441\u0430\u043b\u0438: "' + custom + '"</p><p>\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u043c \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u043a\u043e\u043d\u043a\u0440\u0435\u0442\u043d\u044b\u0439 \u0441\u0438\u043c\u043f\u0442\u043e\u043c \u0438\u0437 \u0441\u043f\u0438\u0441\u043a\u0430 \u0432\u044b\u0448\u0435.</p><p>\u0418\u043b\u0438 \u043e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u043a <a href="#" onclick="switchPage(\'library\');return false;" style="color:var(--accent)">\u0418\u041d\u0421\u0422\u0420\u0423\u041a\u0426\u0418\u0418</a>.</p>';
    return;
  }
  if (!data) {
    alert('\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0438\u043c\u043f\u0442\u043e\u043c \u0438\u043b\u0438 \u043e\u043f\u0438\u0448\u0438\u0442\u0435 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0443');
    return;
  }
  var html = '<h4>' + data.title + '</h4><div class="ai-steps">';
  data.steps.forEach(function(step, i) {
    html += '<div class="ai-step"><span class="ai-step-num">' + (i + 1) + '</span><span>' + step + '</span></div>';
  });
  html += '</div>';
  if (data.parts.length) {
    html += '<div class="ai-parts-list"><h4>\u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u041f\u043e\u0442\u0440\u0435\u0431\u0443\u044e\u0442\u0441\u044f:</h4><ul>';
    data.parts.forEach(function(p) { html += '<li>' + p + '</li>'; });
    html += '</ul></div>';
  }
  html += '<div class="ai-critical">\u26a0\ufe0f ' + data.critical + '</div>';
  html += '<div class="ai-actions"><button class="btn btn-o" onclick="switchPage(\'parts\')">\u0417\u0410\u041f\u0427\u0410\u0421\u0422\u0418</button><button class="btn btn-o" onclick="switchPage(\'service\')">\u0421\u0415\u0420\u0412\u0418\u0421</button><a href="https://t.me/ivan_rudek" target="_blank" rel="noopener" class="btn btn-g" style="text-decoration:none;display:inline-block">@ivan_rudek</a></div>';
  result.style.display = 'block';
  result.innerHTML = html;
}

function runParts() {
  var model = document.getElementById('aiPartsModel')?.value;
  var query = document.getElementById('aiPartsText')?.value?.trim().toLowerCase();
  var result = document.getElementById('aiPartsResult');
  if (!result) return;
  if (!query) { alert('\u041e\u043f\u0438\u0448\u0438\u0442\u0435 \u0447\u0442\u043e \u0432\u0430\u043c \u043d\u0443\u0436\u043d\u043e'); return; }
  var found = [];
  for (var keyword in AI_PARTS_DB_SEARCH) {
    if (query.includes(keyword)) found = found.concat(AI_PARTS_DB_SEARCH[keyword]);
  }
  found = [...new Set(found)];
  if (!found.length) {
    result.style.display = 'block';
    result.innerHTML = '<h4>\u041d\u0418\u0427\u0415\u0413\u043e \u041d\u0415 \u041d\u0410\u0419\u0414\u0415\u041d\u043e</h4><p>\u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0434\u0440\u0443\u0433\u0438\u0435 \u0444\u043e\u0440\u043c\u0443\u043b\u0438\u0440\u043e\u0432\u043a\u0438.</p><button class="btn btn-o" onclick="switchPage(\'parts\')">\u041e\u0422\u041a\u0420\u042b\u0422\u044c \u041a\u0410\u0422\u0410\u041b\u041e\u0413</button><a href="https://t.me/ivan_rudek" target="_blank" rel="noopener" class="btn btn-g" style="text-decoration:none;display:inline-block;margin-top:.5rem">@ivan_rudek</a>';
    return;
  }
  var html = '<h4>\u041d\u0410\u0419\u0414\u0415\u041d\u043d\u044b\u0435 \u0417\u0410\u041f\u0427\u0410\u0421\u0422\u0418:</h4><div class="ai-parts-results">';
  found.forEach(function(part) { html += '<div class="ai-part-item"><span>' + part + '</span></div>'; });
  html += '</div>';
  if (model && model !== 'all') html += '<p class="ai-note">\u0414\u043b\u044f \u043c\u043e\u0434\u0435\u043b\u0438: ' + model.toUpperCase() + '</p>';
  html += '<div class="ai-actions"><button class="btn btn-o" onclick="switchPage(\'parts\')">\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432 \u043a\u0430\u0442\u0430\u043b\u043e\u0433\u0435</button><a href="https://t.me/ivan_rudek" target="_blank" rel="noopener" class="btn btn-g" style="text-decoration:none;display:inline-block">\u0417\u0430\u043a\u0430\u0437\u0430\u0442\u044c \u0447\u0435\u0440\u0435\u0437 \u0441\u043f\u0435\u0446\u0438\u0430\u043b\u0438\u0441\u0442\u0430</a></div>';
  result.style.display = 'block';
  result.innerHTML = html;
}

function runMaint() {
  var model = document.getElementById('aiMaintModel')?.value;
  var hours = parseInt(document.getElementById('aiMaintHours')?.value || 0);
  var result = document.getElementById('aiMaintResult');
  if (!result) return;
  if (!model) { alert('\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043c\u043e\u0434\u0435\u043b\u044c'); return; }
  if (!hours || hours < 0) { alert('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043c\u043e\u0442\u043e\u0447\u0430\u0441\u044b'); return; }
  var html = '<h4>\u0413\u0420\u0410\u0424\u0418\u041a \u041e\u0411\u0421\u041b\u0443\u0436\u0438\u0432\u0430\u043d\u0438\u044f</h4><p class="ai-note">\u043c\u043e\u0434\u0435\u043b\u044c: ' + model.toUpperCase() + ' \u00b7 \u043d\u0430\u043b\u0451\u0442: ' + hours + ' \u043c/\u0447</p>';
  AI_MAINT_DATA.intervals.forEach(function(interval) {
    var isDue = hours >= interval.hours;
    var isNext = !isDue && hours < interval.hours;
    html += '<div class="maint-interval ' + (isDue ? 'maint-due' : '') + ' ' + (isNext ? 'maint-next' : '') + '"><div class="maint-header"><h4>' + interval.title + '</h4>';
    if (isDue) html += '<span class="maint-badge due">\u0412\u042b\u041f\u043e\u043b\u043d\u0438\u0442\u044c</span>';
    else if (isNext) html += '<span class="maint-badge next">\u0421\u041b\u0415\u0414\u0443\u044e\u0449\u0415\u0415</span>';
    else html += '<span class="maint-badge future">\u0411\u0423\u0414\u0423\u0429\u0415\u0415</span>';
    html += '</div><ul>';
    interval.items.forEach(function(item) { html += '<li>' + item + '</li>'; });
    html += '</ul><div class="maint-cost">\u041e\u0446\u0435\u043d\u043e\u0447\u043d\u0430\u044f \u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c: ' + interval.estimated + '</div></div>';
  });
  html += '<div class="ai-actions"><button class="btn btn-o" onclick="switchPage(\'library\')">\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u044b\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043a\u0446\u0438\u0438</button><a href="https://t.me/ivan_rudek" target="_blank" rel="noopener" class="btn btn-g" style="text-decoration:none;display:inline-block">\u0417\u0430\u0434\u0430\u0442\u044c \u0432\u043e\u043f\u0440\u043e\u0441 \u0441\u043f\u0435\u0446\u0438\u0430\u043b\u0438\u0441\u0442\u0443</a></div>';
  result.style.display = 'block';
  result.innerHTML = html;
}

function runRemind() {
  var serial = document.getElementById('aiRemSerial')?.value?.trim();
  var hours = parseInt(document.getElementById('aiRemHours')?.value || 0);
  var model = document.getElementById('aiRemModel')?.value;
  var telegram = document.getElementById('aiRemTelegram')?.value?.trim();
  var result = document.getElementById('aiRemindResult');
  if (!result) return;
  if (!serial) { alert('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0435\u0440\u0438\u0439\u043d\u044b\u0439 \u043d\u043e\u043c\u0435\u0440'); return; }
  if (!hours) { alert('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043a\u0443\u0449\u0438\u0439 \u043d\u0430\u043b\u0451\u0442'); return; }
  if (!model) { alert('\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043c\u043e\u0434\u0435\u043b\u044c'); return; }
  if (!telegram) { alert('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0412\u0430\u0448 Telegram'); return; }
  var intervals = [25, 50, 100, 150, 200, 300];
  var next = null;
  for (var idx = 0; idx < intervals.length; idx++) {
    if (hours < intervals[idx]) { next = intervals[idx]; break; }
  }
  if (!next) {
    result.style.display = 'block';
    result.innerHTML = '<h4>\u041a\u0410\u041f\u0420\u0415\u041c\u041e\u041d\u0422 \u0420\u0415\u041a\u041e\u041c\u0415\u041d\u0414\u043e\u0432\u0430\u043d</h4><p>\u041d\u0430\u043b\u0451\u0442 ' + hours + ' \u043c/\u0447 \u2014 \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u0442\u0441\u044f \u043a\u0430\u043f\u0440\u0435\u043c\u043e\u043d\u0442.</p><a href="https://t.me/ivan_rudek" target="_blank" rel="noopener" class="btn btn-g" style="text-decoration:none;display:inline-block">\u0421\u0432\u044f\u0437\u0430\u0442\u044c\u0441\u044f \u0441\u043e \u0441\u043f\u0435\u0446\u0438\u0430\u043b\u0438\u0441\u0442\u043e\u043c</a>';
    return;
  }
  var rem = next - hours;
  var html = '<h4>\u041d\u0410\u041f\u041e\u041c\u0418\u041d\u0410\u041d\u0418\u0415 \u041d\u0410\u0421\u0422\u0420\u041e\u0415\u041d\u043e</h4><div class="remind-summary"><p><strong>\u0414\u0432\u0438\u0433\u0430\u0442\u0435\u043b\u044c:</strong> ' + serial + '</p><p><strong>\u041c\u043e\u0434\u0435\u043b\u044c:</strong> ' + model.toUpperCase() + '</p><p><strong>\u0422\u0435\u043a\u0443\u0449\u0438\u0439 \u043d\u0430\u043b\u0451\u0442:</strong> ' + hours + ' \u043c/\u0447</p><p><strong>\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0435\u0435 \u0422\u041e:</strong> ' + next + ' \u043c/\u0447</p><p><strong>\u0414\u043e \u0422\u041e:</strong> ~' + rem + ' \u043c/\u0447</p><p><strong>\u0422\u0435\u043b\u0435\u0433\u0440\u0430\u043c:</strong> ' + telegram + '</p></div>';
  html += '<div class="remind-note"><p>\u041d\u0430\u043f\u043e\u043c\u0438\u043d\u0430\u043d\u0438\u0435 \u0431\u0443\u0434\u0435\u0442 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e \u0432 @skynetparamotor \u043f\u0440\u0438 \u043f\u0440\u0438\u0431\u043b\u0438\u0436\u0435\u043d\u0438\u0438 \u043a ' + next + ' \u043c\u043e\u0442\u043e\u0447\u0430\u0441\u043e\u0432.</p></div>';
  html += '<div class="ai-actions"><button class="btn btn-g" onclick="switchPage(\'service\')">\u0417\u0430\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f \u043d\u0430 \u0422\u041e</button></div>';
  result.style.display = 'block';
  result.innerHTML = html;
}

// ── Scroll progress ──
window.addEventListener('scroll', function() {
  var bar = document.getElementById('scrollProgress');
  if (!bar) return;
  var h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
}, { passive: true });

// ── Init ──
function init() {
  renderEngSel();
  renderCatFil();
  renderParts();
  initBuild();
  renderDealers();
  calcTO();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
// deploy
// v2
