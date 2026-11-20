import Container from "@/components/container/Container";
import TopBar from "@/components/topBar/TopBar";
import MainLocation from "@/components/mainLocation/MainLocation";
import GraphContainer from "@/components/graphContainer/GraphContainer";
import SearchSection from "@/components/searchSection/SearchSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main>
      <Container>
        <TopBar />
        <MainLocation />
        <GraphContainer />
        <SearchSection />
        <Footer />
      </Container>
    </main>
  );
}
