const quotes = [
    {
      quote: "When something is important enough, you do it even if the odds are not in your favor.",
      author: "Elon Musk"
    },
    {
      quote: "If things are not failing, you are not innovating enough.",
      author: "Elon Musk"
    },
    {
      quote: "Any product that needs a manual to work is broken.",
      author: "Elon Musk"
    },
    {
      quote: "Your time is limited, so don’t waste it living someone else’s life.",
      author: "Steve Jobs"
    },
    {
      quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela"
    },
    {
      quote: "Be the change that you wish to see in the world.",
      author: "Mahatma Gandhi"
    },
    {
      quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
      author: "Mahatma Gandhi"
    },
    {
      quote: "Failure is simply the opportunity to begin again, this time more intelligently.",
      author: "Henry Ford"
    },
    {
      quote: "Simplicity is the ultimate sophistication.",
      author: "Leonardo da Vinci"
    },
    {
      quote: "It is not death that a man should fear, but he should fear never beginning to live.",
      author: "Marcus Aurelius"
    }
  ];
  



const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
