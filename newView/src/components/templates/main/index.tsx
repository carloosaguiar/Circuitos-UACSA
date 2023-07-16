import { Layout } from "antd";
import "./style/index.scss";
import { Content } from "antd/es/layout/layout";

const MainTemplate = ({ children }: any) => {
  return (
    <Layout className="principalLayout">
      <Content className="mainContent">{children}</Content>
    </Layout>
  );
};

export default MainTemplate;
