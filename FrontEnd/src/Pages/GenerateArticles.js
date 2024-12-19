import React, { useState } from "react";

const GenerateArticles = () => {
  const [prompt1, setPrompt1] = useState("");
  const [prompt2, setPrompt2] = useState("");
  const [prompt3, setPrompt3] = useState("");
  const [prompt4, setPrompt4] = useState("");
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setArticle("");
  
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer sd`, // Replace with your actual API key securely
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-instruct",
          prompt: `Your Name: ${prompt1}\nReceiver Name: ${prompt2}\nTotal Words: ${prompt3}\nHints: ${prompt4}`,
          max_tokens: 500,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      setArticle(data.choices[0].text);
    } catch (error) {
      console.error("Error:", error.message);
      setArticle(`Sorry, something went wrong: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="contact-2_form-section padding-bottom-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="contact_main-comment-box-wrapper border-none">
                <div className="contact_main-comment-box__inner">
                  <div className="form-box-style__form-wrapper">
                    <form className="form-box-style" onSubmit={handleSubmit}>
                      <div className="row form--row-custom form-box-style__form-inner">
                        <div className="col-12">
                          <div className="form-box-style__form-input">
                            <div className="d-flex justify-content-center mb-5">
                              <h3 className="form-box-style-title">
                                Generate Email Template
                              </h3>
                            </div>
                            <input
                              className="form-control bg-light-2 mb-5"
                              placeholder="Your Name"
                              value={prompt1}
                              onChange={(e) => setPrompt1(e.target.value)}
                              required
                            />
                            <input
                              className="form-control bg-light-2 mb-5"
                              placeholder="Receiver Name"
                              value={prompt2}
                              onChange={(e) => setPrompt2(e.target.value)}
                              required
                            />
                            <input
                              className="form-control bg-light-2 mb-5"
                              placeholder="Total Words - How many words do you want to write the message inside?"
                              value={prompt3}
                              onChange={(e) => setPrompt3(e.target.value)}
                              required
                            />
                            <textarea
                              className="form-control bg-light-2 mb-5"
                              placeholder="Hints"
                              value={prompt4}
                              onChange={(e) => setPrompt4(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-box-style__form-input-button d-flex justify-content-center">
                        <button type="submit" className="btn-masco rounded-pill" disabled={loading}>
                          {loading ? "Generating..." : "Submit"}
                        </button>
                      </div>
                    </form>
                    {article && (
                      <div className="mt-5">
                        <h4>Generated Email Message:</h4>
                        <p>{article}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateArticles;