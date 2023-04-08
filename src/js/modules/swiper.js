import Swiper, {
    Navigation,
    Pagination,
    Scrollbar,
    Keyboard,
    HashNavigation,
    Zoom,
    Mousewheel,
    Parallax,
    FreeMode,
    EffectCards,
    EffectCoverflow,
    EffectCreative,
    EffectCube,
    EffectFade,
    EffectFlip,
    Autoplay,
    Virtual,
} from "swiper";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/autoplay";
import "swiper/css/controller";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-creative";
import "swiper/css/effect-cube";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import "swiper/css/free-mode";
import "swiper/css/grid";
import "swiper/css/hash-navigation";
import "swiper/css/history";
import "swiper/css/keyboard";
import "swiper/css/manipulation";
import "swiper/css/mousewheel";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/css/virtual";
import "swiper/css/zoom";

// import Swiper from "swiper/bundle";
// import "swiper/css/bundle";

const swiper = new Swiper(".swiper", {
    direction: "horizontal",

	effect: "slide",
    //бесконечный слайдер
    loop: false,

    speed: 300,

	// Navigation arrows
	navigation: {
		enabled: true,
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	
    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,

        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },

        //   type: "fraction",

        //   renderFraction: function (currentClass, totalClass) {
        // 	return (
        // 	  'Фото <span class="' +
        // 	  currentClass +
        // 	  '"></span>' +
        // 	  " из " +
        // 	  '<span class="' +
        // 	  totalClass +
        // 	  '"></span>'
        // 	);
        //   },

        // type: 'progressbar',
    },

    // And if we need scrollbar
    scrollbar: {
        el: ".swiper-scrollbar",
        //возможность перетаскивать скролл
        draggable: true,
        enabled: false,
    },
    //перетаскивание на пк
    simulateTouch: true,
    //чувствительность свайпа
    touchRatio: 1,
    //угол срабатывания свайпа/перетаскивания
    touchAngle: 45,
    //курсор перетаскивания
    grabCursor: true,
    //переключение на слад при клике на него
    slideToClickedSlide: false,
    //навигация по хэшу
    hashNavigation: {
        //отслеживать состояние
        watchState: true,
    },

    keyboard: {
        //включить/выключить
        enabled: true,
        //включить/выключить только в пределах вьюпорта
        onlyInViewport: true,
        //управление клавишами pageup/down
        pageUpDown: true,
    },
	
     //mousewheel
    mousewheel: {
        // enabled: false,
        sensitivity: 1,
        releaseOnEdges: true,
        //объект с классом на котором будет срабатывать скролл
        // eventsTarget: '.image-slider'
    },
    on: {
        slideChange: function() {
            setTimeout(function () {
                swiper.params.mousewheel.releaseOnEdges = false;
            }, 500);
        },
        reachEnd: function() {
            setTimeout(function () {
                swiper.params.mousewheel.releaseOnEdges = true;
            }, 750);
        }
    },

    //автовысота
    autoHeight: false,

    //количество слайдов для показа
    slidesPerView: 3, //можно дробные(2.5)

    //отключение слайдера, если количество слайдов меньше, чем указано в slidesPerView
    watchOverflow: true,

    //отступы между слайдами
    spaceBetween: 1,

    //количество пролистываемых слайдов
    slidesPerGroup: 1,

    //активный слайд по центру
    centeredSlides: true, //true - если нужно делать активными первый и последний слайд

    //стартовый слайд
    initialSlide: 0, //с нуля

    /* //мультирядность
    //мультирядность
    //   slidesPerColumn: 1,
    //   slidesPerColumnFill: 'row',
*/

    //кол-во дублирующих слайдов
    loopedSlides: 0,

    //свободный режим
    freeMode: false,

    //автопрокрутка
    //   autoplay: {

    // 	delay: 1000,

    // 	stopOnLastSlide: true,

    // 	//отключить после ручного переключения
    // 	disableOnInteraction: false
    //   },

    creativeEffect: {
        limitProgress: 2,
        shadowPerProgress: false,
        progressMultiplier: 1,
        perspective: true,
        prev: {
            translate: [-35, 0, -10],
            rotate: [0, 0, -3],
            opacity: 1,
            scale: 0.8,
        },
        next: {
            translate: [250, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1,
        },
    },

    //fade
    fadeEffect: {
        crossFade: true,
    },

    //flip
    flipEffect: {
        //тень
        slideShadows: false,

        //показ только активного слайда
        limitRotation: true,
    },

    //cube
    cubeEffect: {
        //тень
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    },

    //coverflow
    coverflowEffect: {
        //угол
        rotate: 20,

        //наложение
        stretch: 50,

        //тень
        slideShadows: false,
    },

    cardsEffect: {
        slideShadows: false,
        rotate: true,
        perSlideRotate: 1,
        perSlideOffset: 8,
    },

    // breakpoints: {
    //     320: {
    //         slidesPerView: 1,
    //     },
    //     480: {
    //         slidesPerView: 2,
    //     },
    //     992: {
    //         slidesPerView: 3,
    //     },
    // },

    //отключить предзагрузку картинок
    // lazy: true,
    // //подзагрузка картинок
    // lazy: {
    //     //подгружать на старте переключения слайда
    //     loadOnTransitionStart: true,
    //     //подгрузить предыдущую и сделующую картинки
    //     loadPrevNext: false,
    // },
    // //слежка за видимыми слайдами
    // watchSlidesProgress: true,
    // //добавление класса видимым слайдам
    // watchSlidesVisibility: true,

    //zoom
    // zoom: true,
    // zoom: {
    //     enabled: true,
    //     maxRatio: 5,
    //     minRatio: 1,
    // },

    // Optional parameters
    modules: [
        Navigation,
        Pagination,
        Scrollbar,
        Keyboard,
        HashNavigation,
        Zoom,
        Mousewheel,
        Parallax,
        FreeMode,
        EffectCards,
        EffectCoverflow,
        EffectCreative,
        EffectCube,
        EffectFade,
        EffectFlip,
        Autoplay,
        Virtual,
    ],
});
