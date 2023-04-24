export default class Accordion {
    constructor(element, options) {
        let defaultOptions = {
            // Укажите смягчение при открытии и закрытии панели аккордеона
            timingFunction: "ease-out",
            // Укажите время анимации при открытии и закрытии аккордеонной панели
            duration: ".4s",
            // Вы открываете более одного?
            multiSelectable: false,
        };
        const mergedOptions = Object.assign({}, defaultOptions, options);

        // Проверьте необходимые варианты
        if (!options.tabs) {
            throw TypeError("tabs undefined");
        }
        if (!options.panels) {
            throw TypeError("panels undefined");
        }

        // Возьмите вкладку и панель
        const tabs = Array.from(element.querySelectorAll(options.tabs));
        const panels = Array.from(element.querySelectorAll(options.panels));

        // Установите обработчик событий
        const subscriptions = [
            ...tabs.map((tab) =>
                attachEvent(tab, "click", this.handleTabClick.bind(this))
            ),
            attachEvent(window, "resize", this.handleResize.bind(this)),
        ];

        this.element = element;
        this.tabs = tabs;
        this.panels = panels;
        this.options = mergedOptions;
        this.subscriptions = subscriptions;
        this.expanded = new Set();

        this.prepareAttributes();
    }

    destroy() {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    handleTabClick(event) {
        const tab = event.currentTarget;
        const tabIndex = this.tabs.indexOf(tab);
        this.toggleItem(tabIndex, !this.expanded.has(tabIndex));
        event.preventDefault();
    }

    handleResize() {
        this.bindWindowResizeHandler();
    }

    prepareAttributes() {
        const randomId = "accordion-" + Math.random().toString(36).slice(2);

        // Атрибуты вкладки компонента аккордеона
        this.tabs.forEach((tab, index) => {
            tab.setAttribute("id", `${randomId}-tab-${index}`);
            tab.setAttribute("aria-expanded", "false");
            tab.setAttribute("aria-controls", `${randomId}-panel-${index}`);
        });

        // Атрибуты, приведенные на панели аккордеонного компонента
        this.panels.forEach((panel, index) => {
            panel.setAttribute("id", `${randomId}-panel-${index}`);
            panel.setAttribute("aria-hidden", "true");
            panel.style.boxSizing = "border-box";
            panel.style.overflow = "hidden";
            panel.style.maxHeight = "0px";
        });
    }

    toggleItem(itemIndex, expand, { noTransition = false } = {}) {
        const isExpanded = this.expanded.has(itemIndex);

        if (expand === isExpanded) {
            return;
        }

        const updateItemAttribute = (itemIndex, expand) => {
            const targetTab = this.tabs[itemIndex];
            const targetPanel = this.panels[itemIndex];
            targetTab.setAttribute("aria-expanded", String(expand));
            targetPanel.setAttribute("aria-hidden", String(!expand));
            targetPanel.style.maxHeight = expand
                ? targetPanel.children[0].clientHeight + "px"
                : "0px";
            targetPanel.style.visibility = expand ? "visible" : "hidden";
            targetPanel.style.transition = noTransition
                ? ""
                : `max-height ${this.options.timingFunction} ${this.options.duration}, visibility ${this.options.duration}`;
            this.expanded[expand ? "add" : "delete"](itemIndex);
        };

        // Когда несколько выборов не установлены, закройте все открытые панели
        if (!this.options.multiSelectable && !isExpanded) {
            this.expanded.forEach((index) => updateItemAttribute(index, false));
        }

        updateItemAttribute(itemIndex, expand);
    }

    bindWindowResizeHandler() {
        // Восстановление высоты открытой панели
        this.expanded.forEach((index) => {
            const panel = this.panels[index];
            const resizedHeight = panel.children[0].clientHeight;
            panel.style.maxHeight = resizedHeight + "px";
        });
    }
}

function attachEvent(element, event, handler, options) {
    element.addEventListener(event, handler, options);
    return {
        unsubscribe() {
            element.removeEventListener(event, handler);
        },
    };
}
