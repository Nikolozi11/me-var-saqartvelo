 
 const matchStartTime = new Date("2024-11-16T20:00:00+04:00").getTime(); // GMT+4

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
         document.getElementById("timer").innerHTML = "მათჩი დაიწყო!";
     }
 }, 1000); // 1 წამში ერთხელ განახლდება
  
 
 //nav board

 const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // ღილაკზე დაჭერისას მენიუ გამოჩნდება ან დაიმალება
});







document.getElementById('commentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const comment = document.getElementById('comment').value;

    try {
        const response = await fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result.message);

        // კომენტარების სიაში განახლება
        document.getElementById('commentsList').innerHTML += `<p style="color: white;">${comment}</p>`;
        document.getElementById('comment').value = ''; // ხორციელდება კომენტარის ველის გასუფთავება
    } catch (error) {
        console.error('Error:', error);
    }
});