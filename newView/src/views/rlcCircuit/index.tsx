import {
  Space,
  Button,
  Form,
  Select,
  Col,
  Row,
  Card,
  Image,
  InputNumber,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import CircuitoResistor from "../../images/circuitResistor.svg";
import CircuitoCapacitor from "../../images/circuitCapacitor.svg";
import CircuitoIndutor from "../../images/circuitIndutor.svg";
import CircuitoIndCap from "../../images/circuitCapInd.svg";

import "./style/index.scss";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
const { Option } = Select;
const { Text } = Typography;

const RlcCircuit = () => {
  const [form] = Form.useForm();
  const [numerador, setNumerador] = useState("oi");
  const [denominador, setDenominador] = useState("oi");
  const [atualizarLargura, setAtualizarLargura] = useState(false);
  const [larguraDivider, setLarguraDivider] = useState(0);
  const numeroSuperiorRef: any = useRef(null);
  const numeroInferiorRef: any = useRef(null);

  const tensaoField = Form.useWatch("tensaoSaida", form);
  let navigate = useNavigate();

  useLayoutEffect(() => {
    if (atualizarLargura) {
      const numeroSuperior = numeroSuperiorRef.current;
      const numeroInferior = numeroInferiorRef.current;

      if (numeroSuperior && numeroInferior) {
        const tamanhoNumeroSuperior = numeroSuperior.offsetWidth;
        const tamanhoNumeroInferior = numeroInferior.offsetWidth;
        const novaLarguraDivider = Math.max(
          tamanhoNumeroSuperior,
          tamanhoNumeroInferior
        );

        setLarguraDivider(novaLarguraDivider);
      }

      setAtualizarLargura(false);
    }
  }, [atualizarLargura]);
  useEffect(() => {
    console.log("form.g", form.getFieldValue("tensaoSaida"));
  }, [form]);

  const changeImage = (value: string) => {
    switch (value) {
      case "resistor":
        return CircuitoResistor;
      case "capacitor":
        return CircuitoCapacitor;
      case "indutor":
        return CircuitoIndutor;
      case "capacitorIndutor":
        return CircuitoIndCap;
      default:
        return "";
    }
  };

  const medidaResistor = (inicial: string) => (
    <Select defaultValue="3" style={{ width: 60 }}>
      <Option value="0">{`G${inicial}`}</Option>
      <Option value="1">{`M${inicial}`}</Option>
      <Option value="2">{`K${inicial}`}</Option>
      <Option value="3">{`${inicial}`}</Option>
      <Option value="4">{`m${inicial}`}</Option>
      <Option value="5">{`u${inicial}`}</Option>
      <Option value="6">{`n${inicial}`}</Option>
    </Select>
  );

  const medidaComponente = (value: string) => {
    switch (value) {
      case "valorResistor":
        return medidaResistor("Ω");
      case "valorCapacitor":
        return medidaResistor("H");
      case "valorIndutor":
        return medidaResistor("F");

      default:
        return medidaResistor("");
    }
  };

  const items: TabsProps["items"] = [
    {
      label: `RLC Série`,
      key: "0",
      //children: `Content of tab `,
    },
    {
      label: `RLC Paralelo`,
      key: "1",
      //children: `Content of tab `,
    },
  ];

  const changeForm = (values: any) => {
    console.log("values", values);
  };

  return (
    <>
      <Tabs
        tabBarExtraContent={{
          left: (
            <Button onClick={() => navigate("/")} icon={<LeftOutlined />}>
              Voltar
            </Button>
          ),
        }}
        centered
        items={items}
      />
      <Form
        form={form}
        initialValues={{ tensaoSaida: "resistor", frequencia: "radseg" }}
        layout="vertical"
        onValuesChange={changeForm}
        className="formGrid"
      >
        <Row gutter={16}>
          <Col xs={8} sm={8} md={10} lg={8} xl={8}>
            <Card bordered={false} className="cardTensao">
              <Form.Item
                label="Tensão de saída"
                name="tensaoSaida"
                style={{ width: "200px" }}
              >
                <Select
                  options={[
                    { value: "resistor", label: "Resistor (Vr)" },
                    { value: "capacitor", label: "Capacitor (Vc)" },
                    { value: "indutor", label: "Indutor (Vl)" },
                    {
                      value: "capacitorIndutor",
                      label: "Capacitor + Indutor (Vlc)",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item label="" name="imagem">
                <Image
                  width={200}
                  src={changeImage(tensaoField)}
                  preview={false}
                />
              </Form.Item>
              <Form.Item
                label="Frequência"
                name="frequencia"
                style={{ width: "100px" }}
              >
                <Select
                  options={[
                    { value: "radseg", label: "Rad/seg" },
                    { value: "hertz", label: "Hertz" },
                  ]}
                />
              </Form.Item>
            </Card>
          </Col>
          <Col xs={4} sm={8} md={7} lg={8} xl={8}>
            <Card bordered={false}>
              <Form.Item
                label="Valor do resistor"
                name="valorResistor"
                style={{ width: "150px" }}
              >
                <InputNumber
                  addonAfter={medidaComponente("valorResistor")}
                  className="inpNumb"
                  controls={false}
                  min={0}
                />
              </Form.Item>
              <Form.Item
                label="Valor do indutor"
                name="valorIndutor"
                style={{ width: "150px" }}
              >
                <InputNumber
                  addonAfter={medidaComponente("valorIndutor")}
                  className="inpNumb"
                  controls={false}
                  min={0}
                />
              </Form.Item>
              <Form.Item
                label="Valor do capacitor"
                name="valorCapacitor"
                style={{ width: "150px" }}
              >
                <InputNumber
                  addonAfter={medidaComponente("valorCapacitor")}
                  className="inpNumb"
                  controls={false}
                  min={0}
                />
              </Form.Item>
              <div className="buttonsSubmit">
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Gerar H(s)
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary">Plotar gráfico</Button>
                </Form.Item>
              </div>
            </Card>
          </Col>
          <Col xs={4} sm={8} md={7} lg={8} xl={8}>
            <Card
              title="Resultados"
              className="cardResultado"
              bordered={false}
              //style={{ width: 200 }}
            >
              <Text strong className="numerador" ref={numeroSuperiorRef}>
                {numerador}
              </Text>
              <div
                style={{
                  width: `${larguraDivider}px`,
                  margin: "0 auto",
                  borderBottom: "1px solid black",
                }}
              />
              <Text strong ref={numeroInferiorRef}>
                {denominador}
              </Text>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default RlcCircuit;
