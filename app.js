document.addEventListener("DOMContentLoaded", async () => {

  console.log("🚀 SCIEM UCSUR iniciado");

  // ============================
  // PRUEBA API DE CONTENIDOS
  // ============================
  try {

    const content = await SCIEMApi.content();

    console.log(
      "✅ CONTENT API FUNCIONANDO:",
      content
    );

  } catch (error) {

    console.error(
      "❌ ERROR CONTENT API:",
      error
    );

  }


  // ============================
  // PRUEBA API DE SERVICIOS
  // ============================
  try {

    const services = await SCIEMApi.services();

    console.log(
      "✅ SERVICES API FUNCIONANDO:",
      services
    );

  } catch (error) {

    console.error(
      "❌ ERROR SERVICES API:",
      error
    );

  }

});
