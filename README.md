# angular-skeleton
angular-skeleton


# Краткое руководство
1. Клонируйте проект себе локально

2. Необходимо установить npm

3. В корневой папке проекта в консоле вызвать $ npm install (все зависимости grunt указаны в package.json)

4. Собрать проект с минимизированной версией $ grunt app , cобрать проект с полной версией для дебага $ grunt app-debug

Что бы обновить версии библиотек:

1. Установить Bower $ npm install -g bower

2. В корне проекта вызвать в консоле $ bower i (все зависимости указаны в bower.json)

Новые библиотеки добавляются в bower.json и в build.config.js (libs полные и min_libs минимизированные соответственно).
После добавления вызвать опять $ bower i и $ grunt app
