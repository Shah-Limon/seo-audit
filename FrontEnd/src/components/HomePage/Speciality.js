import React  from "react";

const Speciality = () => {
  

  return (
    <>
     
        
          <div className="container">
            <div className="row row--custom">
             
                <>
                  <div
                    className="offset-xl-1 col-lg-5 col-auto"
                  >
                    <div className="home-1_content-image-1 content-image--mobile-width">
                      <img
                        src='https://masco-tailwind.netlify.app/assets/img/th-1/content-img-1.jpg'
                        alt="alternative text"
                      />
                      <div className="home-1_content-image-1-shape">
                        <img
                          src="./image/home-1/content-image-1-shape.svg"
                          alt="alternative text"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-xl-6 col-lg-7 col-md-10 col-auto"
                  >
                    <div className="content">
                      <div className="content-text-block">
                        <h2 className="content-title heading-md text-black">
                        Why Leads Are Crucial for Freelancers and Digital Marketers
                        </h2>
                        <p>Leads are crucial for freelancers and digital marketers because they drive targeted opportunities, increase conversions, and fuel business growth.</p>
                        
                      </div>
                    </div>
                  </div>
                </>
               : 
                <>
                  <div
                    className="col-xl-5 col-lg-5 col-auto"
                  >
                    <div className="home-1_content-image-2 content-image--mobile-width">
                      <img
                        src='https://masco-tailwind.netlify.app/assets/img/th-1/content-img-1.jpg'
                        alt="alternative text"
                      />
                      <div className="home-1_content-image-2-shape">
                        <img
                          src="./image/home-1/content-image-2-shape.svg"
                          alt="alternative text"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="offset-xl-1 col-xl-6 col-lg-7 col-md-11"
                  >
                    <div className="content">
                      <div className="content-text-block">
                        <h2 className="content-title heading-md text-black">
                        Why Leads Are Crucial for Freelancers and Digital Marketers
                        </h2>
                        <p>Leads are crucial for freelancers and digital marketers because they drive targeted opportunities, increase conversions, and fuel business growth.</p>
                       
                      </div>
                    </div>
                  </div>
                </>
              
            </div>
          </div>
       
    </>
  );
};

export default Speciality;
