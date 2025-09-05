import { PageContainer, MainContent } from "./styles";
import Header from "../Header";
import Footer from "../Footer";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <PageContainer>
            <Header />
            <MainContent>
                {children}
            </MainContent>
            <Footer />
        </PageContainer>
    );
};

export default PageLayout;