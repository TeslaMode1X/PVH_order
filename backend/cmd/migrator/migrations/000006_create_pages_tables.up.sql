-- Создание таблицы страниц
CREATE TABLE IF NOT EXISTS pages (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- Создание таблицы секций страниц
CREATE TABLE IF NOT EXISTS page_sections (
    id VARCHAR(36) PRIMARY KEY,
    page_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    image VARCHAR(255),
    order_num INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    FOREIGN KEY (page_id) REFERENCES pages (id) ON DELETE CASCADE
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_page_sections_page_id ON page_sections (page_id);

-- Вставка начальных данных
INSERT INTO pages (id, title, description, created_at, updated_at)
VALUES 
    ('home', 'Главная страница', 'Настройка содержимого главной страницы', NOW(), NOW()),
    ('about', 'О компании', 'Информация о компании', NOW(), NOW()),
    ('contacts', 'Контакты', 'Контактная информация', NOW(), NOW());

-- Вставка секций для главной страницы
INSERT INTO page_sections (id, page_id, title, content, image, order_num, created_at, updated_at)
VALUES 
    (gen_random_uuid(), 'home', 'Главный баннер', 'Качественные окна и двери для вашего дома', 'images/hero-banner.jpg', 1, NOW(), NOW()),
    (gen_random_uuid(), 'home', 'О компании', 'ООО «МАСШТАБ-СТРОЙ СОЧИ» - надежный производитель и установщик окон и дверей в Сочи. Мы предлагаем широкий выбор продукции высокого качества по доступным ценам.', 'images/about.jpg', 2, NOW(), NOW()),
    (gen_random_uuid(), 'home', 'Услуги', 'Мы предлагаем полный спектр услуг от замера до установки окон и дверей. Наши специалисты имеют большой опыт работы и гарантируют качественное выполнение всех работ.', NULL, 3, NOW(), NOW()),
    (gen_random_uuid(), 'home', 'Преимущества', 'Качество, надежность, доступные цены, гарантия на все виды работ, профессиональный монтаж, индивидуальный подход к каждому клиенту.', NULL, 4, NOW(), NOW());

-- Вставка секций для страницы о компании
INSERT INTO page_sections (id, page_id, title, content, image, order_num, created_at, updated_at)
VALUES 
    (gen_random_uuid(), 'about', 'История компании', 'ООО «МАСШТАБ-СТРОЙ СОЧИ» была основана в 2015 году и с тех пор успешно развивается на рынке оконных конструкций.', 'images/company-history.jpg', 1, NOW(), NOW()),
    (gen_random_uuid(), 'about', 'Миссия', 'Наша миссия - обеспечивать клиентов качественными оконными конструкциями, которые создают комфорт и уют в доме.', NULL, 2, NOW(), NOW());

-- Вставка секций для страницы контактов
INSERT INTO page_sections (id, page_id, title, content, image, order_num, created_at, updated_at)
VALUES 
    (gen_random_uuid(), 'contacts', 'Основная информация', 'Телефон: +7 (988) 149-99-89\nEmail: mashtabss@mail.ru\nАдрес: г. Сочи, р-н Хостинский, ул. Дорога на Большой Ахун, 16, кв. 88', NULL, 1, NOW(), NOW()),
    (gen_random_uuid(), 'contacts', 'Карта', 'Код для вставки карты', NULL, 2, NOW(), NOW());
