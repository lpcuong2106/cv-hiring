import { Col, Row } from "antd";
import React from "react";

interface Props {
  label: string;
  value: string;
}

export const JobInfoRequirement = ({ label, value }: Props) => {
  return (
    <Col md={12}>
      <Row>
        <Col md={12}>
          <p>{label}:</p>
        </Col>
        <Col md={12}>
          <b>{value}</b>
        </Col>
      </Row>
    </Col>
  );
};
