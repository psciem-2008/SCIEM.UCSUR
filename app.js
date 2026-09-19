document.addEventListener(
  "DOMContentLoaded",
  async () => {

    console.log(
      "🚀 SCIEM UCSUR iniciado"
    );


    // =========================
    // SCRIPT A
    // =========================

    try {

      const respuestaA =
        await SCIEMApi.scriptA();

      console.log(
        "✅ SCRIPT A:",
        respuestaA
      );

    } catch (error) {

      console.error(
        "❌ SCRIPT A:",
        error
      );

    }


    // =========================
    // SCRIPT B
    // =========================

    try {

      const respuestaB =
        await SCIEMApi.scriptB();

      console.log(
        "✅ SCRIPT B:",
        respuestaB
      );

    } catch (error) {

      console.error(
        "❌ SCRIPT B:",
        error
      );

    }

  }
);
