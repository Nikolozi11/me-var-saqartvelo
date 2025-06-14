
const matchStartTime = new Date("2025-06-11T00:00:00+04:00").getTime(); // GMT+4

// დანარჩენი კოდი იგივე რჩება
const countdown = setInterval(function() {
    const now = new Date().getTime(); // მიმდინარე დრო
    const distance = matchStartTime - now; // დარჩენილი დრო

    // დროის კომპონენტები
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // ტაიმერის განახლება
    document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s `;

    // თუ ტაიმერი დასრულდა
    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("timer").innerHTML = "მატჩი დაიწყო!";
    }
}, 1000); // 1 წამში ერთხელ განახლდება
 

//nav board

 const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // ღილაკზე დაჭერისას მენიუ გამოჩნდება ან დაიმალება
});





//navჩამოშლა

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