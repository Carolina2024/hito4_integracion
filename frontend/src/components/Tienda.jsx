import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardPublicacion from "../components/CardPublicacion";
import { UsuarioContext } from "../context/UsuarioContext";
import MenuLateral from "./MenuLateral";
import OrdenarPor from "../components/OrdenarPor";
import Buscador from "../components/Buscador";
import axios from "axios"; // Importar axios para las solicitudes

const Tienda = () => {
  const { publicaciones, setPublicaciones } = useContext(UsuarioContext);
  const { activeMenu, usuario } = useContext(UsuarioContext); // para traer usuario de context
  console.log("Publicaciones:", publicaciones);

  // Función para obtener publicaciones desde el backend
  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get(
          /*  `${import.meta.env.VITE_BASE_URL}/publicaciones` */
          "https://hito4-integracion.onrender.com/publicaciones");
        /*  console.log("Password:", pgpassword); */
        setPublicaciones(response.data || []); // Actualiza el estado con las publicaciones obtenidas
        /* console.log("publicaciones: ", response.data); */
      } catch (error) {
        console.error("Error al obtener las publicaciones en Tienda:", error);
        setPublicaciones([]); // Establece un array vacío en caso de error
      }
    };

    // Llamada a fetchPublicaciones al montar el componente

    fetchPublicaciones(); // Llama la API para obtener las publicaciones
  }, []);

  console.log("Publicaciones:", publicaciones); // Verificar el contenido

  return (
    <Container fluid className="py-4">
      {/* elementos visibles en vista privada de la tienda desde perfil */}
      {usuario && activeMenu === "Tienda" ? (
        <div>
          <Row>
            <Col xs={12} md={3}>
              <MenuLateral />
            </Col>
            <Col xs={12} md={6} className="ms-4">
              <Row>
                <Col xs={12}>
                  <h3 className="text-center mb-2 mt-2 border-bottom p-2">
                    Tienda de Cursos
                  </h3>
                </Col>
                {/* para que se muestre el usuario autenticado, el que inició sesióm */}
                <Col xs={12}>
                  <p className="text-center p-2 mb-2">{usuario?.nombre}</p>
                </Col>
              </Row>
              <Row className="justify-content-center align-item-center mb-4">
                <Col sm="4" className="p-2">
                  <OrdenarPor />
                </Col>
                <Col sm="4" className="p-2">
                  <Buscador />
                </Col>
              </Row>
              <Row className="justify-content-start align-item-start">
                {publicaciones.length > 0 ? (
                  publicaciones.map((publicacion, index) => (
                    <Col
                      xs={12}
                      md={6}
                      lg={6}
                      key={publicacion.publicacion_id || index}
                    >
                      <CardPublicacion
                        publicacion_id={publicacion.publicacion_id} //se pasa publicacion_id
                        imagen={publicacion.imagen_url}
                        titulo={publicacion.titulo}
                        descripcion={publicacion.descripcion}
                        precio={publicacion.precio}
                        publicador={
                          publicacion.nombre_usuario
                        } /* se pasa el nombre del publicador */
                        mostrarAgregar={true}
                      />
                    </Col>
                  ))
                ) : (
                  <Col xs={12}>
                    <p className="text-center">
                      No hay publicaciones disponibles.
                    </p>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </div>
      ) : (
        // para elementos vista publica desde home
        <Row>
          <Col xs={12}>
            <h3 className="text-center mb-2 mt-2 mb-4">Tienda de Cursos</h3>
          </Col>
          {publicaciones.length > 0 ? (
            publicaciones.map((publicacion, index) => (
              <Col
                xs={12}
                md={6}
                lg={4}
                key={publicacion.publicacion_id || index}
              >
                <CardPublicacion
                  publicacion_id={publicacion.publicacion_id}
                  imagen={publicacion.imagen_url}
                  titulo={publicacion.titulo}
                  descripcion={publicacion.descripcion}
                  precio={publicacion.precio}
                  publicador={publicacion.nombre_usuario}
                  mostrarAgregar={true}
                />
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <p className="text-center">No hay publicaciones disponibles.</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Tienda;
