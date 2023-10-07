import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

import { FaTwitterSquare } from "react-icons/fa";
import { FaTumblrSquare } from "react-icons/fa";

import { IconContext } from "react-icons";
import { useEffect, useState } from "react";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const newQuoteHandler = async () => {
    const response = await fetch(
      "https://quote-garden.onrender.com/api/v3/quotes/random"
    );
    const result = await response.json();
    setQuote(result.data[0].quoteText);
    setAuthor(result.data[0].quoteAuthor);
  };

  useEffect(() => {
    newQuoteHandler();
  }, []);

  let footerContent = (
    <div className="flex justify-between items-center">
      <div className="flex space-x-3">
        <IconContext.Provider value={{ color: "rgb(251 146 60)" }}>
          <a
            id="tweet-quote"
            href="https://twitter.com/intent/tweet"
            target="_blank"
          >
            <FaTwitterSquare size={30} />
          </a>
          <a id="tumblr-quote" href="#" target="_blank">
            <FaTumblrSquare size={30} />
          </a>
        </IconContext.Provider>
      </div>
      <button
        id="new-quote"
        className="rounded-md text-white bg-orange-400 px-3 py-2"
        onClick={newQuoteHandler}
      >
        New quote
      </button>
    </div>
  );
  let quoteContent = (
    <>
      <p className="text-orange-400  text-3xl">
        <FontAwesomeIcon icon={faQuoteLeft} />
        <span id="text">{quote}</span>
      </p>
      <p className="text-orange-400 text-right" id="author">
        - {author}
      </p>
    </>
  );

  let shimmerContent = (
    <>
      <div className="bg-orange-100 h-[7rem] w-[31rem] rounded-xl"></div>
      <div className="bg-orange-100 h-[2rem] w-[9rem] rounded-xl ml-[22rem]"></div>
    </>
  );
  return (
    <div className="flex items-center justify-center bg-orange-400 min-h-screen">
      <div
        className="quote bg-white border md:w-[35rem] rounded-md p-8 space-y-3"
        id="quote-box"
      >
        {quote && quoteContent}
        {!quote && shimmerContent}
        {footerContent}
      </div>
    </div>
  );
}

export default App;
