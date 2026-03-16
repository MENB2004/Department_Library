import React from 'react'

function HODLogin() {
  return (
    <>
      <style>{`
        /* Background */
        .signup-page {
          background: url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f") center/cover no-repeat;
          min-height: 100vh;
        }
          
      .signin-btn {
          height: 50px;
          border-radius: 12px;
          border: none;
          font-size: 18px;
          font-weight: 600;
          color: white;
          background: linear-gradient(90deg, #b347e6, #6f3df4);
          box-shadow: 0 6px 18px rgba(111,61,244,0.35);
          transition: 0.3s;
        }

        .signin-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 22px rgba(111,61,244,0.45);
        }


        /* Image section */
        .image-section {
          background: url("https://tse1.mm.bing.net/th/id/OIP.M4hXrjwyWCPdI85RgXQyPQHaEo?w=1920&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3") center/cover no-repeat;
          position: relative;
          min-height: 500px;
        }

        /* Purple overlay */
        .image-section .overlay {
          position: absolute;
          inset: 0;
          background: rgba(30, 22, 39, 0.38);
        }
      `}</style>

      <div className="signup-page">
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="signup-card row g-0 shadow-lg" style={{ borderRadius: '16px', width: '800px', overflow: 'hidden' }}>

            {/* Form Section  */}
            <div className="col-md-6 bg-light p-5">
              <h1 style={{ fontWeight: "700", marginBottom: "10px", color: "#3c3c46", textAlign: "center" }}>CS Department Library</h1>
              <h4 className="mb-4" style={{ fontWeight: "600", color: "#6f3df4", textAlign: "center" }}>HOD Login 📚</h4>

              <form>
                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: '600', color: '#4a4a55' }}>Username</label>
                  <input style={{ border: '1px solid #d6cfdd' }}
                    type="text"
                    className="form-control"
                    placeholder="username"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: '600', color: '#4a4a55' }}>Password</label>
                  <input style={{ border: '1px solid #d6cfdd' }}
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                  />
                </div>


                <button className="btn signin-btn w-100 mb-3">Sign In</button>

              </form>
            </div>

            {/* Right Image Section */}
            <div className="col-md-6 image-section">
              <div className="overlay"></div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default HODLogin
