import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Login, Signin } from './Login';
import { ForgetPassword } from "./forgetPassword"
import { VerifyOtp } from './verifyOtp';
import { FaSearch } from 'react-icons/fa';


export default function App() {
  const [mobileList, setMobileList] = useState([])
  const [search, setSearch] = useState("")
  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/register" element={<Signin />} />
        <Route path="/" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/dashboard" element={<ProtectedRoute><MobileList mobileList={mobileList} setMobileList={setMobileList} search={search} setSearch={setSearch} /></ProtectedRoute>} />
        <Route path="/mobiledetails/:id" element={<ProtectedRoute><MobileDetails mobileList={mobileList} setMobileList={setMobileList} /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  // const token=false;
  return (
    token ? <section>{children}</section> : <Navigate replace to="/" />
    //  token? <section>{children}</section>:<h1>unautharaied</h1>
  )
}

function Navbar({ search, setSearch }) {
  const navigate = useNavigate()
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const logoutFunc = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate("/")
    }, 1500);
    console.log("logout")
  }
  return (
    <div className={"navbar fixed-nav navbar"}>
      <nav>
        <img src="data:image/jpeg;base64,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" />
        <div className="navbar-content">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
        {
          localStorage.getItem('token') == null ? (
            <div className="navbar-content">
              <p onClick={() => navigate("/")}>Login</p>
              <p onClick={() => navigate("/register")}><span>Register</span></p>
            </div>) : (
            <div className="navbar-content">
              <p onClick={logoutFunc}>Logout</p>
            </div>
          )

        }


      </nav>
    </div>
  )
}
function MobileList({ mobileList, setMobileList, search, setSearch }) {
  const getProducts = () => {
    fetch("https://order-app-backend-liard.vercel.app/mobile",
      { method: "GET" })
      .then((data) => data.json())
      .then((dts) => setMobileList(dts))
  }
  useEffect(() => getProducts(), [])

  const filteredMobileList = Array.from(mobileList).filter((detail) => {
    const lowerCaseSearch = search.toLowerCase();

    // Check if any of the properties match the search query
    return (
      (detail.phoneName && detail.phoneName.toLowerCase().includes(lowerCaseSearch)) ||
      (detail.os && detail.os.toLowerCase().includes(lowerCaseSearch)) ||
      (detail.type && detail.type.toLowerCase().includes(lowerCaseSearch)) ||
      (detail.processor && detail.processor.toLowerCase().includes(lowerCaseSearch)) ||
      (detail.price && detail.price.toString().includes(lowerCaseSearch))
    );
  });
  return (
    <div className='mobilelist-container'>
      {/* {mobileList.map((mbl, index, id) => <Mobile mobileList={mbl} key={index} id={id} />)} */}
      {/* {mobileList.filter((detail) => {
        if (search === "") {
          return detail;
        } else if (detail.phoneName.toLowerCase().includes(search.toLowerCase())) {
          return detail;
        }
      }).map((mbl, index, id) => <Mobile mobileList={mbl} key={index} id={id} />)} */}
      {filteredMobileList.map((mbl, index, id) => (
        <Mobile mobileList={mbl} key={index} id={id} />
      ))}
    </div>
  )
}

function Mobile({ mobileList, setMobileList, id }) {
  const navigate = useNavigate()

  return (
    <div className='mobileContainer' onClick={() => navigate(`/mobiledetails/${mobileList.id}`)}>
      <div className='mobile-image'>
        <img src={mobileList.image} alt={mobileList.phoneName} />
      </div>
      <div className='mobile-details'>
        <p className='mobile-name'>{mobileList.phoneName} {mobileList.network} ({mobileList.alterName},{mobileList.storage})</p>
        <p><span className='offer'>{mobileList.offer}% off </span><span className='original-price'>   {mobileList.originalPrice}</span> <span className="offer-price">₹{mobileList.price}</span></p>
        <p className='customers'>Brought {mobileList.customer}+times</p>
        <p className='delivery'>Free Delivery</p>
      </div>
    </div>
  )
}

function MobileDetails({ mobileList, setMobileList }) {
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://order-app-backend-liard.vercel.app/mobile/${id}`)
      .then((data) => data.json())
      .then((dts) => setMobileList(dts));
  }, [id]);
  const amount = parseInt(mobileList.price)
  const handleClick = (e) => {
    e.preventDefault()
    if (amount === '') {
      alert("please enter amount")
    }
    else {
      var option = {
        key: "rzp_test_teSKDfmwTCTFu0",
        key_secret: "2TZaVrFSXYnzzu3QeH6N3t3w",
        amount: amount * 100,
        currency: "INR",
        name: "Amazon Groceries",
        description: "For Booking Ticket",
        handler: function (response) {
          alert(response.razorpay_payment_id)
          // navigate("/thank-you")
          // setTimeout(() => {
          //   navigate("/dashboard")
          // }, 3000)
        },
        // prefill: {
        //     name: name,
        //     email: email,
        //     contact: phone,
        // },
        notes: {
          address: "Razor pay corporate office"
        },
        theme: {
          color: "#3399cc"
        }

      }
      var pay = new window.Razorpay(option)
      pay.open()

    }
  }
  return (
    <div>
      <div className='mobile-list'>
        <div className='mobile-list-image-container'>
          <div className="mobile-list-image">
            <img src={mobileList.image} alt={mobileList.phoneName} />
          </div>
          <div className="purchase-button">
            <span className="button"> Add to Cart</span>
            <span className="button button-buy" onClick={handleClick}>Buy Now</span>
          </div>
        </div>
        <div className="mobile-list-details">
          <div>
            <span>{mobileList.phoneName}</span> <span>({mobileList.alterName},{mobileList.storage})</span>
            <div className="price-list">
              <p className="price">₹{mobileList.price}</p>
              <p className="original-price">{mobileList.originalPrice}</p>
              <p className="offer">{mobileList.offer}% off</p>
            </div>
            <div className="mobile-cont">
              <div className="mobile-spec">
                <div className="brand-image border">
                  <img src={mobileList.brandImage} />
                </div>
                <div className="mobile-spec-details">
                  <p>{mobileList.warranty}</p>
                </div>
              </div>
              <div className="mobile-spec">
                <div className="brand-image font-style">
                  <p> Highlights </p>
                </div>

                <div className="mobile-spec-details">
                  <ul>
                    <li>{mobileList.storage} ROM {mobileList.ram} RAM</li>
                    <li>{mobileList.displaySize} {mobileList.display}</li>
                    <li>{mobileList.camera}</li>
                    <li>{mobileList.processor}</li>
                  </ul>
                </div>
              </div>
              <div className="mobile-spec">
                <div className="brand-image font-style">
                  <p>Easy Payment Options </p>
                </div>

                <div className="mobile-spec-details">
                  <ul>
                    <li>EMI starting from ₹{mobileList.emi}/month</li>
                    <li>Cash on Delivery</li>
                    <li>Net banking & Credit/ Debit/ ATM card</li>
                  </ul>
                </div>
              </div>
              <div className="mobile-spec">
                <div className="brand-image font-style">
                  <p>Seller</p>
                </div>
                <div className="mobile-spec-details">
                  <p className="seller">{mobileList.seller}</p>
                  <ul>
                    <li>7 Days Service Center Replacement/Repair</li>
                    <li>GST invoice available</li>
                  </ul>
                </div>
              </div>
              <div className="Specification border">
                <div className="title">
                  <p className="general">Specification</p>
                </div>
                <div className="general title border">
                  <p className="title">General</p>
                  <table>
                    <tbody>
                      <tr>
                        <td className="font-style t-row">In The Box</td>
                        <td>{mobileList.box}</td>
                      </tr>
                      <tr>
                        <td className="font-style t-row">Model Number</td>
                        <td>{mobileList.modelNumber}</td>
                      </tr>
                      <tr>
                        <td className="font-style t-row">Mobel Name</td>
                        <td>{mobileList.phoneName}</td>
                      </tr>
                      <tr>
                        <td className="font-style t-row">Color</td>
                        <td>{mobileList.alterName}</td>
                      </tr>
                      <tr>
                        <td className="font-style t-row">Browse Type</td>
                        <td>{mobileList.browseType}</td>
                      </tr>
                      <tr>
                        <td className="font-style t-row">SIM Type</td>
                        <td>{mobileList.simType}</td>
                      </tr>
                      <tr>
                        <td className="font-style t-row">Hybrid Sim Type</td>
                        <td>{mobileList.hybridsimType}</td>
                      </tr>
                      <tr>
                        <td className="font-style t-row">Touch Screen</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td className="font-style t-row">OTG Compatible</td>
                        <td>{mobileList.otg}</td>
                      </tr>
                      <tr>
                        <td className="font-style t-row">Sound Enchancement</td>
                        <td>{mobileList.sound}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="display general border">
                  <p className="title">Display Features</p>
                  <table>
                    <tbody>
                      <tr >
                        <td className="font-style t-row"> Display Size</td>
                        <td>{mobileList.displaySize}</td>
                      </tr>
                      <tr >
                        <td className="font-style t-row">Resolution</td>
                        <td>{mobileList.resolutionSize}</td>
                      </tr>
                      <tr >
                        <td className="font-style t-row">Resolution Type</td>
                        <td>{mobileList.display}</td>
                      </tr>
                      <tr >
                        <td className="font-style t-row"> GPU</td>
                        <td>{mobileList.core}</td>
                      </tr>
                      <tr >
                        <td className="font-style t-row">Other Display Features</td>
                        <td>{mobileList.displayFeature}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Os mobileList={mobileList} />
                <Memory mobileList={mobileList} />
                <Camera mobileList={mobileList} />
                <Network mobileList={mobileList} />
                <Battery mobileList={mobileList} />
                <Dimension mobileList={mobileList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

function Os({ mobileList }) {
  return (
    <div className="general border">
      <p className="title">Os & Processor Features</p>
      <table>
        <tbody>
          <tr>
            <td className="font-style t-row">Operating System</td>
            <td>{mobileList.os}</td>
          </tr>
          <tr>
            <td className="font-style t-row">Processor Brand</td>
            <td>{mobileList.brandName}</td>
          </tr>
          <tr>
            <td className="font-style t-row">Processor Type</td>
            <td>{mobileList.processorType}</td>
          </tr>
          <tr>
            <td className="font-style t-row">Processor Core</td>
            <td>{mobileList.processorCore}</td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

function Memory({ mobileList }) {
  return (
    <div className="general border">
      <p className='title'>Memory & Storage Features</p>
      <table>
        <tbody>
          <tr>
            <td className="font-style t-row">Internal Storage</td>
            <td>{mobileList.storage}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function Camera({ mobileList }) {
  return (
    <div className="general border">
      <p className="title">Camera Features</p>
      <table>
        <tbody>
          <tr>
            <td className="font-style t-row">Primary Camera</td>
            <td>{mobileList.primaryCam}</td>
          </tr>
          <tr>
            <td className="font-style t-row">Secondary Camera</td>
            <td>{mobileList.secondaryCam}</td>
          </tr>
          <tr>
            <td className="font-style t-row">Flash</td>
            <td>{mobileList.flash}</td>
          </tr>
          <tr>
            <td className="font-style t-row">HD Recording</td>
            <td>{mobileList.hdRecord}</td>
          </tr>
          <tr>
            <td className="font-style t-row">Full HD Recording</td>
            <td>{mobileList.fullHd}</td>
          </tr>
          <tr>
            <td className="font-style t-row">Video Recording Resolution</td>
            <td>{mobileList.recordResolution}</td>
          </tr>
          <tr>
            <td className="font-style t-row">Digital Zoom</td>
            <td>{mobileList.zoom}</td>
          </tr>
          <tr>
            <td className="font-style t-row">Frame Rate</td>
            <td>{mobileList.frameRate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}


function Network({ mobileList }) {
  return (
    <div className="general border">
      <p className="title">Connectivity Features</p>
      <table>
        <tbody>
          <tr>
            <td className="font-style t-row">Network Type</td>
            <td>{mobileList.networkType}</td>
          </tr>
          <tr>
            <td className="font-style t-row">Supported Networks</td>
            <td>{mobileList.networkSupport}</td>
          </tr>
          <tr>
            <td className="font-style t-row">Internet Connectivity</td>
            <td>{mobileList.internet}</td>
          </tr>
          <tr>
            <td className="font-style t-row">Bluetooth Support</td>
            <td>{mobileList.bluetooth}</td>
          </tr>
          <tr>
            <td className="font-style t-row">Bluetooth Version</td>
            <td>{mobileList.bluetoothVersion}</td>
          </tr>
          <tr>
            <td className="font-style t-row">Wifi</td>
            <td>{mobileList.wifi}</td>
          </tr>
          <tr>
            <td className="font-style t-row">NFC</td>
            <td>{mobileList.nfc}</td>
          </tr>
          <tr>
            <td className="font-style t-row">Map supports</td>
            <td>{mobileList.map}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function Battery({ mobileList }) {
  return (
    <div className="general border title">
      <p className="title">Battery & Power Features</p>
      <table>
        <tbody>
          <tr>
            <td className="font-style t-row">Battery & Power Features</td>
            <td>{mobileList.battery}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function Dimension({ mobileList }) {
  return (
    <div className="general border">
      <p className="title">Dimensions</p>
      <table>
        <tbody>
          <tr>
            <td className="font-style t-row">Width</td>
            <td>{mobileList.width} mm</td>
          </tr>
          <tr>
            <td className="font-style t-row">Height</td>
            <td>{mobileList.height} mm</td>
          </tr>
          <tr>
            <td className="font-style t-row">Depth</td>
            <td>{mobileList.depth} mm</td>
          </tr>
          <tr>
            <td className="font-style t-row">Weight</td>
            <td>{mobileList.weight} g</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const obj = {
  id: "1",
  image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/9/e/e/-origi…",
  phoneName: "Apple iPhone 14 ",
  alterName: "Midnight",
  storage: "128GB",
  price: "60499",
  originalPrice: "69,900",
  offer: "13",
  customer: "40,000",
  brandImage: "https://rukminim2.flixcart.com/image/160/160/cms-brand/c74f82e487ab4b40b756e9a71cd59f88952c676f2c907c0bb3861edca51ae15d.jpg?q=90",
  warranty: "1 Year Warranty for Phone and 6 Months Warranty for In-Box Accessories",
  display: "Full HD+",
  camera: "50MP + 2MP | 8MP Front Camera",
  processor: "Mediatek",
  seller: "XONIGHT E-Commerce",
  displaySize: "17.07 cm (6.72 inch)",
  modelNumber: "RMX3782",
  browseType: "Smartphones",
  hybridsimType: "No",
  otg: "Yes",
  simType: "Dual Sim",
  sound: "Dirac Sound Effect, Hi-Res Audio Certification, MT6377 Audio Decoding Chip",
  core: "Octa Core",
  displayFeature: "Full HD+ LCD",
  resolutionSize: "2400 x 1080 Pixels",
  brandName: "Realme",
  operate: "  2G GSM: 850 MHz/900 MHz/1800 MHz, 3G WCDMA: B1/B5/B8, 4G TD LTE: B40/B41 (2535 MHz - 2655 MHz), 4G LTE FDD: B1/B3/B5/B8/B28A, 5G NR SA: n1/n3/n5/n8/n28A/n40/n41 (2535 MHz - 2655 MHz)/n77/n78, 5G NR NSA: n1/n3/n41 (2535 MHz - 2655 MHz)/n78",
  os: "Android 13",
  processorCore: "Octa core",
  ram: "6",
  expandableStorage: "2",
  processorType: "Dimensity 6100+",
  flash: "Rear: Single Flash | Front: Screen Flash",
  frameRate: "120 fps, 30 fps",
  fullHd: "Yes",
  hdRecord: "Yes",
  primaryCam: "50MP + 2MP",
  recordResolution: "Rear Camera: 1080p (at 30 fps), 720p (at 120 fps), 720p (at 30 fps)|Front Camera: 1080p (at 30 fps), 720p (at 30 fps)",
  secondaryCam: "8MP Front Camera",
  zoom: "10X",
  battery: "5000 mAh",
  bluetooth: "Yes",
  bluetoothVersion: "v5.2",
  depth: "7.89 ",
  height: "165.7",
  internet: "5G, 4G, 3G, EDGE, GPRS, Wi-Fi",
  map: "Google Maps",
  networkSupport: "4G LTE, 4G VoLTE, 5G, GSM, WCDMA",
  networkType: "2G, 3G, 4G, 5G",
  nfc: "No",
  weight: "190 ",
  width: "76 ",
  wifi: "Yes"
}