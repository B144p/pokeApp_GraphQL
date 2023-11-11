import { Col, Row } from "antd";
import React from "react";

type Props = {};

const TestGit: React.FC<Props> = () => {
  return (
    <>
      Change git config user.name & email
      <Row>
        <Col>git config user.name</Col>
        <Col>git config user.email</Col>
      </Row>
    </>
  );
};

export default TestGit;
