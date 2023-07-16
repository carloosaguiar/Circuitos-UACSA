import { Button, Card, Col, Divider, Form, Input, Row, Typography } from "antd";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style/index.scss";
const { Text } = Typography;

const Transferencia = () => {
  const [form] = Form.useForm();
  const [numerador, setNumerador] = useState("oi");
  const [denominador, setDenominador] = useState("oi");
  const [atualizarLargura, setAtualizarLargura] = useState(false);
  const [larguraDivider, setLarguraDivider] = useState(0);
  const numeroSuperiorRef: any = useRef(null);
  const numeroInferiorRef: any = useRef(null);

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

  const ajustaTraço = async () => {
    const numeroSuperior = numeroSuperiorRef.current;
    const numeroInferior = numeroInferiorRef.current;

    if (numeroSuperior && numeroInferior) {
      const tamanhoNumeroSuperior = numeroSuperior.offsetWidth;
      const tamanhoNumeroInferior = numeroInferior.offsetWidth;
      const novaLarguraDivider = Math.max(
        tamanhoNumeroSuperior,
        tamanhoNumeroInferior
      );
      console.log("cima", numeroSuperiorRef.current);
      console.log("baixo", numeroInferiorRef.current);

      setLarguraDivider(novaLarguraDivider);
    }
  };

  const geraPolinomio = async (var1: any, var2: number[], var3: number[]) => {
    axios
      .get(`http://localhost:5000/api/gerarPolinomio`, {
        params: {
          ganho: var1,
          "numerador[]": var2,
          "denominador[]": var3,
        },
      })
      .then(async (response) => {
        ///console.log("response", response.data);
        setNumerador(response.data.funcaoTranferencia[0]);
        setDenominador(response.data.funcaoTranferencia[1]);
        setAtualizarLargura(true);
        //console.log("var2", response.data.funcaoTranferencia[0]);
        //setData(response.data.message);
        // Faça o que desejar com os dados da resposta
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submit = async (values: any) => {
    console.log("values", values);
    let regex = /[,;]/;
    let listaDenominador = regex.test(values.denominador)
      ? values.denominador.split(/[;,]/).map(Number)
      : [values.denominador];
    let listaNumerador = regex.test(values.numerador)
      ? values.numerador.split(/[;,]/).map(Number)
      : [values.numerador];

    console.log("listaDenominador", listaDenominador);
    console.log("listaNumerador", listaNumerador);

    const data = await geraPolinomio(8, listaNumerador, listaDenominador);
    //setData(data.funcaoTransferencia)
    setAtualizarLargura(true);

    console.log("resultado", data);
  };
  return (
    <>
      <Button onClick={() => navigate("/")}>Voltar</Button>
      <Form form={form} layout="vertical" onFinish={submit}>
        <Row gutter={[24, 24]}>
          <Col>
            <Form.Item label="Ganho" name="ganho">
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Numerador" name="numerador">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Denominador" name="denominador">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Gerar H(s)
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Card
        title="Resultados"
        className="cardResultado"
        bordered={false}
        style={{ width: 200 }}
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
    </>
  );
};
export default Transferencia;
