import Map from '../components/Map'

export default function HomePage() {
  const markers = [{ position: [32.715, -117.161], content: <><b>Wecome to San Diego </b><br /> Sister City to Tijuana, Mexico; Yokohama, Japan; and Tema, Ghana </> },
  { position: [41.882, -87.623], content: <><b>Welcome to Chicago</b> <br /> Home of the Twinkie </> }]

  return (
    <>
      <h1>iTinerary</h1>
      <Map markers={markers} />
    </>
  )
}
