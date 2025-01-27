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
      quote: "Failure is simply the opportunity to begin again more intelligently.",
      author: "Henry Ford"
    },
    {
      quote: "Simplicity is the ultimate sophistication.",
      author: "Leonardo da Vinci"
    }
  ];

const quote = document.querySelector("#quote-text");
const author = document.querySelector("#quote-author");
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
quote.innerText = `"${todaysQuote.quote}"`
author.innerText = `- ${todaysQuote.author}`
