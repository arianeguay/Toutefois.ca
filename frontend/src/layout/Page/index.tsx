import { PageContainer, MainContent } from "./styles";
import Header from "../Header";
import Footer from "../Footer";
import type { WordpressPage } from "../../types";

interface PageLayoutProps {
    page: WordpressPage;
}

const PageLayout: React.FC<PageLayoutProps> = ({ page, }) => {
    return (
        <PageContainer>
            <Header />
            <MainContent>
                {page.content.rendered}
            </MainContent>
            <Footer />
        </PageContainer>
    );
};

export default PageLayout;