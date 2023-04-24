const Accordion = (domNode) => {
    const buttons = domNode.querySelectorAll(".js-accordion-trigger");
    const panels = domNode.querySelectorAll(".js-accordion-panel");
    const panelsContent = domNode.querySelectorAll(".js-accordion-content");

    const toggleAccordion = (panelToActivate) => {
        const triggerToActivate = panelToActivate.querySelector(
            ".js-accordion-trigger"
        );
        const contentToActivate = panelToActivate.querySelector(
            ".js-accordion-content"
        );

        buttons.forEach((button) => {
            button.setAttribute("aria-expanded", "false");
        });

        panelsContent.forEach((content) => {
            content.setAttribute("aria-hidden", "true");
        });

        triggerToActivate?.setAttribute("aria-expanded", "true");
        contentToActivate?.setAttribute("aria-hidden", "false");

        if (!CSS.supports("selector(:has(*))")) {
            panels.forEach((panel) => {
                panel.classList.remove("is-open");
            });

            panelToActivate.classList.add("is-open");
        }
    };

    const onButtonClick = (event) => {
        const activePanel = event.target.closest(".js-accordion-panel");

        if (!activePanel) return;

        toggleAccordion(activePanel);
    };

    domNode.addEventListener("click", onButtonClick);
};

export default Accordion;

// init accordions
const accordions = document.querySelectorAll(".accordion__horizontal");
accordions.forEach(Accordion);
