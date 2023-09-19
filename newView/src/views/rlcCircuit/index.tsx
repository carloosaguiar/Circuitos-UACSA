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
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import "./style/index.scss";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import axios from "axios";
const { Option } = Select;
const { Text } = Typography;
//const MathJax = require("react-mathjax");

const RlcCircuit = () => {
  const [form] = Form.useForm();
  const [numerador, setNumerador]: any = useState("oi");
  const [denominador, setDenominador]: any = useState("oi");
  const [atualizarLargura, setAtualizarLargura] = useState(false);
  const [larguraDivider, setLarguraDivider] = useState(0);
  const numeroSuperiorRef: any = useRef("");
  const numeroInferiorRef: any = useRef("");

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
      case "Vr":
        return CircuitoResistor;
      case "Vc":
        return CircuitoCapacitor;
      case "Vi":
        return CircuitoIndutor;
      case "Vlc":
        return CircuitoIndCap;
      default:
        return "";
    }
  };

  const medidaResistor = (inicial: string, tipo: string) => (
    <Form.Item name={tipo} label="" style={{ marginBottom: 0 }}>
      <Select defaultValue="0" style={{ width: 60 }}>
        <Option value="9">{`G${inicial}`}</Option>
        <Option value="6">{`M${inicial}`}</Option>
        <Option value="3">{`K${inicial}`}</Option>
        <Option value="0">{`${inicial}`}</Option>
        <Option value="-3">{`m${inicial}`}</Option>
        <Option value="-6">{`u${inicial}`}</Option>
        <Option value="-9">{`n${inicial}`}</Option>
      </Select>
    </Form.Item>
  );

  const medidaComponente = (value: string) => {
    //console.log("value", value);
    switch (value) {
      case "valorResistor":
        return medidaResistor("Ω", "medRes");
      case "valorIndutor":
        return medidaResistor("H", "medCap");
      case "valorCapacitor":
        return medidaResistor("F", "medInd");

      default:
        return medidaResistor("", "");
    }
  };

  const geraRlcSerie = async (
    var1: number,
    var2: number,
    var3: number,
    freq: string,
    visual: string
  ) => {
    axios
      .post(`http://localhost:5000/api/gerarRlcSerie`, {
        resistor: var1,
        indutor: var2,
        capacitor: var3,
        freq: freq,
        visual: visual,
      })
      .then(async (response) => {
        console.log("response", response.data);
        // const num = textoPotencia(response.data.polinomio[0]);
        // const den = textoPotencia(response.data.polinomio[1]);
        // console.log("text",textoPotencia(response.data.polinomio[1]) )
        //console.log("denominac",)
        setNumerador(response.data.polinomio[0]);
        setDenominador(response.data.polinomio[1]);

        setAtualizarLargura(true);
        //console.log("var2", response.data.funcaoTranferencia[0]);
        //setData(response.data.message);
        // Faça o que desejar com os dados da resposta
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const inlineFormula = "s^2";
  const blockFormula = `\\frac{n!}{k!(n-k)!} = \\binom{n}{k}`;

  const submit = async (values: any) => {
    console.log("values", values);
    await geraRlcSerie(
      values.valorResistor,
      values.valorIndutor,
      values.valorCapacitor,
      "hz",
      "Vr"
    );
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
        initialValues={{
          tensaoSaida: "Vr",
          frequencia: "hz",
          valorResistor: 1,
          valorCapacitor: 1,
          valorIndutor: 1,
        }}
        layout="vertical"
        onValuesChange={changeForm}
        className="formGrid"
        onFinish={submit}
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
                    { value: "Vr", label: "Resistor (Vr)" },
                    { value: "Vc", label: "Capacitor (Vc)" },
                    { value: "Vi", label: "Indutor (Vl)" },
                    {
                      value: "capacitorIndutor",
                      label: "Vlc",
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
                    { value: "hz", label: "Rad/seg" },
                    { value: "rad", label: "Hertz" },
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
                rules={[
                  { required: true, message: "Informe o valor do resistor." },
                ]}
              >
                <InputNumber
                  addonAfter={medidaComponente("valorResistor")}
                  className="inpNumb"
                  controls={false}
                  // min={1}
                />
              </Form.Item>
              <Form.Item
                label="Valor do indutor"
                name="valorIndutor"
                style={{ width: "150px" }}
                rules={[
                  { required: true, message: "Informe o valor do indutor." },
                ]}
              >
                <InputNumber
                  addonAfter={medidaComponente("valorIndutor")}
                  className="inpNumb"
                  controls={false}
                  // min={1}
                />
              </Form.Item>
              <Form.Item
                label="Valor do capacitor"
                name="valorCapacitor"
                style={{ width: "150px" }}
                rules={[
                  { required: true, message: "Informe o valor do capacitor." },
                ]}
              >
                <InputNumber
                  addonAfter={medidaComponente("valorCapacitor")}
                  className="inpNumb"
                  controls={false}
                  // min={1}
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
                <InlineMath math={numerador} ref={numeroSuperiorRef} />
              </Text>
              <div
                style={{
                  width: `${larguraDivider}px`,
                  margin: "0 auto",
                  borderBottom: "1px solid black",
                }}
              />
              <Text strong ref={numeroInferiorRef}>
                <InlineMath math={denominador} ref={numeroInferiorRef} />
              </Text>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default RlcCircuit;
