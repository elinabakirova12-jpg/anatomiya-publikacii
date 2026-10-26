// Переключение вкладок сайта-презентации
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active-content'));

    if (tabName === 'theory') {
        document.getElementById('btn-theory').classList.add('active');
        document.getElementById('tab-content-theory').classList.add('active-content');
    } else {
        document.getElementById('btn-test').classList.add('active');
        document.getElementById('tab-content-test').classList.add('active-content');
        renderQuiz();
    }
}
// Первая часть вопросов интерактивного тестирования
const quizData = [
    {
        question: "1. Какой элемент ОБЯЗАТЕЛЬНО должен завершать раздел «Введение»?",
        options: ["Описание чистоты реактивов", "Четко сформулированная цель работы", "Список выводов по пунктам"],
        correct: 1
    },
    {
        question: "2. В каком стиле и залоге рекомендуется писать Экспериментальную часть?",
        options: ["В будущем времени («Мы взвесим...»)", "В прошедшем времени, страдательном залоге («Было взвешено...»)", "В настоящем времени («Я добавляю...» )"],
        correct: 1
    },
    {
        question: "3. Какое ключевое требование предъявляется к графикам в разделе «Результаты»?",
        options: ["Оси должны иметь подписи с указанием единиц измерения физических величин", "Они должны быть черно-белыми", "На них должна быть подпись автора"],
        correct: 0
    },
    {
        question: "4. Где в тексте статьи указываются номера спонсирующих грантов (например, РНФ)?",
        options: ["Во Введении", "В Благодарностях (Acknowledgements)", "В Заключении"],
        correct: 1
    },
    {
        question: "5. Какова структура идеального раздела «Заключение»?",
        options: ["Сплошной длинный текст-рассуждение", "Сухие, пронумерованные факты-выводы, отвечающие на цель работы", "Повторение аннотации статьи"],
        correct: 1
    },
    {
        question: "6. Какой разделитель по ГОСТ Р 7.0.100-2018 используется между названием статьи и названием журнала?",
        options: ["Знак двоеточия (:)", "Точка и тире (. –)", "Двойной слэш (//)"],
        correct: 2
    },
    {
        question: "7. У статьи 2 автора. Как их имена распределяются в библиографической ссылке?",
        options: ["Оба автора пишутся только в начале", "Первый автор пишется в начале, а все соавторы — за одиночным слэшем (/) после названия", "Авторы вообще не пишутся"],
        correct: 1
    },
    {
        question: "8. У статьи большой коллектив (например, 10 авторов). С чего начнется описание по ГОСТ?",
        options: ["С фамилий всех 10 авторов", "С названия статьи (авторы в начале не пишутся вообще)", "С названия журнала"],
        correct: 1
    },
    {
        question: "9. Какой разделительный знак ставится перед указанием страниц (например, С. 45–50) в журнальной статье?",
        options: ["Запятая", "Двойной слэш (//)", "Точка и тире (. –)"],
        correct: 2
    },
    {
        question: "10. Какой знак разделяет город издания и название издательства в описании книги?",
        options: ["Точка с запятой (;)", "Двоеточие (:)", "Одиночный слэш (/)"],
        correct: 1
    },
    {
        question: "11. Выберите верное оформление материалов конференции по ГОСТ:",
        options: [
            "Сунаргулов А.Б. Реология расплавов // Химия полимеров. Уфа, 2026. С. 45.",
            "Сунаргулов, А. Б. Реология расплавов ПЛА / А. Б. Сунаргулов // Химия полимеров : материалы Всерос. конф., Уфа, 12–14 мая 2026 г. – Уфа : Изд-во УУНиТ, 2026. – С. 45–46.",
            "Сунаргулов А.Б. Реология расплавов ПЛА: монография. УУНиТ, 2026. 45 с."
        ],
        correct: 1
    },
    {
        question: "12. Что означает сокращение «МПК» в структуре описания патентов?",
        options: ["Международная патентная классификация", "Министерство полимерных комплексов", "Материалы патентного контроля"],
        correct: 0
    },
    {
        question: "13. Каким знаком разделяются авторы изобретения и предприятие-заявитель в патенте?",
        options: ["Двойным слэшем (//)", "Точкой с запятой (;)", "Двоеточием (:)"],
        correct: 1
    },
    {
        question: "14. Фрагмент «ИК-спектры пленок регистрировали на спектрометре IFS-66v» относится к разделу:",
        options: ["Введение", "Заключение", "Методология / Экспериментальная часть"],
        correct: 2
    },
    {
        question: "15. Фрагмент «Введение 5 мас.% хитозана снижает эффективную вязкость расплава ПЛА на 15%» относится к разделу:",
        options: ["Результаты и обсуждение", "Благодарности", "Введение"],
        correct: 0
    },
    {
        question: "16. Как обозначаются страницы в самом конце описания КНИГИ (монографии)?",
        options: ["Заглавная «С.» перед цифрами (С. 280)", "Строчная «с.» после цифр (280 с.)", "Слово «стр.»"],
        correct: 1
    },
    {
        question: "17. Если у книги всего 1 автор, пишется ли он после одиночного слэша (/) в блоке ответственности?",
        options: ["Нет, не пишется", "Да, его имя дублируется в именительном падеже", "Пишется только название издательства"],
        correct: 1
    },
    {
        question: "18. Зачем в конце научной работы приводится Список литературы?",
        options: ["Для красоты", "Для демонстрации связей с мировым научным опытом и подтверждения достоверности гипотез", "Чтобы занять побольше страниц"],
        correct: 1
    },
    {
        question: "19. Что пишется в квадратных скобках за слэшем при оформлении статьи с большим коллективом авторов (более 4)?",
        options: ["[и другие авторы]", "[и др.]", "[etc.]"],
        correct: 1
    },
    {
        question: "20. Что пишется сразу после названия конференции в описании тезисов докладов по ГОСТ?",
        options: ["Год издания", "Через двоеточие указывается жанр издания (: материалы Всерос. конф...)", "Имя председателя оргкомитета"],
        correct: 1
    },
    {
        question: "21. Фрагмент «Целью настоящей работы является исследование влияния хитозана...» — это типичный маркер окончания:",
        options: ["Заключения", "Введения", "Методов"],
        correct: 1
    },
    {
        question: "22. Как обозначаются страницы в описании ЖУРНАЛЬНОЙ статьи?",
        options: ["Строчная «с.» после цифр (45-50 с.)", "Заглавная «С.» перед цифрами (С. 45–50)", "Слово «стр.»"],
        correct: 1
    },
    {
        question: "23. Какая организация указана в подвале сайта и примерах как место издания/кафедра?",
        options: ["МГУ", "УУНиТ", "ИХФ РАН"],
        correct: 1
    },
    {
        question: "24. Допускается ли использование личных местоимений («Я получил», «Мы смешали») в экспериментальной химии?",
        options: ["Нет, принято использовать безличные и страдательные формы", "Да, это приветствуется", "Только с разрешения заведующего кафедрой"],
        correct: 0
    },
    {
        question: "25. В каком разделе описывается благодарность ЦКП за съемку спектров без прямого финансирования?",
        options: ["Во Введении", "В Благодарностях (Acknowledgements)", "В Результатах"],
        correct: 1
    }
];

let userAnswers = {};
let isChecked = false;
// Генерация вопросов на странице тестов
function renderQuiz() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';
    document.getElementById('result-box').classList.add('hidden');
    document.getElementById('submit-quiz-btn').disabled = false;
    userAnswers = {};
    isChecked = false;

    quizData.forEach((q, qIndex) => {
        const qCard = document.createElement('div');
        qCard.className = 'question-card';
        
        const qText = document.createElement('div');
        qText.className = 'question-text';
        qText.innerText = q.question;
        qCard.appendChild(qText);
        
        const optionsList = document.createElement('div');
        optionsList.className = 'options-list';
        
        q.options.forEach((opt, optIndex) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.id = `q-${qIndex}-opt-${optIndex}`;
            btn.innerText = opt;
            btn.onclick = () => handleSelect(qIndex, optIndex);
            optionsList.appendChild(btn);
        });
        
        qCard.appendChild(optionsList);
        container.appendChild(qCard);
    });
}

// Выбор ответа студентом (синяя подсветка без вывода правильного)
function handleSelect(qIndex, optIndex) {
    if (isChecked) return;
    
    for (let i = 0; i < quizData[qIndex].options.length; i++) {
        document.getElementById(`q-${qIndex}-opt-${i}`).classList.remove('selected');
    }
    
    userAnswers[qIndex] = optIndex;
    document.getElementById(`q-${qIndex}-opt-${optIndex}`).classList.add('selected');
}

// Проверка всех ответов итоговой кнопкой (зеленый/красный)
function checkAnswers() {
    if (Object.keys(userAnswers).length < quizData.length) {
        alert("Пожалуйста, ответьте на все 25 вопросов перед проверкой!");
        return;
    }
    
    isChecked = true;
    document.getElementById('submit-quiz-btn').disabled = true;
    let score = 0;
    
    quizData.forEach((q, qIndex) => {
        const correctIdx = q.correct;
        const userIdx = userAnswers[qIndex];
        
        for (let i = 0; i < q.options.length; i++) {
            document.getElementById(`q-${qIndex}-opt-${i}`).classList.remove('selected');
        }
        
        document.getElementById(`q-${qIndex}-opt-${correctIdx}`).classList.add('correct');
        if (userIdx !== correctIdx) {
            document.getElementById(`q-${qIndex}-opt-${userIdx}`).classList.add('wrong');
        } else {
            score++;
        }
    });
    
    const resultBox = document.getElementById('result-box');
    const resultText = document.getElementById('result-text');
    
    resultBox.classList.remove('hidden');
    resultText.innerHTML = `Вы правильно ответили на <strong>${score}</strong> из <strong>${quizData.length}</strong> вопросов.`;
    resultBox.scrollIntoView({ behavior: 'smooth' });
}

function restartQuiz() {
    renderQuiz();
}
