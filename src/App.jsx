import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

export default function App() {
  const [mobileList, setMobileList] = useState([])
  const [search, setSearch] = useState("")
  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<MobileList mobileList={mobileList} setMobileList={setMobileList} search={search} setSearch={setSearch} />} />
        <Route path="/mobiledetails/:id" element={<MobileDetails mobileList={mobileList} setMobileList={setMobileList} />} />
      </Routes>
    </div>
  )
}


function Navbar({ search, setSearch }) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className='navbar'>
      <div className='searchbar'>
        <input type="text" onChange={handleSearch} />
        <button>Add to Cart</button>
      </div>
      <div className='filters'>
        <button>Sort By</button>
        <button>Fliter</button>
        <button>Compare</button>
      </div>
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



  return (
    <div className='mobilelist-container'>
      {/* {mobileList.map((mbl, index, id) => <Mobile mobileList={mbl} key={index} id={id} />)} */}
      {mobileList.filter((detail) => {
        if (search === "") {
          return detail;
        } else if (detail.phoneName.toLowerCase().includes(search.toLowerCase())) {
          return detail;
        }
      }).map((mbl, index, id) => <Mobile mobileList={mbl} key={index} id={id} />)}
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