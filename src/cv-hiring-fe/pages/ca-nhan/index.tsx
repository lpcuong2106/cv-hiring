import React from "react";
import Layout from "../../components/layouts";
import Head from "next/head";
import { Container } from "react-bootstrap";
import { Row, Col, Card, message } from "antd";
import { Formik, Form } from "formik";
import FormProfileEdit from "./FormProfileEdit";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_PROFILE } from "../../GraphQL/Query/FetchData";
import { User } from "../../data";
import { LoadingApp } from "../../components/LoadingApp";
import { UPDATE_PROFILE } from "../../GraphQL/Mutation/UpdateProfile";
import { useRouter } from "next/router";

interface DataQuery {
  me: User;
}
interface UpdateProfile {
  updateProfile: {
    status: "OK" | "ERROR";
    message: string;
  };
}

function Profile() {
  const { data, loading } = useQuery<DataQuery>(FETCH_PROFILE, {});
  const [updateProfile, { loading: loadingSubmit }] =
    useMutation<UpdateProfile>(UPDATE_PROFILE);
  const router = useRouter();
  const profile = data?.me;
  if (loading || !profile) {
    return <LoadingApp />;
  }

  return (
    <Layout>
      <div>
        <Head>
          <title>Kết nối lao động việt | TimViec</title>
        </Head>
        <div>
          <Container style={{ marginTop: 40 }}>
            <Row>
              <Col md={24}>
                <Card title="Thông tin cá nhân">
                  <div>
                    <Formik
                      initialValues={{
                        email: profile.email,
                        firstname: profile.firstname,
                        lastname: profile.lastname,
                        birthday: profile.birthday,
                        avatar: profile.avatar,
                        gender: profile.gender,
                        address: profile.address,
                        phone: profile.phone,
                      }}
                      //   validationSchema={validationSchemaCompany}
                      onSubmit={async (values) => {
                        const { data } = await updateProfile({
                          variables: values,
                        });

                        if (data?.updateProfile.status === "ERROR") {
                          message.error(data.updateProfile.message);
                          return;
                        }
                        message.success(data?.updateProfile.message);
                        router.reload();
                        return;
                      }}
                    >
                      {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                          <FormProfileEdit loadingSubmit={loadingSubmit} />
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
