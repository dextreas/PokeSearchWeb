
document.addEventListener('DOMContentLoaded',() => {
    const toggleButton = document.querySelector('.menu-img');
    const mobileNav = document.querySelector('.mobile-nav');

    let ismobileNavOpen = false;

    toggleButton.addEventListener('click', () => {
        ismobileNavOpen = !ismobileNavOpen;
        if (ismobileNavOpen)
        {
            mobileNav.style.display = 'flex';
        }
        else{
            mobileNav.style.display = 'none';
        }

    });

    mobileNav.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'a')
        {
            ismobileNavOpen = false;
            mobileNav.style.display = 'none';
        }
    });

});