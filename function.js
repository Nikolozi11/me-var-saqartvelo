const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // ღილაკზე დაჭერისას მენიუ გამოჩნდება ან დაიმალება
});

//ჩამოშლა

document.querySelectorAll('.submenu-parent').forEach((item) => {
    item.addEventListener('mouseenter', () => {
        // ჯერ ყველა submenu დავმალოთ
        document.querySelectorAll('.submenu').forEach((sub) => {
            sub.style.display = 'none';
        });

        // მხოლოდ ამ hovered item-ის submenu ვაჩვენოთ
        const submenu = item.querySelector('.submenu');
        if (submenu) submenu.style.display = 'block';
    });

    item.addEventListener('mouseleave', () => {
        const submenu = item.querySelector('.submenu');
        if (submenu) submenu.style.display = 'none';
    });
});





