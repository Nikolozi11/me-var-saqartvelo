 // მატჩის დაწყების დრო (2024 წლის 11 ოქტომბერი, 22:45 საათი)
 const matchStartTime = new Date("2024-10-11T22:45:00+04:00").getTime(); // GMT+4

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
         document.getElementById("timer").innerHTML = "Match Started!";
     }
 }, 1000); // 1 წამში ერთხელ განახლდება