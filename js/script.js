/* script */
"use strict";

(() => {
    let lastWidthItems = 0;
    let burgerSize = 0;

    const init = (menu, menuList, itemsMenu, burgerMenu) => {
        itemsMenu.forEach(elem => {
            elem.classList.add('amenu__item');
        });

        burgerMenu.classList.add('amenu__burger');

        const [burgerBtn, burgerList] = createBurgerBlock(burgerMenu);

        updateMenu(menu, menuList, burgerMenu, burgerBtn, burgerList);

        window.addEventListener('resize', () => {
            updateMenu(menu, menuList, burgerMenu, burgerBtn, burgerList);
        });
    };


    const createBurgerBlock = (burgerMenu) => {
        const burgerBtn = document.createElement('button');
        burgerMenu.append(burgerBtn);
        burgerBtn.classList.add('amenu__burger-btn');

        burgerBtn.addEventListener('click', () => {
            burgerMenu.classList.toggle('amenu__burger-open');
        })

        const burgerList = document.createElement('ul');
        burgerMenu.append(burgerList);
        burgerList.classList.add('amenu__burger-list');

        return [burgerBtn, burgerList];
    };

    const updateMenu = (menu, menuList, burgerMenu, burgerBtn, burgerList) => {
        const menuItems = menuList.querySelectorAll('.amenu__item');
        const burgerItems = burgerList.querySelectorAll('.amenu__item');
        const widthMenu = menu.offsetWidth;

        burgerSize = burgerMenu.offsetWidth || burgerSize
        const widthAllItems = [...menuItems].reduce((width, elem) => {
            return elem.offsetWidth + width + parseFloat(getComputedStyle(elem).marginRight)
        }, 0) + burgerSize;


        if (widthMenu < widthAllItems) {
            const lastItems = menuItems[menuItems.length - 1];
            if (lastItems) {
                lastWidthItems = lastItems.offsetWidth;

                burgerList.prepend(lastItems)
                return updateMenu(menu, menuList, burgerMenu, burgerBtn, burgerList)
            }


        }

        if (widthMenu > widthAllItems + lastWidthItems * 2 && burgerItems.length) {
            const firstElem = burgerItems[0];
            menuList.append(firstElem);
            return updateMenu(menu, menuList, burgerMenu, burgerBtn, burgerList)
        }

        //add
        if (burgerItems.length) {
            burgerMenu.style.display = '';
        } else {
            burgerMenu.style.display = 'none';
        }
        // end add

        checkBurgerItems(burgerItems, burgerBtn);


    };

    const checkBurgerItems = (burgerItems, burgerBtn) => {
        if (burgerItems.length) {
            burgerBtn.classList.add('amenu__burger-btn_active')
        } else {
            burgerBtn.classList.remove('amenu__burger-btn_active')
        }
    }

    window.amenu = (selectorMenu, selectorMenuList, selectorItemsMenu, selectorBurgerMenu) => {

        const menu = document.querySelector(selectorMenu),
            menuList = document.querySelector(selectorMenuList),
            itemsMenu = document.querySelectorAll(selectorItemsMenu),
            burgerMenu = document.querySelector(selectorBurgerMenu);


        init(menu, menuList, itemsMenu, burgerMenu)

    };

})();

document.addEventListener('DOMContentLoaded', () => {
    amenu('.menu', '.menu__list', '.menu__item', '.menu-mobile');
});

/* swiper */
const swiper = new Swiper('.main-content__slider', {
    slidesPerView: 'auto',
    centeredSlides: true,
    initialSlide: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 5000,
    },

    pagination: {
        el: '.swiper-pagination',
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});

const body = document.querySelector('body');
const widthScrollBar = window.innerWidth - body.offsetWidth + 'px';
const menuMobileAside = document.querySelector('.mobile-aside');
const asideMenu = document.querySelector('.main-content__aside');
const btnMessage = document.querySelectorAll('.main-content__slider-btn');
const modalWindow = document.querySelector('.modal');
const alertWindow = document.querySelector('.alert-window');
const productList = document.querySelector('.product-list');
const productListItems = document.querySelectorAll('.product-list__link');
const productSubLists = document.querySelectorAll('.product-sublist');
const productSubListItems = document.querySelectorAll('.product-sublist__link');
const paginationBtns = document.querySelectorAll('.pagination__btn');
const paginationBtnLeft = document.querySelector('.pagination__btn--left');
const paginationBtnRight = document.querySelector('.pagination__btn--right');
const paginationLinks = document.querySelectorAll('.pagination__link');
const certificateBlocks = document.querySelectorAll('.certificate__block img');

const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.insertAdjacentElement('beforeend', overlay);

if (productList) {
    productListItems.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();

            renderActiveElement(productListItems, item);

            const list = item.parentNode.querySelector('.product-sublist');

            if (item.parentNode.contains(list)) {
                productSubLists.forEach(item => {
                    renderActiveElement(productSubLists, list);
                })
            } else {
                closeOverlay();
                checkWidthBody();
                menuMobileAside.classList.remove('active');
                checkMenuMobileAside();
                asideMenu.classList.remove('show');

                renderActiveElement(productSubListItems);
                renderActiveElement(productSubLists);
            }
        });
    });

    productSubListItems.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();

            renderActiveElement(productSubListItems, item);
            closeOverlay();
            checkWidthBody();
            menuMobileAside.classList.remove('active');
            checkMenuMobileAside();
            asideMenu.classList.remove('show');
        });
    });
}

if (menuMobileAside) {
    setTimeout(() => {
        checkMenuMobileAside();
        menuMobileAside.style.visibility = 'visible';
    }, 500);

    menuMobileAside.addEventListener('click', () => {
        toggleAsideMenu();
        checkWidthBody();
        checkMenuMobileAside();
    });

    overlay.addEventListener('click', () => {
        toggleAsideMenu();
        checkWidthBody();
        checkMenuMobileAside();
    });
}

if (btnMessage) {
    btnMessage.forEach(item => {
        item.addEventListener('click', () => {
            showOverlay();
            showFormWindow();
            checkWidthBody();
        });
    });
}

if (modalWindow) {
    modalWindow.addEventListener('click', event => {
        const target = event.target;

        if (target.matches('.modal')) {
            closeOverlay();
            closeFormWindow();
            checkWidthBody();
        }
    });
}

if (paginationLinks) {
    paginationLinks.forEach(function (link, i) {

        if (link.classList.contains('active')) {
            checkNumberPages(link);
        }

        link.addEventListener('click', event => {
            event.preventDefault();
            renderActiveElement(paginationLinks, link);
            checkNumberPages(link);
            checkPaginationBtn(i);
        });
    });

    paginationBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();

            for (let i = 0; i < paginationLinks.length; i++) {
                const element = paginationLinks[i];
                if (element.classList.contains('active')) {
                    let currentLink = i;

                    if (btn === paginationBtnRight) {
                        let nextItem = currentLink + 1;
                        renderActiveElement(paginationLinks, paginationLinks[nextItem]);
                        checkPaginationBtn(nextItem);
                        checkNumberPages(paginationLinks[nextItem]);
                    }

                    if (btn === paginationBtnLeft) {
                        let prevItem = currentLink - 1;
                        renderActiveElement(paginationLinks, paginationLinks[prevItem]);
                        checkPaginationBtn(prevItem);
                        checkNumberPages(paginationLinks[prevItem]);
                    }

                    break;
                }
            }
        });
    });
}

if (certificateBlocks) {
    certificateBlocks.forEach(img => {
        img.addEventListener('click', () => {
            showOverlay();
            checkWidthBody();
            img.classList.toggle('active');

            if (!img.classList.contains('active')) {
                closeOverlay();
                checkWidthBody();
            }
        });
    });

    overlay.addEventListener('click', () => {
        closeOverlay();
        checkWidthBody();
        certificateBlocks.forEach(img => {
            img.classList.remove('active');
        });
    });
}

function toggleAsideMenu() {
    body.classList.toggle('no-scroll');
    overlay.classList.toggle('active');
    menuMobileAside.classList.toggle('active');
    asideMenu.classList.toggle('show');
}

function checkMenuMobileAside() {
    const header = document.querySelectorAll('header')[0];
    const menu = document.querySelectorAll('nav')[0];
    const topMenuMobile = header.offsetHeight + menu.offsetHeight + 'px';

    menuMobileAside.style.top = topMenuMobile;

    if (menuMobileAside.classList.contains('active')) {
        menuMobileAside.style.top = '15px';
    } else {
        menuMobileAside.style.top = topMenuMobile;
    }
}

function checkWidthBody() {
    if (body.classList.contains('no-scroll')) {
        body.style.paddingRight = widthScrollBar;
    } else {
        body.style.paddingRight = '0px';
    }
}

function renderActiveElement(arr, item) {
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        element.classList.remove('active');
    }

    if (item) {
        item.classList.add('active');
    }
}

function checkPaginationBtn(index) {
    if (index === 0) {
        paginationBtnLeft.classList.add('disabled');
    } else {
        paginationBtnLeft.classList.remove('disabled');
    }

    if (index === paginationLinks.length - 1) {
        paginationBtnRight.classList.add('disabled');
    } else {
        paginationBtnRight.classList.remove('disabled');
    }
}

function checkNumberPages(item) {
    const startNumberGoodsList = document.querySelector('.number-current__start');
    const endNumberGoodsList = document.querySelector('.number-current__end');
    const allGoods = document.querySelector('.pagination__number-all');

    let numberPage = +item.textContent;
    startNumberGoodsList.textContent = (numberPage - 1) * 12 + 1;
    endNumberGoodsList.textContent = numberPage * 12;
    allGoods.textContent = 900;
}

function showOverlay() {
    body.classList.add('no-scroll');
    overlay.classList.add('active');
}

function closeOverlay() {
    body.classList.remove('no-scroll');
    overlay.classList.remove('active');
}

function showFormWindow() {
    modalWindow.classList.add('show');
}

function closeFormWindow() {
    modalWindow.classList.remove('show');
}
