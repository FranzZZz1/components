export const modalControl = function ({ modal, btnOpen, btnClose, duration = 300 }) {
    const modalButtons = document.querySelectorAll(btnOpen);
    const modalElem = document.querySelector(modal);

    modalElem.style.cssText = `
		display: flex;
		visibility: hidden;
		opacity: 0;
		transition: opacity ${duration}ms ease-out;
	`;

    const modalClose = function (event) {
        const target = event.target;

        if (
            target === modalElem ||
            (btnClose && target.closest(btnClose)) ||
            event.code === "Escape"
        ) {
            modalElem.style.opacity = 0;

            setTimeout(() => {
                modalElem.style.visibility = "hidden";
            }, duration);

            window.removeEventListener("keydown", modalClose);
        }
    };

    const modalOpen = function () {
        modalElem.style.visibility = "visible";
        modalElem.style.opacity = 1;

        window.addEventListener("keydown", modalClose);
    };

    modalButtons.forEach((button) => {
        button.addEventListener("click", modalOpen);
    });

    modalElem.addEventListener("click", modalClose);
};
