const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');
const header = document.querySelector('.site-header');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.hidden = expanded;
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    });
  });
}

if (header) {
  let lastY = window.scrollY;

  const updateHeader = () => {
    const currentY = window.scrollY;
    const scrollingDown = currentY > lastY;

    header.classList.toggle('is-scrolled', currentY > 24);
    header.classList.toggle('is-hidden', currentY > 120 && scrollingDown);

    lastY = currentY;
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

const revealItems = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (revealItems.length) {
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }
}

const form = document.querySelector('.contact-form');

if (form) {
  const note = form.querySelector('.form-note');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.querySelector('#name');
    const phone = form.querySelector('#phone');
    const message = form.querySelector('#message');

    const values = [name, phone, message];
    const isValid = values.every((field) => field && field.value.trim().length >= 2);

    if (!note) return;

    if (!isValid) {
      note.textContent = 'Пожалуйста, заполните все поля (минимум 2 символа).';
      note.classList.add('error');
      note.classList.remove('success');
      return;
    }

    note.textContent = 'Спасибо! Сообщение отправлено (демо-режим).';
    note.classList.add('success');
    note.classList.remove('error');
    form.reset();
  });
}

const butterflySlides = [
  {
    name: 'Парусник Румяцева',
    group: 'tropical',
    image: 'assets/butterflies/row-4.jpg',
    area: 'Филиппинские острова, Ява, Борнео, Сулавеси, Суматра, Индонезия',
    fact: 'Бабочка названа в честь графа Румянцева. У самцов и самок отличается рисунок крыльев, а красные акценты помогают отпугивать хищников.',
    qa: 'Сколько живут бабочки? Те виды, что представлены у нас, от нескольких часов до месяца.'
  },
  {
    name: 'Парусник Полит',
    group: 'tropical',
    image: 'assets/butterflies/row-5.png',
    area: 'Кавказ, Турция, Иран, Средняя Азия, Индия, Китай',
    fact: 'Самки этого вида бывают трех раскрасок. Из-за такого диморфизма кажется, что самец спаривается с разными видами.',
    qa: 'Почему крылья бывают рваными? Со временем края изнашиваются, это нормально и безболезненно для бабочки.'
  },
  {
    name: 'Парусник Демолей / Менелай / Лимонный парусник',
    group: 'tropical',
    image: 'assets/butterflies/row-6.png',
    area: 'Тибет, острова Тихого океана, Таиланд, Австралия, Сингапур, Индонезия, Иран',
    fact: 'Известен как вредитель цитрусовых плантаций, поэтому получил прозвище «лимонный парусник».',
    qa: 'Самцы и самки отличаются? Да, у части видов самки крупнее и рисунок может заметно отличаться.'
  },
  {
    name: 'Парусник Лови / Леви / Лёви',
    group: 'tropical',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Papilio%20Lowi%20(male).jpg',
    focal: '52% 42%',
    area: 'Борнео, Индонезия, Филиппины',
    fact: 'Яркий половой диморфизм: самка светлая, самец темный. За окрас бабочку называют «черным принцем».',
    qa: 'Почему бабочки не боятся людей? Они спокойны и адаптированы к условиям выставки.'
  },
  {
    name: 'Павлиноглазка Атлас / Аттакус Атлас',
    group: 'classic',
    image: 'assets/butterflies/row-8.jpg',
    area: 'Юго-Восточная Азия, юг Китая, Индонезия, Таиланд',
    fact: 'Одна из самых больших бабочек в мире. Взрослая особь практически не питается и живет меньше недели.',
    qa: 'Влияет ли цвет куколки на окрас бабочки? Нет, это в основном вопрос маскировки.'
  },
  {
    name: 'Данаида Хризипп',
    group: 'classic',
    image: 'assets/butterflies/row-9.jpg',
    area: 'Африка, южная и центральная Азия, Австралия',
    fact: 'Также известна как «африканский монарх». Вид для человека безвреден, но защищен от части хищников.',
    qa: 'Растут ли бабочки? Нет, размер фиксируется после выхода из куколки.'
  },
  {
    name: 'Золотая птицекрылка / Тройдес Радамантус',
    group: 'classic',
    image: 'assets/butterflies/row-10.jpg',
    area: 'Филиппины',
    fact: 'В культуре ассоциируется с финансовым благополучием. Во время брачного танца самец активно работает задними лапками.',
    qa: 'Как бабочки слышат? С помощью мембран у оснований крыльев, чувствующих вибрации.'
  },
  {
    name: 'Графиум Агамемнон',
    group: 'classic',
    image: 'assets/butterflies/row-11.png',
    area: 'Юго-восточная Азия, Индия, Шри-Ланка, Австралия',
    fact: 'В народе называется «зеленый треугольник». Очень активная бабочка с характерными светящимися пятнами.',
    qa: 'Как бабочки видят? На близком расстоянии и хорошо улавливают движение.'
  },
  {
    name: 'Осенний лист / долешалия / листокрылка',
    group: 'classic',
    image: 'assets/butterflies/row-12.jpg',
    area: 'Азия, Австралия',
    fact: 'Отлично мимикрирует под сухой лист: на крыльях заметны «жилки» и даже эффект капель.',
    qa: 'Как бабочки чувствуют вкус? У многих видов рецепторы расположены на лапках.'
  },
  {
    name: 'Цетозия Библис',
    group: 'classic',
    image: 'assets/butterflies/row-13.png',
    area: 'Индия, Пакистан, Бирма, Малайзия, Индонезия, Филиппины',
    fact: 'Яркий рисунок этой бабочки повлиял на декоративные мотивы в культуре Южной Азии.',
    qa: 'Бабочки любят только сладкое? Нет, также жидкости с минералами.'
  },
  {
    name: 'Гебомоя / Апельсиновая белянка',
    group: 'classic',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Giant%20orange%20tip%20(Hebomoia%20glaucippe)%20male%20underside%20Phuket.jpg',
    focal: '50% 44%',
    area: 'Япония, Китай, Малайзия, Пакистан, Индия',
    fact: 'Яркие оранжевые кончики крыльев дали виду неофициальное имя «апельсиновая бабочка».',
    qa: ''
  },
  {
    name: 'Лунная болина',
    group: 'classic',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Great%20Eggfly%20(Hypolimnas%20bolina).jpg',
    focal: '52% 40%',
    area: 'Индия, Пакистан, Азия, Австралия, острова Океании',
    fact: 'Узор крыльев самцов напоминает лунное сияние, а чешуйки дают красивый перелив под углом света.',
    qa: ''
  },
  {
    name: 'Парусник Коцебу',
    group: 'tropical',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pachliopta%20kotzebuea%20(The%20Pink%20Rose)%20captive%20-%20Flickr%20-%20S.%20Rae.jpg',
    focal: '50% 42%',
    area: 'Филиппины',
    fact: 'Этого парусника часто называют «бабочкой для влюбленных» из-за красных пятен в форме сердечек.',
    qa: ''
  },
  {
    name: 'Идея Левконоя / Белая Идея / Рисовая бумага',
    group: 'classic',
    image: 'assets/butterflies/row-17.png',
    area: 'Китай',
    fact: 'В Китае считается символом любви и верности, за полупрозрачные крылья получила имя «рисовая бумага».',
    qa: ''
  },
  {
    name: 'Парусник Палинур',
    group: 'tropical',
    image: 'assets/butterflies/row-18.png',
    area: 'Филиппины, Азия',
    fact: 'На крыльях выраженный перелив: цвет меняется от салатового до синего в зависимости от угла света.',
    qa: ''
  },
  {
    name: 'Тигровая Сильвия / Бабочка Тигр',
    group: 'classic',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Blue%20tiger%20(Tirumala%20limniace).jpg',
    focal: '50% 44%',
    area: 'Юго-Восточная Азия',
    fact: 'Вид мимикрирует под осу, благодаря этому его реже атакуют хищники.',
    qa: ''
  },
  {
    name: 'Морфо Пелеида / Голубая Морфо',
    group: 'classic',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Blue%20Morpho%20(6133928076).jpg',
    focal: '50% 45%',
    area: 'Центральная и Южная Америка',
    fact: '«Жемчужина Амазонки»: знаменитый голубой перелив зависит от света и структуры чешуек.',
    qa: ''
  }
];

const pupaExtByRow = {
  4: 'png',
  5: 'jpg',
  6: 'jpg',
  7: 'jpg',
  8: 'png',
  9: 'png',
  10: 'png',
  11: 'png',
  12: 'png',
  13: 'jpg',
  14: 'jpg',
  15: 'jpg',
  16: 'jpg',
  17: 'png',
  18: 'png',
  19: 'jpg',
  20: 'jpg'
};

const carousel = document.querySelector('[data-carousel]');

if (carousel) {
  const tabs = Array.from(carousel.parentElement.querySelectorAll('.switch-btn'));
  const tracks = Array.from(carousel.querySelectorAll('.species-track'));
  const viewport = carousel.querySelector('.species-viewport');
  const prevBtn = carousel.querySelector('[data-dir="prev"]');
  const nextBtn = carousel.querySelector('[data-dir="next"]');

  const byGroup = {
    tropical: butterflySlides.filter((item) => item.group === 'tropical'),
    classic: butterflySlides.filter((item) => item.group === 'classic')
  };

  const resolvePupaImage = (imagePath) => {
    const match = imagePath.match(/row-(\d+)\.[a-z]+$/i);
    if (!match) return '';
    const row = Number(match[1]);
    const ext = pupaExtByRow[row];
    if (!ext) return '';
    return `assets/butterflies/pupa-row-${row}.${ext}`;
  };

  const makeSlide = (item) => {
    const pupaImage = resolvePupaImage(item.image);
    const pupaButton = pupaImage
      ? `<button class="species-pupa-btn" type="button" data-pupa-image="${pupaImage}" data-pupa-title="${item.name}">Фото куколки</button>`
      : '';

    return `
      <article class="species-slide">
        <div class="species-copy">
          <h3 class="species-title">${item.name}</h3>
          <p>${item.fact}</p>
          <p class="species-meta"><strong>Ареал:</strong> ${item.area}</p>
          ${pupaButton}
        </div>
        <figure class="species-media">
          <img
            src="${item.image}"
            alt="${item.name}"
            loading="lazy"
            style="${item.focal ? `object-position:${item.focal};` : ''}"
          />
        </figure>
      </article>
    `;
  };

  tracks.forEach((track) => {
    const group = track.dataset.group;
    const slides = byGroup[group] || [];
    track.innerHTML = slides.map((item) => makeSlide(item)).join('');
  });

  const faqDynamic = document.querySelector('#faq-dynamic');
  if (faqDynamic) {
    const faqItems = butterflySlides.filter((item) => item.qa && item.qa.trim().length > 0);
    const splitQa = (rawQa) => {
      const cleaned = String(rawQa || '').trim();
      const qMarkIndex = cleaned.indexOf('?');
      if (qMarkIndex !== -1) {
        const question = cleaned.slice(0, qMarkIndex + 1).trim();
        const tail = cleaned.slice(qMarkIndex + 1).replace(/^\s*[—-]\s*/, '').trim();
        return { question, answer: tail };
      }

      const separator = cleaned.match(/\s[—-]\s/);
      if (separator && separator.index !== undefined) {
        const i = separator.index;
        const question = cleaned.slice(0, i).trim();
        const answer = cleaned.slice(i + separator[0].length).trim();
        return { question, answer };
      }
      return { question: cleaned, answer: '' };
    };

    faqDynamic.innerHTML = faqItems.map((item) => {
      const qa = splitQa(item.qa);
      return `
      <details class="faq-item">
        <summary>${qa.question}</summary>
        <p>${qa.answer}</p>
      </details>
    `;
    }).join('');
  }

  const indexes = {};
  tracks.forEach((track) => {
    indexes[track.dataset.group] = 0;
  });

  let activeGroup = tabs.find((tab) => tab.classList.contains('is-active'))?.dataset.group
    || tracks[0]?.dataset.group;

  const getActiveTrack = () => tracks.find((track) => track.dataset.group === activeGroup);

  const updateCarousel = () => {
    tabs.forEach((tab) => {
      const selected = tab.dataset.group === activeGroup;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });

    tracks.forEach((track) => {
      const selected = track.dataset.group === activeGroup;
      track.hidden = !selected;
      if (!selected) return;

      const slides = track.querySelectorAll('.species-slide');
      if (!slides.length) return;

      const maxIndex = slides.length - 1;
      indexes[activeGroup] = Math.min(indexes[activeGroup], maxIndex);
      track.style.transform = `translateX(-${indexes[activeGroup] * 100}%)`;
    });
  };

  const moveSlide = (direction) => {
    const track = getActiveTrack();
    if (!track) return;

    const slides = track.querySelectorAll('.species-slide');
    const length = slides.length;
    if (!length) return;

    indexes[activeGroup] = (indexes[activeGroup] + direction + length) % length;
    updateCarousel();
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.dataset.group === activeGroup) return;
      viewport?.classList.add('is-switching');
      activeGroup = tab.dataset.group;
      updateCarousel();

      window.setTimeout(() => {
        viewport?.classList.remove('is-switching');
      }, 280);
    });
  });

  prevBtn?.addEventListener('click', () => moveSlide(-1));
  nextBtn?.addEventListener('click', () => moveSlide(1));

  viewport?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') moveSlide(-1);
    if (event.key === 'ArrowRight') moveSlide(1);
  });

  let touchStartX = null;

  viewport?.addEventListener(
    'touchstart',
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  viewport?.addEventListener(
    'touchend',
    (event) => {
      if (touchStartX === null) return;
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(deltaX) < 45) return;
      moveSlide(deltaX < 0 ? 1 : -1);
    },
    { passive: true }
  );

  updateCarousel();
}

const pupaModal = document.querySelector('#pupa-modal');
const pupaImage = document.querySelector('#pupa-image');
const pupaTitle = document.querySelector('#pupa-title');
const pupaCloseButtons = document.querySelectorAll('[data-close-pupa]');

const openPupaModal = (imageSrc, title) => {
  if (!pupaModal || !pupaImage) return;
  pupaImage.src = imageSrc;
  pupaImage.alt = `Куколка: ${title}`;
  if (pupaTitle) pupaTitle.textContent = `Фото куколки — ${title}`;
  pupaModal.hidden = false;
  document.body.classList.add('no-scroll');
};

const closePupaModal = () => {
  if (!pupaModal || !pupaImage) return;
  pupaModal.hidden = true;
  pupaImage.src = '';
  pupaImage.alt = 'Фото куколки бабочки';
  document.body.classList.remove('no-scroll');
};

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-pupa-image]');
  if (!trigger) return;
  event.preventDefault();
  openPupaModal(trigger.dataset.pupaImage, trigger.dataset.pupaTitle || 'Бабочка');
});

pupaCloseButtons.forEach((button) => {
  button.addEventListener('click', () => closePupaModal());
});

const bookingModal = document.querySelector('#booking-modal');
const bookingForm = document.querySelector('#booking-form');
const bookingNote = document.querySelector('#booking-note');
const bookingOpenButtons = document.querySelectorAll('[data-open-booking]');
const bookingCloseButtons = document.querySelectorAll('[data-close-booking]');

// Fill these values to enable direct Telegram delivery.
const TELEGRAM_BOT_TOKEN = '8079801362:AAH2IGI9OD03iI9OHOWiGbPH3G-feNRSu9s';
const TELEGRAM_CHAT_ID = '859840618';

const openBookingModal = () => {
  if (!bookingModal) return;
  bookingModal.hidden = false;
  document.body.classList.add('no-scroll');

  const dateInput = bookingForm?.querySelector('#booking-date');
  if (dateInput && !dateInput.value) {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    dateInput.value = `${now.getFullYear()}-${month}-${day}`;
  }
};

const closeBookingModal = () => {
  if (!bookingModal) return;
  bookingModal.hidden = true;
  document.body.classList.remove('no-scroll');
};

bookingOpenButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    openBookingModal();
  });
});

bookingCloseButtons.forEach((button) => {
  button.addEventListener('click', () => closeBookingModal());
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && pupaModal && !pupaModal.hidden) {
    closePupaModal();
    return;
  }

  if (event.key === 'Escape' && bookingModal && !bookingModal.hidden) {
    closeBookingModal();
  }
});

if (bookingForm) {
  bookingForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!bookingNote) return;

    const formData = new FormData(bookingForm);
    const name = String(formData.get('name') || '').trim();
    const date = String(formData.get('date') || '').trim();
    const time = String(formData.get('time') || '').trim();
    const visitors = String(formData.get('visitors') || '').trim();
    const phone = String(formData.get('phone') || '').trim();

    const validPhone = /^[+\d\s()\-]{10,}$/.test(phone);
    if (!name || !date || !time || !visitors || !validPhone) {
      bookingNote.textContent = 'Проверьте поля: имя, дата, время, кол-во и корректный телефон.';
      bookingNote.classList.add('error');
      bookingNote.classList.remove('success');
      return;
    }

    const message = [
      'Новая бронь с сайта выставки бабочек:',
      `Имя: ${name}`,
      `Дата: ${date}`,
      `Время: ${time}`,
      `Посетителей: ${visitors}`,
      `Телефон: ${phone}`
    ].join('\n');

    try {
      if (
        TELEGRAM_BOT_TOKEN !== 'PASTE_TELEGRAM_BOT_TOKEN'
        && TELEGRAM_CHAT_ID !== 'PASTE_TELEGRAM_CHAT_ID'
      ) {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message
          })
        });

        if (!response.ok) {
          throw new Error('Telegram API error');
        }
      } else {
        const shareUrl = `https://t.me/share/url?url=${encodeURIComponent('https://example.com')}&text=${encodeURIComponent(message)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      }

      bookingNote.textContent = 'Заявка отправлена в Telegram.';
      bookingNote.classList.remove('error');
      bookingNote.classList.add('success');
      bookingForm.reset();
      window.setTimeout(() => closeBookingModal(), 900);
    } catch (error) {
      bookingNote.textContent = 'Не удалось отправить. Проверьте Telegram токен/chat_id.';
      bookingNote.classList.add('error');
      bookingNote.classList.remove('success');
    }
  });
}
