import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Layout,
  Row,
  Typography,
} from "antd";
import "./style/index.scss";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Carousel } from "react-carousel3";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const uacsaIcon = require("../../images/uacsaIcon.jpg");
const ufrpeIcon = require("../../images/ufrpeIcon.jpg");
const protoboard = require("../../images/protoboard.png");
const oscil = require("../../images/oscil.png");
const multimetro = require("../../images/multimetro.png");
const gerador = require("../../images/gerador.png");

const { Title } = Typography;

const PaginaInicial = () => {
  let navigate = useNavigate();
  useEffect(() => {
    //eel.set_host("ws://localhost:8000");
  });

  return (
    <>
      <div className="container">
        <div className="containerRectangle">
          <div className="carrousel">
            <Carousel height={460} width={460} autoPlay={true}>
              <span key={1} className="divCarrousel">
                <Image
                  preview={false}
                  width={"25vh"}
                  className="imgGallery"
                  src={gerador}
                />
              </span>

              <span key={2} className="divCarrousel">
                <Image
                  preview={false}
                  width={"25vh"}
                  // height={"100%"}
                  className="imgGallery"
                  src={oscil}
                />
              </span>
              <span key={3} className="divCarrousel">
                <Image
                  preview={false}
                  width={"25vh"}
                  // height={"100%"}
                  className="imgGallery"
                  src={multimetro}
                />
              </span>
              <span key={4} className="divCarrousel">
                <Image
                  preview={false}
                  width={"25vh"}
                  className="imgGallery"
                  src={protoboard}
                />
              </span>
            </Carousel>
          </div>
        </div>

        <Layout className="layoutMenu">
          <Header className="header">
            <div>
              <Image
                className="uacsaIcon"
                preview={false}
                width={50}
                height={50}
                src={ufrpeIcon}
              />
            </div>
            <Title level={2}>CIRCUITOS DESCOMPLICADO</Title>
            <div>
              <Image
                className="uacsaIcon"
                preview={false}
                width={50}
                height={50}
                src={uacsaIcon}
              />
            </div>
          </Header>
          <Content className="contentMenu">
            <Card className="cardMenu" bordered={false}>
              <Button
                type="primary"
                shape="round"
                onClick={() => navigate("/polinomio")}
                size="large"
              >
                Função de transferência H(s)
              </Button>
              <Button
                type="primary"
                shape="round"
                onClick={() => navigate("/rlcCircuit")}
                //icon={<DownloadOutlined />}
                size="large"
              >
                Circuitos RLC's
              </Button>
              <Button
                type="primary"
                shape="round"
                //icon={<DownloadOutlined />}
                size="large"
              >
                Item 2
              </Button>
              <Button
                type="primary"
                shape="round"
                //icon={<DownloadOutlined />}
                size="large"
              >
                Item 3
              </Button>
            </Card>
          </Content>
          <Footer className="footer">
            UFRPE-UACSA ©2023 Criado por Carlos Eduardo
          </Footer>
        </Layout>
      </div>
    </>
  );
};
export default PaginaInicial;
