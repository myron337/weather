import Container from "@/components/container/Container";
import TopBar from "@/components/topBar/TopBar";
import Location from "@/components/location/Location";
import MainLocation from "@/components/mainLocation/MainLocation";
import GraphContainer from "@/components/graphContainer/GraphContainer";
import SearchCountry from "@/components/searchCountry/SearchCountry";
import CountryCard from "@/components/countryCard/CountryCard";
import classes from "./page.module.css"

export default function Home() {
  return (
    <main>
      <Container>
        <TopBar />
        <MainLocation />
        <GraphContainer />
        <SearchCountry  />
        <div className={classes.countryCardWrapper}>
        <CountryCard humidity="54%" wind="24 km/h" uvIndex="9" />
        <CountryCard humidity="65%" wind="9 km/h" uvIndex="2" />
        <CountryCard humidity="74%" wind="23 km/h" uvIndex="5" />
        </div>
      </Container>
    </main>
  );
}
