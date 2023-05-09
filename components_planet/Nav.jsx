

export default function Navv(){
    return(
    <div
              id="navv"
              style={{
                height: "15vh",
                width: "40vh",
                position: "fixed",
                right: "5vw",
                bottom: "40vh",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                zIndex: "10000",
              }}
            >
              <a
                style={{
                  cursor: "pointer",
                }}
                href="/agap2/agap2.html"
              >
                {/* <img height="100%" width="50vh" src="/agap2/fleche_gauche.svg" /> */}
                <svg
                  width="50px"
                  height="83px"
                  viewBox="0 0 23 38"
                >
                  <g transform="matrix(-1,-1.22465e-16,1.22465e-16,-1,23,38)">
                    <path
                      
                      d="M2.75,1.5l17.5,17.5l-17.5,17.5" id="pathfleche"
                      style={{ fill: "none", stroke: "#ffffff", strokeWidth: "1px" }}
                    />
                  </g>
                </svg>
               
              </a> 
              <a
                style={{
                  cursor: "pointer",
                }}
                href="/index.html"
              >
    
                <svg
                  width="50px"
                  height="83px"
                  viewBox="0 0 23 38"
                >
                  <g >
                    <path
                      d="M2.75,1.5l17.5,17.5l-17.5,17.5" id="pathfleche"
                      style={{ fill: "none", stroke: "#ffffff", strokeWidth: "1px" }}
                    />
                  </g>
                </svg>
              </a>
            </div>)
    }