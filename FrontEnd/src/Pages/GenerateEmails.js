import React, { useState, useRef, useEffect } from "react";
const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("HTML code copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
};
const GenerateEmails = () => {
  const textareaRef = useRef(null); // Ref for the HTML code textarea

  const [templateType, setTemplateType] = useState("HTML");
  const [totalWords, setTotalWords] = useState("");
  const [yourName, setYourName] = useState("");
  const [emailReceiverName, setEmailReceiverName] = useState("");
  const [setHeaderFooter, setSetHeaderFooter] = useState("Yes");
  const [webSiteUrl, setWebSiteUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [emailSign, setEmailSign] = useState("Yes");
  const [callToAction, setCallToAction] = useState("Yes");
  const [callToActionText, setCallToActionText] = useState("");
  const [callToActionUrl, setCallToActionUrl] = useState("");
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);
  const [htmlCode, setHtmlCode] = useState(`
    <style>
        body { font-family: Arial, sans-serif; }
        p { color: #333; }
    </style>
    <p>Edit me directly or in the editor!</p>
`);
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const document = iframe.contentDocument;
      if (document) {
        document.open();
        document.write(htmlCode);
        document.close();
      }
    }
  }, [htmlCode]);

  const handleCodeChange = (event) => {
    setHtmlCode(event.target.value);
  };

  const handleIframeInput = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const document = iframe.contentDocument;
      if (document) {
        setHtmlCode(document.documentElement.outerHTML);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHtmlCode("");
    const prompt =
      `Template Type: ${templateType}\nTotal Words: ${totalWords}\nYour name: ${yourName}\nEmail Recipient Name: ${emailReceiverName}\nInclude Header and Footer: ${setHeaderFooter}\nWebsite URL:${webSiteUrl}\nLogo Image URL: ${logoUrl}\nInclude Email Signature: ${emailSign}\nInclude Call to Action Button: ${callToAction}\nCall to Action Button Text: ${callToActionText}\nCall to Action Button URL: ${callToActionUrl}\nEmail Content: ${article}`.trim();
    console.log(prompt);
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer sk-mWMtD6iKgkn9It0aNNpYTmTUI6QMvRBlbTS5Wwt1IPT3BlbkFJSe8Tmbn4rbF62ew60QL0CSBq2DNGAogCB2TKvF-iAA`, // Replace with your actual API key securely
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-instruct",
          prompt: prompt,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setHtmlCode(data.choices[0].text);
      console.log(data.choices[0]);
    } catch (error) {
      console.error("Error:", error.message);
      setHtmlCode(`Sorry, something went wrong: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="contact-2_form-section container"
      style={{
        padding: "100px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "0px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="templateType">Template Type</label>
        <select
          id="templateType"
          name="Email Template Type"
          className="form-control bg-light-2 mb-5"
          onChange={(e) => setTemplateType(e.target.value)}
        >
          <option value="HTML">HTML</option>
          <option value="TEXT">TEXT</option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="totalWords">Total Words</label>
        <input
          id="totalWords"
          className="form-control bg-light-2 mb-5"
          placeholder="Total Words"
          onChange={(e) => setTotalWords(e.target.value)}
          value={totalWords}
          required
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="yourName">Your Name</label>
        <input
          id="yourName"
          className="form-control bg-light-2 mb-5"
          placeholder="Your Name"
          onChange={(e) => setYourName(e.target.value)}
          value={yourName}
          required
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="emailReceiverName">Email Recipient Name</label>
        <input
          id="emailReceiverName"
          className="form-control bg-light-2 mb-5"
          placeholder="Email Recipient Name"
          onChange={(e) => setEmailReceiverName(e.target.value)}
          value={emailReceiverName}
          required
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="useHeaderFooter">Want to use header and footer?</label>
        <select
          id="useHeaderFooter"
          name="Use Header and Footer"
          className="form-control bg-light-2 mb-5"
          onChange={(e) => setSetHeaderFooter(e.target.value)}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="webSiteUrl">Your Website URL</label>
        <input
          id="webSiteUrl"
          className="form-control bg-light-2 mb-5"
          placeholder="Your Website URL"
          onChange={(e) => setWebSiteUrl(e.target.value)}
          value={webSiteUrl}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="logoUrl">Logo Image URL</label>
        <input
          id="logoUrl"
          className="form-control bg-light-2 mb-5"
          placeholder="Logo Image URL"
          onChange={(e) => setLogoUrl(e.target.value)}
          value={logoUrl}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="useEmailSignature">Want to use email signature?</label>
        <select
          id="useEmailSignature"
          name="Use Email Signature"
          className="form-control bg-light-2 mb-5"
          onChange={(e) => setEmailSign(e.target.value)}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="useCallToAction">
          Want to use call to action button?
        </label>
        <select
          id="useCallToAction"
          name="Use Call To Action Button"
          className="form-control bg-light-2 mb-5"
          onChange={(e) => setCallToAction(e.target.value)}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="callToActionText">Call To Action Button Name</label>
        <input
          id="callToActionText"
          className="form-control bg-light-2 mb-5"
          placeholder="Call To Action Button Name"
          onChange={(e) => setCallToActionText(e.target.value)}
          value={callToActionText}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="callToActionUrl">Call To Action Button URL</label>
        <input
          id="callToActionUrl"
          className="form-control bg-light-2 mb-5"
          placeholder="Call To Action Button URL"
          value={callToActionUrl}
          onChange={(e) => setCallToActionUrl(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="article">Email Content</label>
        <textarea
          id="article"
          className="form-control bg-light-2 mb-5"
          placeholder="Hints: Explain about your service, product to generate email template"
          onChange={(e) => setArticle(e.target.value)}
          value={article}
          rows="5"
          cols="1000"
        />
      </div>

      <div
        className="form-box-style__form-input-button d-flex justify-content-center"
        style={{ gridColumn: "span 3" }}
      >
        {loading ? (
          <button className="btn btn-white btn-buy bg-primary text-white">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hold
            on
            ...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-white btn-buy bg-primary text-white"
          >
            Generate Email Template
          </button>
        )}
      </div>
      <br></br>
      <div
        style={{
          marginBottom: "20px",
          gridColumn: "span 3",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "#f8f9fa",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
            HTML Code Editor
          </h2>
          <button
            onClick={() => copyToClipboard(textareaRef.current.value)} // Copy content on button click
            className="bg-primary text-white"
            style={{ marginTop: "0" }}
          >
            Copy to Clipboard
          </button>
        </div>
        <textarea
          ref={textareaRef} // Attach ref to textarea
          value={htmlCode}
          onChange={handleCodeChange}
          rows="10"
          style={{
            width: "100%",
            padding: "10px",
            fontFamily: "monospace",
            borderRadius: "4px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div
        style={{
          gridColumn: "span 3",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      >
        <h2
          style={{
            marginBottom: "15px",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Live Preview (Editable)
        </h2>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "400px",
            overflow: "hidden",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <iframe
            ref={iframeRef}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "8px",
            }}
            title="Live Preview"
            onLoad={() => {
              const iframe = iframeRef.current;
              if (iframe) {
                const document = iframe.contentDocument;
                if (document) {
                  document.body.contentEditable = true;
                  document.body.addEventListener("input", handleIframeInput);
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GenerateEmails;
